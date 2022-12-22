import controller from "../controllers/order.controller.js"
import authJwt from "../middleware/authJwt.js" 

function Order(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    });

    app.get("/api/orders", 
        [authJwt.verifyToken],
        controller.index
    )
    
    app.get("/api/orders/:id/show", 
        [authJwt.verifyToken],
        controller.show
    )
    
    app.post("/api/orders", 
        [authJwt.verifyToken],
        controller.store
    )
    
    app.post("/api/orders/:id/update", 
        [authJwt.verifyToken],
        controller.update
    )
    
    app.post("/api/orders/:id/destroy",
        [authJwt.verifyToken], 
        controller.destroy
    )
}

export default Order