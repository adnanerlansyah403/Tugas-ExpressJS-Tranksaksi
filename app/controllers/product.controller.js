import db from "../models/index.js"

async function index(req, res) {
    
    await db.product.findAll()
        .then(products => {
            return res.status(200).json({
                status: true,
                message: "Get all data products",
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
                message: "product Not Found",
                product: null
            })
        }
        return res.status(200).json({
            status: true,
            message: "Get specific the product",
            product: product
        })
    })


}

async function store(req, res) {
    
    await db.product.create(req.body)
    .then(product => {
        return res.status(200).json({
            status: true,
            message: "Successfully create a new product",
            product: product
        })
    })


}

async function update(req, res) {


    await db.product.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(id => {
        let product = db.product.findOne({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            status: true,
            message: "Update product successfully",
            product: product
        })
    })


}

async function destroy(req, res) {

    let product = await db.product.destroy({
        where: {
            id: req.params.id
        }
    }).then(product => {
        return res.status(200).json({
            status: true,
            message: "Succesfully delete a product",
            product: product
        })
    });


}

export default {
    index,
    show,
    store,
    update,
    destroy
}