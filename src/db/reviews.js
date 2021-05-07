

module.exports = (sequelize, DataTypes) =>{
    const Review = sequelize.define(
        "review",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          comment: {
            type: DataTypes.STRING,
            required: true,
          },
         rate: {
            type: DataTypes.INTEGER,
            required: true,
          },
        },
     
      );
      Review.associate = (models) => {
         Review.belongsTo(models.Product)
      }
      return Review
}