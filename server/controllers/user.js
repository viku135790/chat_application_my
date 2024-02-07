import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"


export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const isAlreadyAccount = await User.findOne({ email })

        if (isAlreadyAccount !== null) {
            return res.status(403).json({ message: "Account already exit" })
        }
        else {
            if (password !== confirmPassword) {
                return res.status(403).json({ message: "Password is not correct" })
            }
            else {
                console.log("Accout creating")
                // 12 is salt its difficulive of password after bcrypt is successful 
                const hashedPassword = await bcrypt.hash(password, 12)
                const result = await User.create({
                    email: email,
                    password: hashedPassword,
                    name: `${firstName} ${lastName}`
                })
                const token = jwt.sign({ email: result.email, id: result._id }, "text", { expiresIn: "1h" })
                return res.status(200).json({ token, result })
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}


export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) {
                return res.status(404).json({ message: "Invalid password" })
            }
            else {
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, "test", { expiresIn: "1h" })
                return res.status(200).json({ result: existingUser, token })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}