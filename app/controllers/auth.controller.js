import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Op = db.Sequelize.Op;

const signup = async (req, res) => {
    // Save User to Database
    
    const t = await db.sequelize.transaction();
    try {
        const user = await db.user.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        }, { transaction: t });

        const customer = await db.customer.create({
            telp: req.body.telp,
            nik: req.body.nik,
            alamat: req.body.alamat,
            tanggal_lahir: req.body.tanggal_lahir,
            jenis_kelamin: req.body.jenis_kelamin,
            userId: user.id
        }, { transaction: t })

        await t.commit();

        let token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        })

        return res.status(201).send({
            success: true,
            message: "Signup Successful",
            data: [
                {
                    user,
                    token
                },
                customer
            ]
        })
    
    } catch (error) {
    
        await t.rollback();
        return res.status(500).send({ message: error.message });
    }
} 

const signin = (req, res) => {
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found!"
            })
        }
         

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Credentials!"
            })
        }

        let token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        })

        let authorities = [];
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    })
    .catch(err => {
        return res.status(500).send({ message: err.message })
    })
}

export default { 
    signup,
    signin
}