const db = require("../models/db");
const cloudUpload = require("../middlewares/cloudUpload");

exports.createProduct = async (req, res, next) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'Please provide an image file' });
    }

    const { ItemName, price, description, stock } = req.body;
    
    const imagePromises = req.files.map(file => cloudUpload(file.path)); 
    const imageUrls = await Promise.all(imagePromises);

    const product = await db.product.create({
      data: {
        ItemName,
        price: +price,
        description,
        stock: parseInt(stock, 10),
        file: imageUrls.join(','), 
      }
    });

    res.json({ msg: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error); 
    next(error);
  }
};


  exports.getproduct = async (req, res, next) => {
    try {
      const product = await db.product.findMany();
      res.json(product);
    } catch (error) {
      next(error);
    }
  };


exports.updatestock = async (req, res, next) => {
  try{
    const { id } = req.params
    const { stock } = req.body
    const products = await db.product.update({
      where: {
        id: Number(id)
      }, data: {
        stock: parseInt(stock)
      }
    })
    res.json({msg: "UpdateStock This Ok : ", products})
  }catch(err){
    next(err)
  }
}
