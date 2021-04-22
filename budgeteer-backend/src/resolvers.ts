import { IResolvers } from "graphql-tools";

import * as dotenv from 'dotenv';
import * as bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';
import * as jwt from 'jsonwebtoken';

import { User } from "./entity/User";

dotenv.config();

const setTokens = (res: any, userId: string) =>{
    const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET as string);
    res.cookie("token", token);
}
export const resolvers: IResolvers = {
    Query: {
        currentUser: (_, __, { req }) => {
            return null;
        }
    },
    Mutation: {
        register: async (_, {email, password}, { res }) => {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var isPasswordStrong = strongRegex.test(password);
            var isEmail = EmailValidator.validate(email);
            if(!(isPasswordStrong || isEmail)){
                return false;
            }
            var doesExist: User | undefined = await User.findOne({ email });
            if(doesExist){
                return false;
            }
            const hashedPassword = await bcrypt.hash(password, 14);
            var user: User = await User.create({
                email,
                password: hashedPassword
            }).save();
            setTokens(res, user._id);
            return true;
        },
        login: async (_, {email, password}, { req, res }) => {
            const user: User | undefined = await User.findOne({ email });
            if(user){
                const valid: boolean = await bcrypt.compare(password, user.password);
                if(!valid){
                    return null;
                }
                setTokens(res, user._id);
                return user;
            }
            return null;
        }
    }
}

