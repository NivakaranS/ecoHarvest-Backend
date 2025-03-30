
const  User = require('../../models/users.mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    
    try {const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            password: hashedPassword,
            role
        })
        await newUser.save();
        return res.status(201).json({message: 'User created successfully'})
    } catch(err) {
        return res.status(500).json({message: err})
    }
}

const login = async (req, res) => {
    try {const {username, password} = req.body;

        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET , {expiresIn: '1h'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000 
        })

        return res.status(200).json({ "Message" :"Login successful",  "role": user.role})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: err})
        
    }

}

module.exports = {
    register,
    login
}