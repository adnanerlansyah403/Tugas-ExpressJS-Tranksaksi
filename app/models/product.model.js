export default (sequelize, dataType) => {

    const Product = sequelize.define("products", {
        nama: {
            type: dataType.STRING
        },
        uom: {
            type: dataType.STRING
        },
        harga: {
            type: dataType.INTEGER
        },
        stock: {
            type: dataType.INTEGER
        }
    })

    return Product;

}