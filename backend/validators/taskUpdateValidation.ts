import { body, param } from 'express-validator';

export const taskUpdateValidationRules = () => {
    return [
        param('taskId').isInt().withMessage('Task ID must be an integer'),
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().isString(),
        body('deadline').optional().isISO8601().toDate(),
        // Ajoute d'autres règles de validation selon tes besoins
    ];
};
