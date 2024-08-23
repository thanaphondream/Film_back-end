const db = require("../models/db");

exports.deleteproduct = async (req, res, next ) => {
    const {productId} = req.params

    try {
        const product = await db.product.delete({
            where: {
                id: Number(productId)
            }
        })
        res.json(product)
    } catch (error) {
        next(error)
        
    }
}

exports.addproduct = async (req, res, next) => {
  
    try {
      const {
        ItemName,	
        price,
        description	,
        restaurantsId,
        file } = req.body;
      
      if (!(ItemName && price && description &&restaurantsId&&file)) {
        return next(new Error("Fulfill all inputs"));
      }
      
  
      const rs = await db.ItemName.create({data})
      console.log(rs)
  
      res.json({ msg: 'Register successful' })
    } catch (err) {
      next(err);
    }
  };

  exports.getorders = async (req, res, next) => {
    try {
      const order = await db.payment.findMany();
      res.json(order);
    } catch (error) {
      next(error);
    }
  };

  exports.updateProduct = async (req, res, next) => {
    const {email, phone} = req.body
    try {
        const reserved = await db.user.update({
            where: {
                id: req.user.id
            },
            data: {
                email,
                phone
                
            }
        })
        res.json(reserved)

    } catch (error) {
        next(error)
    }
}

exports.admingetAddress = async (req, res, next) => {
  try {
      const address = await db.address.findMany();
      res.json(address);
  } catch (error) {
      next(error);
  }
};


exports.getUserDetails = async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user details:', error); 
    next(error);
  }
};

exports.getadminorder = async (req, res, next) => {
  try{
      const payments = await db.payment.findMany({
          include: {
              address: true,
              order: {
                  include: {
                      ordercart: {
                          include: {
                              product: true
                          }
                      }
                  }
              }
          }
      })
      res.json(payments)
  }catch(err){
    next(err)
  }
}