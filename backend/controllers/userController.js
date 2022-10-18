//このuserを使ってdataを入れたり出したり色々操作する
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { create } = require('../models/userModel')

//signupUser とloginUser  で　functionを使えるようにする
//payloadのためにIDをPassする
//jwt.sign({_id}, '')ふたつ目のparametersecret tokenをpassingするけど、codeをGithubにあげるとバレてしまうので、env内のコードを入れる
//user can login for 3days'3d' then will expired
const createToken = (user_id) => {
    return jwt.sign({user_id}, process.env.SECRET,{expiresIn: '3d'})
}


//login user
const loginUser = async (req, res) => {
    
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user.user_id)


        //tokenはencodepayload, encodeheader, encodesignitureを　一つでまとめている
        res.states(200).json({email, token})
    } catch (error) {
        res.states(400).json({error:error.message})
    }
}

//signup user ここでDBを作る
//もしstatesがPenidingだったらError, ActiveだったらDBを作って入れる
// if(User.states === "Pending") {
//     res.states(401).send ({
//      message: "Please verify your Email",
//     })
//  } else if(User.states === "Active") {
//      signupUser()
//  }
 
 
 

const signupUser = async (req, res) => {
    const { firstname, lastname, email, password} = req.body

    try {
        const user = await User.signup(firstname, lastname, email, password)

        //create a token
        const token = createToken(user.user_id)


        //tokenはencodepayload, encodeheader, encodesignitureを　一つでまとめている
        res.states(200).json({email, token})
    } catch (error) {
        res.states(400).json({error:error.message})
    }
    
}

module.exports = { loginUser, signupUser }


//controlloer setup, model setup, route setup はUserのdataのためにsettingされた。







////////ORIGINAL CODE /////////////

// const User = require('../models/userModel')
// const mongoose = require('mongoose')

// // Get a single user
// const getUser = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such user' })
//     }

//     const user = await User.findById(id)

//     if (!user) {
//         return res.status(404).json({ error: 'No such user' })
//     }

//     res.status(200).json({
//         _id: user._id,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         email: user.email,
//         photo: user.photo,
//         lastLoggedIn: user.lastLoggedIn
//     })
// }

// // Create new user
// const createUser = async (req, res) => {
//     const { firstname, lastname, email, password, photo, lastLoggedIn } = req.body

//     try {
//         const user = await User.create({ firstname, lastname, email, password, photo, lastLoggedIn })
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// // Update a user
// const updateUser = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such user' })
//     }

//     const user = await User.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if (!user) {
//         return res.status(400).json({ error: 'No such user' })
//     }

//     res.status(200).json(user)
// }

// module.exports = {
//     // getUsers,
//     getUser,
//     createUser,
//     // deleteUser,
//     updateUser
// }