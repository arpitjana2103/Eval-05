const {User} = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async function (req, res) {
    try {
        console.log(req.body);
        const {email, password, passwordConfirm} = req.body;
        if (password !== passwordConfirm)
            throw new Error('Password !== PasswordConfirm');

        const hashedPass = await bcrypt.hash(password, 5);

        await User.create({
            email: email,
            password: hashedPass,
        });

        return res.status(201).json({
            status: 'success',
            message: 'New user Created',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const login = async function (req, res) {
    try {
        console.log('Login Called');
        const {email, password} = req.body;

        if (!email || !password) {
            throw new Error('Email and Password to continue');
        }

        const user = await User.findOne({email});

        if (!user) {
            throw new Error('Incorrect Email or Password');
        }

        console.log(user);

        const currectPass = await bcrypt.compare(password, user.password);

        if (!user || !currectPass) {
            throw new Error('Incorrect Email or Password');
        }

        user.password = undefined;

        const token = jwt.sign({id: user._id}, process.env.JWT_SEC);

        return res.status(200).json({
            status: 'success',
            message: 'Login Successfull',
            token: token,
            data: {
                data: user,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const protect = async function (req, res, next) {
    try {
        let token = req.headers.authentication;

        if (!token) {
            throw new Error('Please Log-In to continue.');
        }
        if (!token.startsWith('Bearer')) {
            throw new Error('Bearer Token not Found');
        }
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error('Invalid Token..');
        }
        return next();
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {register, login, protect};
