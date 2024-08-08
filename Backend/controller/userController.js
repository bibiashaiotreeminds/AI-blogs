const asyncHandler = require('express-async-handler')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {pool} = require('../config/db');

const registerUser=asyncHandler (async (req, res)=>{
    const {username, email, password}= req.body;
    if(!username || !email || !password){
       res.status(400)
       throw new Error('Please include all fields')
    }

    //find if use already exist
    const userExists= await pool.query("SELECT * FROM \"user\" WHERE email=$1",[email])
    if(userExists.rows.length > 0){
        res.status(400)
        throw new Error('User already exists')
     }
     
     const salt= await bcrypt.genSalt(10)
     const hashedPassword= await bcrypt.hash(password, salt)

     //create user
     const result = await pool.query(
        "INSERT INTO \"user\" (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
    );

     if(result){
        res.status(201).json(result.rows[0])
     }else{
        res.status(400)
        throw new Error('Invalid user data')
     }
    res.send('Register Route')
})

const loginUser= asyncHandler (async (req, res)=>{
    const { email, password}= req.body;
    
    //check email and password match
    const result = await pool.query("SELECT * FROM \"user\" WHERE email=$1",[email])
    const user = result.rows[0]
    const token=jwt.sign({userId:user.id}, 'aisha',{
        expiresIn:'1h'
    })
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json(
           { id:user.id,
            username:user.username,
            email:user.email})
     }else{
        res.status(401)
        throw new Error('Invalid credentials')
     }

})

module.exports={
    registerUser,
    loginUser,
  
}