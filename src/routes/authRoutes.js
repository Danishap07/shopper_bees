import express from 'express';
const router = express.Router();
import authControllers from '../controllers/authControllers';
import loginLimiter from '../middlewere/loginLimiter';

router.route('/').post(loginLimiter, authControllers.login)

router.route('/refresh').get(authControllers.refresh)

router.route('/logout').post(authControllers.logout)

export default router