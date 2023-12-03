import { Request, Response } from 'express';
// @ts-ignore
import { sequelize } from '../database';
import {initTask, Task} from "../models/Task";

initTask(sequelize);
// Routes pour les tâches
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        // Récupération de l'ID de l'utilisateur depuis les paramètres de requête
        const userId = req.query.authorId; // Ceci récupère l'ID de l'utilisateur depuis les paramètres de requête

        if (!userId) {
            return res.status(400).json({ message: "L'ID de l'utilisateur est manquant." });
        }
        // Filtrer les tâches en fonction de l'ID de l'utilisateur
        const tasks = await Task.findAll({
            where: {
                authorId: userId // Assurez-vous que ce champ correspond à votre modèle de données
            }
        });

        console.log(tasks); // Log pour débogage

        res.status(200).json(tasks);
    } catch (error: any) {
        console.error(error); // Log l'erreur
        res.status(500).json({ message: error.message });
    }
};




export const createTask = async (req: Request, res: Response) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


export const updateTask = async (req: Request, res: Response) => {
    try {
        const updatedTask = await Task.update(req.body, { where: { id: req.params.taskId } });
        if (updatedTask[0] === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        // Assurez-vous que le champ 'status' est inclus dans la requête.
        if (req.body.status === undefined) {
            return res.status(400).json({ message: 'Status not provided' });
        }

        // Mise à jour de l'état de la tâche
        const updatedTask = await Task.update(
            { status: req.body.status }, // Mise à jour uniquement du statut
            { where: { id: req.params.taskId } } // Filtre pour identifier la tâche
        );

        if (updatedTask[0] === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};




export const deleteTask = async (req: Request, res: Response) => {
    try {
        const deletedTask = await Task.destroy({ where: { id: req.params.taskId } });
        if (deletedTask === 0) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
