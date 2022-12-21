export default (sequelize, dataType) => {

    const Product = sequelize.define("products", {
        uuid: {
            type: dataType.UUID,
            primaryKey: true
        },
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