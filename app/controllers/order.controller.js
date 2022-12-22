import db from "../models/index.js"

async function index(req, res) {
    
    await db.order.findAll()
        .then(orders => {
            return res.status(200).json({
                status: true,
                message: "Get all data order",
                orders: orders
            });
        });

}

async function show(req, res) {

    await db.order.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(order => {
        if(!order) {
            return res.status(404).json({
                status: false,
                message: "Order Not Found",
                order: null
            })
        }
        return res.status(200).json({
            status: true,
            message: "Get the specific order",
            order: order
        })
    })


}

async function store(req, res) {

    const t = await db.sequelize.transaction();

    try {

        const order = await db.order.create(
            {
                "customerId": req.body.customer_id,
                "productId": req.body.product_id,
                "tanggal_order": req.body.tanggal_order,
                "status": "unpaid"
            }, { transaction: t });

        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Successfully create a new order",
            data: order
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }


}

async function update(req, res) {

    
    const t = await db.sequelize.transaction();

    try {

        const order = await db.order.update(
            {
                "customeId": req.params.custome_id,
                "productId": req.body.product_id,
                "tanggal_order": req.body.tanggal_order,
                "status": req.body.status
            }, {
            where: {
                id: req.params.id
            }
        }, { transaction: t });

        await t.commit();

        if(order == 0) {
            return res.status(404).json({
                status: false,
                message: "Order Not Found",
                data: order
            })
        }
        
        return res.status(200).send({
            success: true,
            message: "Successfully updated the order",
            data: order
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }

}

async function destroy(req, res) {

    const t = await db.sequelize.transaction();

    try {

        const order = await db.order.destroy({
            where: {
                id: req.params.id
            }
        }, { transaction: t });

        await t.commit();

        if(order == 0) {
            return res.status(404).json({
                status: false,
                message: "Order Not Found",
                order: null
            })
        }

        return res.status(200).send({
            success: true,
            message: "Successfully deleted the order",
            data: order
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }

}

export default {
    index,
    show,
    store,
    update,
    destroy
}