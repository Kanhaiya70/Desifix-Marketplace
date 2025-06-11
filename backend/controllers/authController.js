import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

export const register = async(req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password : hashedPassword, role});
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.name, user.email, user.role)
    });
};

export const login = async(req, res) => {
    const {email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message : 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message : 'Invalid password'});

        const token = jwt.sign({userId : user._id, email: user.email, role : user.role}, process.env.JWT_SECRET, {expiresIn : '1d'});

        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Login failed'});
    }
};