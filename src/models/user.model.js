

import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new Schema(
   
   {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        // default: "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1633660004/avatars/avataaars",
        required: true,
   },
   coverImage: {
       type: String,
       required: true
    },
    watchHistory:[ {
        type: Schema.Types.ObjectId,
        ref: "Video",
    }],
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    refreshToken: {
        type: String,
    },


   },{timestamps: true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generarteAccessToken = function(){
    return jwt.sign(
        {id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
);
};
userSchema.methods.generarteRefreshToken = function(){
return jwt.sign(
    {
        id: this._id,
        // username: this.username,
        // email: this.email,
        // fullname: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
);
};


export const User = mongoose.model('User', userSchema);