import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import database from '../middlewere/dbConnection';
import asyncHandler from 'express-async-handler'

const login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required." })
    }

    database.query(`SELECT * FROM user WHERE email='${email}'`, async(err, result) => {
        if(err) {
            return res.status(400).json({ message: err })
        }
        else {
            if(!result[0]) {
                return res.status(401).json({ message: "User does not exist." })
            }
            // console.log(password, result[0].password)
            const match = await bcrypt.compare(password, result[0].password)
            if(!match) {
                return res.status(401).json({ message: "Invalid Password." })
            }

            const access_token = jwt.sign(
                {
                    "UserInfo": {
                        "email": result.email,
                        "mobile_no": result.mobile_no
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            )

            const refresh_token = jwt.sign(
                { "email": result.email },
                process.env.REFRESH_TOKEN_SECRET
            )
            res.cookie('jwt', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 12 * 30 * 24 * 60 * 60 * 1000
            })

            return res.json({ access_token })
            // return res.status(200).json({ message: result[0]})
        }
    });
    // console.log(foundUser)
}

const refresh = (req, res) => {

}

const logout = (req, res) => {

}

export default {
    login,
    refresh,
    logout
}