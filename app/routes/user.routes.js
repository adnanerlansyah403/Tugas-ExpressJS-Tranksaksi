import controller from "../controllers/user.controller.js";
import authJwt from "../middleware/authJwt.js";

function User(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })
}

export default User;