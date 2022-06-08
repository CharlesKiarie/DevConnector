import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import mongoose from "mongoose";
import passport from "passport";
import { IUser, IErrors, IProfile, Social, Experience, Education } from "../../interfaces/Interface";
import Profile from "../../models/Profile";
import User from "../../models/User";
import validateEducationInput from "../../validation/validateEducationInput";
import validateExperienceInput from "../../validation/validateExperienceInput";
import validateProfileInput from "../../validation/validateProfileInput";

type AuthenticatedRequest = Request & {user: IUser};

// @route   GET api/profile/test
// @desc Test profile route
// @access Public
router.get('/test', (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Profile works"
    })
});

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const errors: IErrors = {};

        const profile = await Profile.findOne({user: x.user._id}).populate('user', ['name', 'avatar']).exec();
        if(!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(404).json(error);
    }
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req: Request, res: Response) => {
    try {
        const errors: IErrors = {};

        const profiles = await Profile.find().populate('user', ['name', 'avatar']).exec();
        if(!profiles) {
            errors.noprofile = "There are no profiles";
            res.status(404).json(errors);
        }
        res.status(200).json(profiles);

    } catch (error) {
        res.status(404).json({error, noprofile: "There are no profiles"});
    }
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', async (req: Request, res: Response) => {
    try {
        const errors: IErrors = {};

        const profile = await Profile.findOne({handle: req.params.handle}).populate('user', ['name', 'avatar']).exec();
        if(!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req: Request, res: Response) => {
    try {
        const errors: IErrors = {};

        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']).exec();
        if(!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }

        res.status(200).json(profile);

    } catch (error) {
        res.status(404).json({error, noprofile: "There is no profile for this user"});
    }
});

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        // Get fields
        const x = req as AuthenticatedRequest;
        const profileFields: Partial<IProfile> = {};
        // let profileFields!: IProfile;

        const {errors, isValid} = validateProfileInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }

        if(x.user._id) profileFields.user = x.user._id;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

        //Skills - split into array
        if(typeof req.body.skills !== "undefined") {
            profileFields.skills =  req.body.skills.split(',');
        };

        //Socials
        profileFields.social = {} as Social;
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
        
        const profile = await Profile.findOne({ user: x.user._id});
        if(profile) {
            //Update
            const profile = await Profile.findOneAndUpdate(
                {user: x.user._id},
                {$set: profileFields},
                {new: true}
            );
            res.status(200).json(profile);
        } else {
            // Create
            // Check if handle exists
            const profile = await Profile.findOne({ handle: profileFields.handle});
            if(profile) {
                errors.handle = "That handle already exists";
                res.status(400).json(errors);
            }

            //Save profile
            const newProfile = await new Profile(profileFields).save();
            res.status(200).json(newProfile);
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const {errors, isValid} = validateExperienceInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }

        const profile = await Profile.findOne({user: x.user._id});
        if(profile) {
            const newExp: Experience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }

            profile.experience?.unshift(newExp);
            const newProfile = await profile.save();
            if(newProfile) {
                res.status(200).json(newProfile);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const exp_id = new mongoose.Types.ObjectId(req.params.exp_id);
        const errors: IErrors = {};

        const profile = await Profile.findOne({user: x.user._id});
        if(profile && profile.experience) {
            // Get remove index
            const removeIndex = profile.experience.map((item) => {
                console.log("DELETE + " + exp_id);
            console.log("MATCH + " + item.id);
               return item.id
            }).indexOf(exp_id);
            console.log("Remove index " + removeIndex)

            // Splice out Array
            profile.experience.splice(removeIndex, 1);
               
            // Save
            const newProfile = await profile.save();
            if(newProfile) {
                res.status(200).json(newProfile);
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const {errors, isValid} = validateEducationInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }

        const profile = await Profile.findOne({user: x.user._id});
        if(profile) {
            const newEdu: Education = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }

            profile.education?.unshift(newEdu);
            const newProfile = await profile.save();
            if(newProfile) {
                res.status(200).json(newProfile);
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const edu_id = new mongoose.Schema.Types.ObjectId(req.params.edu_id);
        const errors: IErrors = {};

        const profile = await Profile.findOne({user: x.user._id});
        if(profile && profile.education) {
            // Get remove index
            const removeIndex = profile.education.map(item => item.id).indexOf(edu_id);

            // Splice out Array
            profile.education.splice(removeIndex, 1);

            // Save
            const newProfile = await profile.save();
            if(newProfile) {
                res.status(200).json(newProfile);
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
    const x = req as AuthenticatedRequest;
    
    Profile.findOneAndRemove({user: x.user._id}).then(() => {
        User.findByIdAndRemove({_id: x.user._id}).then(() => {
            res.status(200).json({success: true})
        })
    });
});

export default router;