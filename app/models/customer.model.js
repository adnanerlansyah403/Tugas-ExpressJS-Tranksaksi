export default (sequelize, dataType) => {

    const Customer = sequelize.define("customers", {
            name: {
                type: dataType.STRING,
                allowNull: false,
            },
            email: {
                type: dataType.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notNull: {
                        msg: "An email is required"
                    }
                },
                unique: true,

            },
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
            username: {
                type: dataType.STRING,
                allowNull: true,
            }
        },
    )

    return Customer;

}