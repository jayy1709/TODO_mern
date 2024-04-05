import express from 'express';
import { createTodo, readTodos, updateTodo } from '../controller/todos.js';

const router =express.Router();
router.get('/',readTodos);
router.post('/',createTodo);
router.post('/',updateTodo);
export default router;