export default (sequelize, dataType) => {

    const Order = sequelize.define("orders", {
        uuid: {
            type: dataType.UUID,
            primaryKey: true
        },
        tanggal_order: {
            type: dataType.INTEGER
        },
        status: {
            type: dataType.ENUM,
            values: ["paid", "unpaid"]
        }
    })

    return Order;

}