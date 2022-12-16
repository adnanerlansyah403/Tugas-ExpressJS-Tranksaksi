import db from "../models/index.js"

async function index(req, res) {
    
    await db.customer.findAll()
        .then(customers => {
            return res.status(200).json({
                status: true,
                message: "Get all data customers",
                customers: customers
            });
        });

}

async function show(req, res) {

    await db.customer.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                status: false,
                message: "Customer Not Found",
                customer: null
            })
        }
        return res.status(200).json({
            status: true,
            message: "Get specific customers",
            customer: customer
        })
    })


}

async function store(req, res) {
    
    await db.customer.create({
        name: req.body.name,
        email: req.body.email,
        telp: req.body.telp,
        nik: req.body.nik,
        alamat: req.body.alamat
    })
    .then(customer => {
        return res.status(200).json({
            status: true,
            message: "Successfully create a new customer",
            customer: customer
        })
    })


}

async function update(req, res) {


    await db.customer.update(
        {
            name: req.body.name,
            email: req.body.email,
            telp: req.body.telp,
            nik: req.body.nik,
            alamat: req.body.email
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(id => {
        let customer = db.customer.findOne({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            status: true,
            message: "Update user successfully",
            customer: customer
        })
    })


}

async function destroy(req, res) {

    let customer = await db.customer.destroy({
        where: {
            id: req.params.id
        }
    }).then(customer => {
        return res.status(200).json({
            status: true,
            message: "Succesfully delete a customer",
            customer: customer
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