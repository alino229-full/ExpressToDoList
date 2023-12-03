import { body } from 'express-validator';

export const taskValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').optional().isString(),
        body('deadline').optional().isISO8601().toDate(),
        // Ajoute d'autres règles de validation selon tes besoins
    ];
};
