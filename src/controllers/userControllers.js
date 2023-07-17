import bcrypt from 'bcryptjs'
import database from '../middlewere/dbConnection';

const getAllUsers = async(req, res) => {
    const dbQuery = 'SELECT * FROM `user` WHERE 1'
     await database.query(dbQuery, (err, result) => {
        if(result) {
            console.log(result)
            return res.status(200).json({message: result })
        }
         else{
            return res.status(400).json({ message: "Unable to fetch data from backend.", error: err })
        }
    })
}

const createNewUsers = async (req, res) => {
    const {email, password, firstName, lastName, city, state, zip, mobile_no, address, country} = req.body

    database.query(`SELECT * FROM user WHERE email='${email}'`, async(err, result) => {
        if(result.length) {
            return res.status(409).json({ message: "User already exist."})
        }
        // hash the password
        const hashed_pwd = await bcrypt.hash(password, 10);
    
    
        const dbQuery = `INSERT INTO user(email, password, firstName, lastName, city, state, zip, mobile_no, address, country) VALUES ('${email}','${hashed_pwd}','${firstName}','${lastName}','${city}','${state}','${zip}','${mobile_no}','${address}','${country}')`
        await database.query(dbQuery, (err, result) => {
            if (err) {
                return res.status(400).json({message: "Unable to create user.", err})
            }
            else {
                return res.status(200).json({message: `New User ${email} created successfully.`})
            }
        })
    })
    // console.log(check_already_exist);
}

const updateUsers = async (req, res) => {
    return await res.status(200).json({message: "routing is proper and OP!"})
}

const deleteUsers = async (req, res) => {
    return await res.status(200).json({message: "routing is proper and OP!"})
}

export default {
    getAllUsers, 
    createNewUsers, 
    updateUsers, 
    deleteUsers
}