module.exports = (sequelize, DataTypes) => {

    const Subscriptions = sequelize.define("Subscriptions", {
        service: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        monthlyCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }

    });

    return Subscriptions;
}