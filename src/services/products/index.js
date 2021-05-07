const express = require("express");
const Product = require('../../db').Product
const Category = require('../../db').Category
const Review = require('../../db').Review
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Sql amazon project",
  },
});

const cloudinaryMulter = multer({ storage: storage });




router
  .route("/")
  .get(async (req, res, next) => {
    try {
     const products = await Product.findAll({include:[Category, Review]})
     res.send(products)
    
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
 .post(cloudinaryMulter.single("image"), async (req,res , next) => {
     try {

        if(!req.file){
          req.body.imageUrl = "https://via.placeholder.com/150"
        } else {
           req.body.imageUrl= req.file.path
        }

        const product = await Product.create(req.body)
         res.send(product)
        } catch (error) {
         console.log(e);
         next(e);
    }
  })

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [Category, {model: Review, where: {productId : req.params.id}}]
      })
      res.send(product)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(cloudinaryMulter.single("productImg"), async (req, res, next) => {
    req.body.imageUrl = req.file.path
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(product[1][0])
  })
  .put(async (req, res, next) => {
    try {
      const product = await Product.update(req.body, {where:{id:req.params.id}, returning:true})
      res.send(product)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
     const rows = await Product.destroy({where:{id:req.params.id}})
     if(rows>0) {
       res.send('ok')
     } else {
       res.status(404).send('Not found')
     }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:productId/reviews/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll({where: {productId: req.params.productId }})
      res.send(reviews)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      req.body.productId = req.params.productId
      const reviews = await Review.create(req.body)
      res.send(reviews)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })


  router.route("/:productId/reviews/:reviewId")
  .get(async (req, res, next)=>{
    try {
       const review = await Review.findByPk(req.params.reviewId ,{
           include :  Product
       })
       res.send(review)
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req,res,next) =>{ 
     try {
          const review = await Review.update(req.body , 
            {where : { id : req.params.reviewId 
              , productId : req.params.productId}, 
              returning : true})
              res.send(review)
     } catch (error) {
         console.log(error)
         next(error)
     }
  })
    .delete(async (req,res,next) =>{ 
     try {
          const rows = await Review.update(req.body , 
            {where : { id : req.params.reviewId 
              , productId : req.params.productId}})
              if(rows>0) {
              res.send('ok')
             } else {
              res.status(404).send('Not found')
            }
              
              
     } catch (error) {
         console.log(error)
         next(error)
     }
  })

module.exports = router;