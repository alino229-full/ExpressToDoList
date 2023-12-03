import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('expressjs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // ou 'mysql', 'sqlite', 'mssql'
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

export { sequelize };

