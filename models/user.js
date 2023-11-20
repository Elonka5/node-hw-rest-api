const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers")

const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        match:emailRegexp,
         required: [true, 'Email is required'],
         unique: true,
    },
    password: {
         type: String,
         minlength: 6,
         required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: subscriptions,
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    },
    avatarURL: {
        type:String,  
    },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {versionKey:false, timestamps:true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
     subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    emailSchema,
    subscriptionSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}