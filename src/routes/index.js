import express from 'express';

const router = express.Router();

router.route('/').get((req,res) => {
    if (req.body.user) {
        console.log("API and body testing successful!", req.body.user)
        return res.json({
            status: 200,
            message: "API and body testing successful!"
        })
    } 
    else {
        console.log("Body passing error")
        return res.json({
            status: 404,
            message: "Body passing error"
        });

    }
})

export default router;