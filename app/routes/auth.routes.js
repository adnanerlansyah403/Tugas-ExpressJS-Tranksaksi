import controller from "../controllers/auth.controller.js";
import verifySignUp from './../middleware/verifySignUp.js';

const Auth = (application) => {
    application.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    application.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup
    )

    application.post("/api/auth/signin", controller.signin);
}

export default Auth;
