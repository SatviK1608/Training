module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      category: {
        type: Sequelize.STRING,
      },
      availability: {
        type: Sequelize.BOOLEAN,
      },
      color: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
    },
  {timestamps:false});
  
    return Product;
  };
  