import express, { Router, Request, Response } from "express";
import gravatar, { Options } from "gravatar";
import bycrpt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import User from "../../models/User";
import { IUser } from "../../interfaces/Interface";
import passport from "passport";
import validateRegisterInput from "../../validation/validateRegisterInput";
import validateLoginInput from "../../validation/validateLoginInput";

const router: Router = express.Router();
type AuthenticatedRequest = Request & {user: IUser}


// @route   GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Users works"
    });
});


// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req: Request, res: Response) => {
    try {
        const {errors, isValid} = validateRegisterInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const user = await User.findOne({email: req.body.email});
        if(user) {
            errors.email = "Email already exists"
            res.status(400).json(errors);
        } else {
            const avatar = await gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' //  Default
            } as Options);

            const newUser = await new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });

            bycrpt.genSalt(10, (err, salt) => {
                bycrpt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err));    
                });
            });

        };

    } catch (err) {
        console.log(err)
        //return server error
    }
});


// @route   POST api/users/login
// @desc    Login a users. Returning JWT Token.
// @access  Public
router.post('/login', async (req: Request, res: Response) => {
    try {
        const {errors, isValid} = validateLoginInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const email: string = req.body.email;
        const password: string = req.body.password;

        //Find user by email
        const user = await User.findOne({email});
        if(!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }; 

        //Check Password
        const isMatch = await bycrpt.compare(password, user.password);
        if(isMatch) {
            // Create JWT payload
            const payload = {id: user.id, name: user.name, avatar: user.avatar};
            const secretKey = process.env.SECRET_KEY!;

            // Sign Token
            jwt.sign(payload, secretKey, {expiresIn: 3600} as SignOptions, (err, token) => {
                res.status(200).json({
                    status: true,
                    token: 'Bearer ' + token
                });
            });

        } else {
            errors.password = "Password incorrect!";
            return res.status(400).json(errors);
        };

    } catch (err) {
        console.log(err)
        //return server error
    }
    

});

// @route   GET api/users/current
// @desc    Returns current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}),  (req: Request, res: Response) => {
    const x = req as AuthenticatedRequest;
    res.status(200).json({
        id: x.user._id,
        name: x.user.name,
        email: x.user.email
    })
});

export default router;