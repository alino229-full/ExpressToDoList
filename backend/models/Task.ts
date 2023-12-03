import { Model, DataTypes, Sequelize } from 'sequelize';


export class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public deadline!: Date;
    public authorId!: number;
    public status!: boolean;

}

export function initTask(sequelize: Sequelize): typeof Task {
    Task.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        deadline: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Nom de la table des utilisateurs
                key: 'id'       // Clé primaire dans la table des utilisateurs
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

    }, {
        tableName: 'tasks',
        sequelize,
    });

    return Task;
}