const fs = require('fs').promises;
const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {authorize, listLabels, CREDENTIALS_PATH} = require('./gmailAuthModule/gmail');
const { use } = require('../routes/user');

// const { OAuth2Client } = require('google-auth-library')

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findOne({ _id: id})

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
        lastLoggedIn: user.lastLoggedIn
    })
}

//Find login user (Login)
const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(404).json({error: 'Input both Email and password'})
    }
    
    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).json({error:'Email is invalid'})
    }
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(404).json({error: 'Password is invalid'})
    } else {
            res.status(200).json({
                _id: user._id,
            })
    }
}

// Create new user (Signup)
const createUser = async (req, res) => {
    const { firstname, lastname, email, password, photo, lastLoggedIn } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const userEmail = await User.findOne({email})
    if(userEmail) {
        return res.status(404).json({error:'This Email is already registered.'})
    }
    const user = await User.create({ firstname, lastname, email, password:hash, photo, lastLoggedIn })
   
    //if you success signup, status:200 store in local storage and move to next page!
    if(user) {
        res.status(200).json({ status:200 })
    } else if(!user) {
        res.status(400).json({ error: error.message })    
    }
}

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}



//Google login user (Login)
const googleLogin = async (req, res) => {
   //これは多分server.jsに入れないといけないから確認すること
    // const user = new OAuth2Client(process.env.GOOGLE_LOGIN_ID)

    // const { token } = req.bodyconst 
    // const ticket = await user.verifyIdToken({
    //     idToken: token,
    //     audience: process.env.CLIENT_ID
    // })
    // const {name, email, picture } = ticket.getPayload()
    
    
}

const gmailAuth = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const client = await authorize().catch(console.error);
    // await listLabels(client)
    console.log(client)
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = 
    {
        gmailAuth: {
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
          }
    }
    const user = await User.findOneAndUpdate({_id: id}, payload)
    console.log('gmailAuthupdated')

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json({
        _id: user._id,
        gmailAuth: user.gmailAuth
    })
}

module.exports = {
    // getUsers,
    getUser,
    loginUser,
    googleLogin,
    createUser,
    // deleteUser,
    gmailAuth,
    updateUser
}









//MEMO ========
//200 ok/ 201 create success/400 bad request error/ 403 forbitten/ 404 not found

// このuserを使ってdataを入れたり出したり色々操作する
// const User = require('../models/userModel')

// payloadのためにIDをPassする
// jwt.sign({_id}, '')ふたつ目のparametersecret tokenをpassingするけど、codeをGithubにあげるとバレてしまうので、env内のコードを入れる

// user stay login for 3days'3d' then states will be expired
// const createToken = (_id) => {
//     return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})
// }
    
//1,salt setting 2.hash setting(pw user input, salt numbers) 3.emailとhash化されたPWをuserとして入れる
//const salt = await bcrypt.genSalt(10)
//const hash = await bcrypt.hash(password, salt)
    
//tokenはencodepayload, encodeheader, encodesignitureを　一つでまとめている
//         res.states(200).json({email, token})

// //signup user ここでDBを作る
// //もしstatesがPenidingだったらError, ActiveだったらDBを作って入れる
// // if(User.states === "Pending") {
// //     res.states(401).send ({
// //      message: "Please verify your Email",
// //     })
// //  } else if(User.states === "Active") {
// //      signupUser()
// //  }

// //controlloer setup, model setup, route setup はUserのdataのためにsettingされた。







