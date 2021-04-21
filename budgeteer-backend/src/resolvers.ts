import { IResolvers } from "graphql-tools";

import * as dotenv from 'dotenv';
import * as bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';
import * as jwt from 'jsonwebtoken';

import { User } from "./entity/User";

dotenv.config();

export const resolvers: IResolvers = {
    Query: {
        currentUser: (_, __, { req }) => {
            return null;
        }
    },
    Mutation: {
        register: async (_, {email, password}) => {
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
            return false;
        },
        login: async (_, {email, password}, { res }) => {
            const user: User | undefined = await User.findOne({ email });
            if(user){
                const valid: boolean = await bcrypt.compare(password, user.password);
                if(!valid){
                    return null;
                }
                const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET as string);
                res.cookie("token", token);
                return user;
            }
            return null;
        }
    }
}