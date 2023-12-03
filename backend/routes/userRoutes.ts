import express from 'express';
import {registerUser, loginUser, getUserDetails} from '../controllers/userController';
import {validate} from "../middleware/validate";
import {authenticateToken} from "../middleware/authenticateToken";
import {userLoginValidationRules, userRegistrationValidationRules} from "../validators/userValidation";

const router = express.Router();

router.post('/register', userRegistrationValidationRules(), validate, registerUser);

router.post('/login', userLoginValidationRules(), validate, loginUser);
router.get('/me', authenticateToken, getUserDetails);

export default router;
