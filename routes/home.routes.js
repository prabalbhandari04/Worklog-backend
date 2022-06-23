import express from 'express';

const router = express.Router();

router.route('/').get((req, res, next) => {
    return res.json({
        status: 'success',
        message: 'This is the backend API for Maven worklog ',
    });
});

export default router;
