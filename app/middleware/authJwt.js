import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
// import db from "../models";
// import User from db.user;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({
            message: "Can't access without token",
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: "Unauthorized",
            });
        }
        req.userId = decoded.id;
        next()
    })
}

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            return res.status(403).send({
                message: "You do not have permission to access this page"
            })
        })
    })
}

const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i< roles.length; i++) {
                if(roles[i].name == "moderator") {
                    return next();
                }
            }

            return res.status(403).send({
                message: "You do not have permission to access this page"
            })
        })
    })
}

const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "moderator" || roles[i].name === "admin") {
                    return next();s
                }
            }

            return res.status(403).send({
                message: "You do not have permission to access this page"
            });
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}

export default authJwt;


// export default {
//     verifyToken,
//     isAdmin,
//     isModerator,
//     isModeratorOrAdmin,
// };