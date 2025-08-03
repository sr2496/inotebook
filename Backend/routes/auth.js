const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

router.post('/create-user', [
    body('name').isLength({ min: 3 }).withMessage('Enter a valid name.'),
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters.')
], async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: 'Sorry a user with this email already exist' })
        }
        user = await User.create({ name: name, email: email, password: hash })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, 'shhhhh');
        return res.status(201).json({ authToken });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters.')
], async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Please try to login with correct credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please try to login with correct credentials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, 'shhhhh');
        return res.status(201).json({ authToken });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

router.get('/get-user', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }

})

module.exports = router;