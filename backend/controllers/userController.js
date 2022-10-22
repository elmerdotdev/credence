const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await this.findById(id)

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

//Find login user
const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(404).json({error: 'no match email and password'})
    }
    
    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).json({error:'mo match email'})
    }
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(404).json({error: 'no match password'})
    } else {
        // return user
        const {email, password} = req.body
    
        try {
            const user = await User.login(email, password)

            //create a token
            const token = createToken(user._id)
            res.status(200).json({email, token})
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    }

    // const {email, password} = req.body
    
    // try {
    //     const user = await User.login(email, password)

    //     //create a token
    //     const token = createToken(user._id)
    //     res.states(200).json({email, token})
    // } catch (error) {
    //     res.states(404).json({error:error.message})
    // }
}

// Create new user
const createUser = async (req, res) => {
    const { firstname, lastname, email, password, photo, lastLoggedIn } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({ firstname, lastname, email, password:hash, photo, lastLoggedIn })
    if(user) {
        res.status(201).json({
            id: user._id
        })
    } else {
        res.status(400).json({ error: error.message })
    }
    // try {
    //     const user = await User.create({ firstname, lastname, email, password:hash, photo, lastLoggedIn })
    //     res.status(201).json({
    //         id: user._id
    //     })
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }
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

module.exports = {
    // getUsers,
    getUser,
    loginUser,
    createUser,
    // deleteUser,
    updateUser
}


















// //このuserを使ってdataを入れたり出したり色々操作する
// const User = require('../models/userModel')
// const jwt = require('jsonwebtoken')
// const { create } = require('../models/userModel')
// const bcrypt = require('bcrypt')
// const validator = require('validator')

// // //signupUserとloginUserでfunctionを使えるようにする
// // //payloadのためにIDをPassする
// // //jwt.sign({_id}, '')ふたつ目のparametersecret tokenをpassingするけど、codeをGithubにあげるとバレてしまうので、env内のコードを入れる
// // //user can login for 3days'3d' then will expired
// const createToken = (_id) => {
//     return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})
// }

// userSchema.statics.signup = async function (firstname, lastname, email, password) {
  
//     //validation of email
//     if(!firstname || !lastname || !email || !password) {
//       throw Error('All fields must be filled')
//     }
//     if(!validator.isEmail(email)) {
//       throw Error ('Email is not valid')
//     }
    
    
//       const exists = await this.findOne({email})
  
//     if(exists) {
//       throw Error ('This Email is already in use')
//     }
    
//     //1,salt setting 2.hash setting(pw user input, salt numbers) 3.emailとhash化されたPWをuserとして入れる
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)
  
//     const user = await this.create({ firstname, lastname, email, password: hash})
  
//     return user
//   }
  
  
//   //static login method
//   userSchema.statics.login = async function (email, password){
      
//       if(!email || !password){
//           throw Error('Please enter correct Email and password')
//       }
  
//       const user = await this.findOne({email})
     
//     if(!user) {
//       throw Error ('Please enter collect Email address')
//     }
  
//     const match = await bcrypt.compare(password, user.password)
  
//     if(!match){
//       throw Error('Please enter collect password')
//     }
    
   
//     return user
//   }
  
// //login user
// const loginUser = async (req, res) => {
    
//     const {email, password} = req.body
    
//     try {
//         const user = await User.login(email, password)

//         //create a token
//         const token = createToken(user._id)


//         //tokenはencodepayload, encodeheader, encodesignitureを　一つでまとめている
//         res.states(200).json({email, token})
//     } catch (error) {
//         res.states(404).json({error:error.message})
//     }
// }

// //signup user ここでDBを作る
// //もしstatesがPenidingだったらError, ActiveだったらDBを作って入れる
// // if(User.states === "Pending") {
// //     res.states(401).send ({
// //      message: "Please verify your Email",
// //     })
// //  } else if(User.states === "Active") {
// //      signupUser()
// //  }
 
 
// const signupUser = async (req, res) => {
//     const { firstname, lastname, email, password} = req.body

//     try {
//         const user = await User.signup(firstname, lastname, email, password)

//         //create a token
//         const token = createToken(user._id)


//         //tokenはencodepayload, encodeheader, encodesignitureを　一つでまとめている
//         res.states(200).json({email, token})
//     } catch (error) {
//         res.states(404).json({error:error.message})
//     }
    
// }

// module.exports = { loginUser, signupUser }


// //controlloer setup, model setup, route setup はUserのdataのためにsettingされた。







