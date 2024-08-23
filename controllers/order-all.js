const db = require("../models/db");

exports.orderSave = async (req, res, next) => {
    try{
        const { total_all, price_all, status, date } = req.body
        const orders = await db.order.create({
            data: {
                total_all: parseInt(total_all),
                price_all: parseInt(price_all),
                status,
                date: new Date(date)
            }
        })
        res.json({msg: "Order This OK : ", orders})
    }catch(err){
        next(err)
    }
}

exports.orderCartSave = async (req, res, next) => {
    try{
        const { price, total, orderId, userId, productId} = req.body
        const ordercarts = await db.ordercart.create({
            data: {
                price: parseInt(price),
                total: parseInt(total),
                orderId: parseInt(orderId),
                userId: parseInt(userId),
                productId: parseInt(productId)
            }
        })
        res.json({msg: "OrderCart This Ok", ordercarts})
    }catch(err){
        next(err)
    }
}

