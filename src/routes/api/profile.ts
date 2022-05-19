import express, { Router, Request, Response } from "express";
const router: Router = express.Router();


// @route   GET api/profile/test
// @desc Test profile route
// @access Public
router.get('/test', (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Profile works"
    })
});

export default router;