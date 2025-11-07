import express from 'express';
import { listUsers, findUserByEmail, updateUser, deleteUser } from './user.controller.js';
import { protect, requireRole } from '../../middleware/auth.js';


const router = express.Router();
router.post('/email/', findUserByEmail);
router.get('/', listUsers);
// router.put('/:id', protect, updateUser); // admin functionality

export default router;