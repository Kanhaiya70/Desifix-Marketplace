import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

exports.register = async(req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password : hashedPassword, role});
    res.status(201).json({message : 'User registered successfully!'});
};

exports.login = async(req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if(!user)
        return res.status(400).json({message : 'User not found'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
        return res.status(400).json({message : 'Invalid password'});

    const token = jwt.sign({userId : user._id, role : user.role}, process.env.JWT_SECRET, {expiresIn : '1d'});

    res.json({ token, role : user.role});
};