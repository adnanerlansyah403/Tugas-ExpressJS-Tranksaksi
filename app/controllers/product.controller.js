import db from "../models/index.js"

async function index(req, res) {
    
    await db.product.findAll()
        .then(products => {
            return res.status(200).json({
                status: true,
                message: "Get all data product",
                products: products
            });
        });

}

async function show(req, res) {

    await db.product.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(product => {
        if(!product) {
            return res.status(404).json({
                status: false,
                message: "Product Not Found",
                product: null
            })
        }
        return res.status(200).json({
            status: true,
            message: "Get the specific product",
            product: product
        })
    })


}

async function store(req, res) {

    const t = await db.sequelize.transaction();

    try {

        const product = await db.product.create(
            {
                "nama": req.body.nama,
                "uom": req.body.uom,
                "harga": req.body.harga,
                "stock": req.body.stock
            }, { transaction: t });

        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Successfully create the new product",
            data: product
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }


}

async function update(req, res) {

    
    const t = await db.sequelize.transaction();

    try {

        const product = await db.product.update(
            {
                "nama": req.body.nama,
                "uom": req.body.uom,
                "harga": req.body.harga,
                "stock": req.body.stock
            }, {
            where: {
                id: req.params.id
            }
        }, { transaction: t });

        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Successfully updated the product",
            data: null
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }

}

async function destroy(req, res) {

    const t = await db.sequelize.transaction();

    try {

        const product = await db.product.destroy({
            where: {
                id: req.params.id
            }
        }, { transaction: t });

        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Successfully deleted the product",
            data: product
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