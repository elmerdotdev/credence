const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

//dbに格納するときのschema構造をここで定義している
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    },
    lastLoggedIn: {
        type: Date
    }
    // states: {
    //   type: String,
    //   enum: ['Pending', 'Active'],
    //   default: 'Pending'
    // },
    // confirmationCode: {
    //   type: String,
    //   unique: true 
    // },
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role"
    //   }
    // ]


}, {
    timestamps: true
})

//static signup method
//Emailは既にDBの中にある重複しているものは登録できないようにmodelの中にuniqueをsetしている。
//.this = User   /.thisを使うときには＝＞は使えないのでasync の後にfunctionを追加する。
userSchema.statics.signup = async function (firstname, lastname, email, password) {
  
  //validation of email
  if(!firstname || !lastname || !email || !password) {
    throw Error('All fields must be filled')
  }
  if(!validator.isEmail(email)) {
    throw Error ('Email is not valid')
  }
  
  
    const exists = await this.findOne({email})

  if(exists) {
    throw Error ('This Email is already in use')
  }
  //saltをset   bycriptでセキュリティーを安全にする
  //salt　pwがhashされる前にuniqueなNumberをpwにgenerateしてくれる
  //そうすることでもし同じPWがハッキングされてもsalt NBRのおかげで両方PWがハッキングされるのを防げる
  //1,salt setting 2.hash setting(pw user input, salt numbers) 3.emailとhash化されたPWをuserとして入れる
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ firstname, lastname, email, password: hash})

  return user

}

//static login method
userSchema.statics.login = async function (email, password){
    
    if(!email || !password){
        throw Error('Please enter correct Email and password')
    }

    const user = await this.findOne({email})
    //login時に入力したEmialとDBのEmial比べる
  if(!user) {
    throw Error ('Please enter collect Email address')
  }
  //userが入力したPWどhashのPwを比べる
  //bcrypt.compare(そのままのPW, hash password)
  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error('Please enter collect password')
  }
  
  //PwとEmailが両方matchしたらuserをreturnする！
  return user
}





//db内のUserモデルをここで定義したUSERSCHEMAで入れてね！mongooseはここで定義しないとDBにdataを入れさせてくれないので必ず構造を定義する
module.exports = mongoose.model('User', userSchema)

//passwordについてーそのままの形式でdbにstoreするとセキュリティー上の問題があるので、違う形でStoreしなければならない
//unreadable hashed pw出なければいけない。dbに入れる前にhash処理をする。
//loginのときも同じ。Login時にはhashed pwと入力したものがMachするか確認しないといけない


















/////ORIGINAL CODE /////////

// const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const userSchema = new Schema({
//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     photo: {
//         type: String
//     },
//     lastLoggedIn: {
//         type: Date
//     }
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('User', userSchema)