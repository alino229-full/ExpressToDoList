// @ts-ignore
import app from './app'; // Assure-toi que le chemin vers app.js est correct

import { sequelize } from "./database"; // Assure-toi que le chemin et l'export sont corrects

const PORT = process.env.PORT || 3000; // Définis la valeur de PORT


sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database successful!');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


