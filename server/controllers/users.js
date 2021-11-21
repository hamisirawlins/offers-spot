import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        //Check User Exists
        if (!existingUser) return res.status(404).json({ message: "User Doesn't Exist." });

        //Check Password Correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });

        //Token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Backend Error" });
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {

        //Check User Already Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already Exists." });

        //Compare Passwords
        if (password!==confirmPassword) return res.status(400).json({ message: "Passwords Don't Match." });
        
        //Create User with hashed password
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({email,password:hashedPassword, name:`${firstName} ${lastName}`});

        //Create token as well
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Account Creation Error"});
    }

}