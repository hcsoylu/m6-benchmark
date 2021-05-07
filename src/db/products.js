
module.exports = (sequelize, DataTypes) =>{
    const Product = sequelize.define("product", {
          id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
          name: {
          type: DataTypes.STRING,
          required: true,
          allowNull: false,
        }, 
          description : {
           type: DataTypes.STRING,
           required: true,
        }, 
          brand:{
           type: DataTypes.STRING,
           required: true,
           allowNull : false,
        }, 
          price: {
          type: DataTypes.FLOAT,
          required: true,
        },
          imageUrl: {
          type: DataTypes.STRING,
          required: true,
          allowNull : false,
        },
      });
      Product.associate = (models) => {
       Product.belongsTo(models.Category)
       Product.belongsToMany(models.User, {through:{model:models.Cart, unique:false} })
       Product.hasMany(models.Cart)
       Product.hasMany(models.Review)
       }
      return Product
}