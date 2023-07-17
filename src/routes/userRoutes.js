import express from 'express';
const router = express.Router();
import userControllers from '../controllers/userControllers';

router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createNewUsers)
    .patch(userControllers.updateUsers)
    .delete(userControllers.deleteUsers)

export default router