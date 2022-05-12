import 'dotenv/config';
import express, {  Application, Request, Response } from "express";
import mongoose, { ConnectOptions } from 'mongoose';

import users from './routes/api/users';
import posts from './routes/api/posts';
import profile from './routes/api/profile';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello world");
});

//Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

mongoose.connect(process.env.DATABASE_STRING!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)
.then(result => {
console.log('Database Connected');
app.listen(PORT!);
})
.catch(err => {
console.log(err);
});