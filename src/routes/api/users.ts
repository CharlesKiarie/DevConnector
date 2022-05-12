import express, { Router } from "express";
const router: Router = express.Router();

// @route   GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => {
    res.status(200).json({
        msg: "Users works"
    })
});

export default router;