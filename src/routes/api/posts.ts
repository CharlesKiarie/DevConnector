import express, { Router, Request, Response } from "express";
import passport from "passport";
import mongoose from "mongoose";
import { IUser, IErrors, IPost, Comment } from "../../interfaces/Interface";
import Post from "../../models/Post";
import Profile from "../../models/Profile";
import validatePostInput from "../../validation/validatePostInput";

const router: Router = express.Router();
type AuthenticatedRequest = Request & {user: IUser}


// @route   GET api/posts/test
// @desc Test posts route
// @access Public
router.get('/test', (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Posts works"
    })
});

// @route   Get api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req: Request, res: Response) => {
    try {
        const errors: IErrors = {};

        const posts = await Post.find().sort({ date: -1 });
        if(!posts) {
            errors.posts = "No posts were found";
            return res.status(404).json(errors);
        }
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error);  
    }
});

// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const errors: IErrors = {};

        const post = await Post.findById(req.params.id);
        if(!post) {
            errors.posts = "No post of the id found";
            return res.status(404).json(errors);
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;

        const {errors, isValid} = validatePostInput(req.body);

        if(!isValid) return res.status(400).json(errors);

        const newPost: IPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: x.user._id,
        });

        const post = await newPost.save();
        if(post) {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    const x = req as AuthenticatedRequest;

    // Profile.findOne({user: x.user.id})
    // .then(profile => {
    //     Post.findById(req.params.id)
    //     .then(post => {
    //         // Check for post owner
    //         if(post.user.toString() !== x.user.id) {
    //             return res.status(401).json({notauthorized: "User not authorized"});
    //         }

    //         // Delete
    //         post.remove().then(() => res.status(200).json({Success: true}));
    //     })
    //     .catch(err => res.status(404).json({postNotFound: "No post found"}));
    // })

    try {
        const x = req as AuthenticatedRequest;

        const profile = await Profile.findOne({user: x.user._id});
        if(!profile) return res.status(401).json({notauthorized: "User not authorized!"});

        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({posts: "Post of ID does not exist!"});

        // Check for post owner
        if(post.user !== x.user.id) return res.status(401).json({notauthorized: "User not authorized"});

        // post.remove().then(() => res.status(200).json({Success: true}));
        const removedPost = await post.remove();
        if(removedPost) {
            res.status(200).json({Success: true});
        }
        
    } catch (error) {
        res.status(500).json(error);
    }

});

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.delete('/like/:id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const profile = await Profile.findOne({user: x.user._id});
        if(!profile) {
            return res.status(401).json({notauthorized: "User not authorized!"});
        }
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({posts: "Post of ID does not exist!"});
        }
        // Check if user already liked the post
        if(post.likes.filter(like => like.user === x.user._id).length > 0) {
            return res.status(400).json({posts: "User already liked the post"});
        }

        // Add user to likes array
        post.likes.unshift({user: x.user._id});
        const newLike = await post.save();
        if(newLike) {
            res.status(200).json(newLike);
        }
        
    } catch (error) {
        res.status(500).json(error);
    }

});

// @route   DELETE api/posts/unlike/:id
// @desc    Un-like a post
// @access  Private
router.delete('/like/:id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const profile = await Profile.findOne({user: x.user._id});
        if(!profile) {
            return res.status(401).json({notauthorized: "User not authorized!"});
        }
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({posts: "Post of ID does not exist!"});
        }
        // Check if user already liked the post
        if(post.likes.filter(like => like.user === x.user._id).length === 0) {
            return res.status(400).json({posts: "You have not yet liked this post"});
        }

        // Remove user from likes array
        const removeIndex = post.likes.map(item => item.user).indexOf(x.user._id);
        post.likes.splice(removeIndex, 1);
        const newLike = await post.save();
        if(newLike) {
            res.status(200).json(newLike);
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        
        const {errors, isValid} = validatePostInput(req.body);
        if(!isValid) return res.status(400).json(errors);

        const newComment: Comment = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: x.user._id,
        });

        const post = await Post.findById(req.body.params)
        if(!post) {
            return res.status(404).json({posts: "Post of ID does not exist!"});
        }
        post.comments.unshift(newComment);
        const newPost = await post.save();
        if(newPost) {
            res.status(200).json(newPost);
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const x = req as AuthenticatedRequest;
        const comment_id = new mongoose.Schema.Types.ObjectId(req.params.comment_id);

        const post = await Post.findById(comment_id);
        if(!post) {
            return res.status(404).json({posts: "Post of ID does not exist!"});
        }
        if(post.comments.filter(comment => comment.id === comment_id).length === 0) {
            return res.status(404).json({posts: "Comment of ID does not exist!"});
        }

        // Remove comment
        const removeIndex = post.comments.map(item => item.id).indexOf(comment_id);
        post.comments.splice(removeIndex, 1);
        const newPost = await post.save();
        if(newPost) {
            res.status(200).json(newPost);
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
});


export default router;