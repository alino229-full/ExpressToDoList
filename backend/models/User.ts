import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
}

export function initUser(sequelize: Sequelize): typeof User {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }

    }, {
        tableName: 'users',
        sequelize,
    });

    return User;
}
