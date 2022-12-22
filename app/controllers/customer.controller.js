import db from "../models/index.js"
import bcrypt from 'bcryptjs';

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

async function update(req, res) {
    
    const t = await db.sequelize.transaction();

    try {

        const user = await db.user.update(
            {
                "username": req.body.username,
                "email": req.body.email,
                "password": req.body.password != null && bcrypt.hashSync(req.body.password, 10),
            },
            {
            where: {
                id: req.params.id
            }    
        }, { transaction: t });

        const customer = await db.customer.update(
            {
                "telp": req.body.telp,
                "nik": req.body.nik,
                "alamat": req.body.alamat,
                "jenis_kelamin": req.body.jenis_kelamin,
                "userId": user.id
            },
            {
            where: {
                id: req.params.id
            }    
        }, { transaction: t });

        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Successfully updated the customer",
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

        const user = await db.user.destroy({
            where: {
                id: req.params.id
            }    
        }, { transaction: t });

        await t.commit();

        return res.status(201).send({
            success: true,
            message: "Successfully deleted the customer",
            data: null
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }


}

export default {
    index,
    show,
    update,
    destroy
}