import db from "../models/index.js";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    console.log(req);
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).json({
                message: "Failed!, Credentials does not match"
            });
            return;
        }

        db.user.findOne({
            where: {
                email: req.body.email
              }
            }).then(user => {
            if (user) {
            res.status(400).send({
                message: "Failed! Credentials does not match!"
            });
            return;
            }
        
            next();
        });
    });
}

const checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!db.ROLES.includes(req.body.roles[i])) {
                res.status(401).send({
                    message: "Failed! You're unauthorized"
                });
                return;
            }
        }
    }

    next();
}

export default {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

// export default verifySignUp;