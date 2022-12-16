import controller from "../controllers/customer.controller.js"
import authJwt from "../middleware/authJwt.js" 

function Customer(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    });

    app.get("/api/customers", 
        [authJwt.verifyToken],
        controller.index
    )
    
    app.get("/api/customers/:id/show", 
        [authJwt.verifyToken],
        controller.show
    )
    
    app.post("/api/customers", 
        [authJwt.verifyToken],
        controller.store
    )
    
    app.post("/api/customers/:id/update", 
        [authJwt.verifyToken],
        controller.update
    )
    
    app.get("/api/customers/:id/destroy",
        [authJwt.verifyToken], 
        controller.destroy
    )
}

export default Customer