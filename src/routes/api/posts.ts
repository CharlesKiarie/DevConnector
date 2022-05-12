import express, { Router } from "express";
const router: Router = express.Router();


// @route   GET api/posts/test
// @desc Test posts route
// @access Public
router.get('/test', (req, res) => {
    res.status(200).json({
        msg: "Posts works"
    })
});

export default router;