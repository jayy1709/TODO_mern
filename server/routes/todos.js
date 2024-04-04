import express from 'express';
import { createTodo, readTodos } from '../controller/todos.js';

const router =express.Router();
router.get('/',readTodos);
router.post('/',createTodo);
export default router;