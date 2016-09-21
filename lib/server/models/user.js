import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Strategy} from 'passport-local';

const userSchema = new mongoose.Schema({
    /*
    * 电话号码
    */
    phone: {
        type: String,
        required: true,
        unique: true
    },
    /*
    * 密码
    */
    password: {
        type: String
    },
    /*
    * 找回密码邮箱
    */
    email: {
        type: String,
        trim: true,
        required: true
    },
    /*
    * 注册时间
    */
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'phone'});
const UserModel = mongoose.model('User', userSchema);

passport.use(new Strategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export default UserModel;
