const express = require("express");
const Product = require('../../db').Product
const Category = require('../../db').Category
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
     const categories = await Category.findAll()
     res.send(categories)
    
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const category = await Category.create(req.body)
      res.send(category)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id)
      res.send(category)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
       const category = await Category.update(req.body, {where : {id: req.params.id},
      returning : true})
      res.send(category)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
       const rows = await Category.destroy({where : {id : req.params.is}})
       if (rows > 0) { res.send("OK")}
       else {
         res.status(404).send("not found")
       }
      
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
