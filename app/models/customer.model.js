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
            tanggal_lahir: {
                type: dataType.DATE
            },
            jenis_kelamin: {
                type: dataType.ENUM,
                values: ["L", "P"]
            },
            userId: {
                type: dataType.INTEGER
            }
        },
    )

    return Customer;

}