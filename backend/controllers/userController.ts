import { Request, Response } from 'express';
require('dotenv').config();
// @ts-ignore
import { initUser,User } from '../models/User';
import { sequelize } from '../database';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';



initUser(sequelize)
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Crypte le mot de passe
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(200).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        const userId = decoded.id; // Assure-toi que l'ID est bien défini dans ton token

        if (typeof userId === 'number' || typeof userId === 'string') {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const { id, email } = user; // Exemple de champs à renvoyer
            res.status(200).json({ id, email });
        }




    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};




