export default (sequelize, dataType) => {

    const Customer = sequelize.define("customers", {
            telp: {
                type: dataType.STRING,
                allowNull: true
            },
            nik: {
                type: dataType.STRING,
                allowNull: false,
            },
            alamat: {
                type: dataType.TEXT,
            },
            userId: {
                type: dataType.INTEGER
            }
        },
    )

    return Customer;

}