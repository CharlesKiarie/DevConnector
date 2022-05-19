import 'dotenv/config';
import express, {  Application, Request, Response } from "express";
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser, { json } from 'body-parser';
import passport from 'passport';
import passPortConfig from './util/passport';

import users from './routes/api/users';
import posts from './routes/api/posts';
import profile from './routes/api/profile';

const app: Application = express();
const PORT = process.env.PORT ?? 5000;

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello world");
});

// Passport Middleware
app.use(passport.initialize());

// Passport config
passPortConfig(passport);


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