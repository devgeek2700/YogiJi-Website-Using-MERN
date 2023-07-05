const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');



const yoguserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true
  },

  Email: {
    type: String,
    required: true,
    unique: true
  },
  
  Phone: {
    type: Number,
    required: true,
    min: 10

  },

  DOB: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  Address: {
    type: String,
    required: true
  },

  Country: {
    type: String,
    required: true,
    enum: ['America', 'India', 'Japan', 'Nepal']
  },

  city: {
    type: String,
    required: true
  },

  region: {
    type: String,
    required: true
  },

  postcode: {
    type: Number,
    required: true
  },

  Password: {
    type: String,
    required: true,
    unique: true
  },

  Confirmassword: {
    type: String,
    required: true
  },

  tokens:[{
    token:{
      type: String,
      required: true
    }
  }]
})


// Token generate -----> cookies
yoguserSchema.methods.generateToken = async function(){
  try{

    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;

  }catch(error){
    console.log(error);
  }
}




 // Password Encryption
yoguserSchema.pre("save", async function(next){
  if(this.isModified("Password")){
    this.Password = await bcrypt.hash(this.Password , 10);
    this.Confirmassword = await bcrypt.hash(this.Confirmassword , 10);
    
    next();

  }
});


//collections

const Customeryog = new mongoose.model("Customeryog", yoguserSchema);

module.exports = Customeryog;