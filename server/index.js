import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todosRoutes from './routes/todos.js'

const app = express();
dotenv.config();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/todos',todosRoutes)


app.get('/', (req, res) => {
    res.send('Server is live')

})
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.mongodb).then(() => {
    app.listen(PORT,()=> console.log(`server is runnig on ${PORT}`))
}).catch(err => console.log(err))