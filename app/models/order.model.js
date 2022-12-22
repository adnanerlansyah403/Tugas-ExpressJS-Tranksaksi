export default (sequelize, dataType) => {

    const Order = sequelize.define("orders", {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tanggal_order: {
            type: dataType.DATE
        },
        status: {
            type: dataType.ENUM,
            values: ["paid", "unpaid"],
            default: "unpaid"
        }
    })

    return Order;

}