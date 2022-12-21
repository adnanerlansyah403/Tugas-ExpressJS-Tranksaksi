import controller from "../controllers/customer.controller.js"
import authJwt from "../middleware/authJwt.js" 

function Product(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    });

    app.get("/api/products", 
        [authJwt.verifyToken],
        controller.index
    )
    
    app.get("/api/products/:id/show", 
        [authJwt.verifyToken],
        controller.show
    )
    
    app.post("/api/products", 
        [authJwt.verifyToken],
        controller.store
    )
    
    app.post("/api/products/:id/update", 
        [authJwt.verifyToken],
        controller.update
    )
    
    app.get("/api/products/:id/destroy",
        [authJwt.verifyToken], 
        controller.destroy
    )
}

export default Product