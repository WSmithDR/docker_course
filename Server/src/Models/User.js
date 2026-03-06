const { DataTypes } = require("sequelize")
const bcrypt = require('bcryptjs')

module.exports = sequelize => {
    sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                console.log('Setter called with:', value)
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(value, salt)
                console.log('Hash generated:', hash)
                this.setDataValue('password', hash)
            }
        }
    }, {
        timestamps: false
        // Eliminados los hooks para evitar doble hasheo
    })
}