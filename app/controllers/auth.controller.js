import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Op = db.Sequelize.Op;

const signup = (req, res) => {
    // Save User to Database
    db.user.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
        db.role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
            });
        });
        } else {
        // user role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
} 

const signin = async (req, res) => {
 
    await db.user.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
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