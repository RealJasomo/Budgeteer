import { IResolvers } from "graphql-tools";

import * as dotenv from 'dotenv';
import * as bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';
import * as jwt from 'jsonwebtoken';

import { Connection } from "typeorm";
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";

dotenv.config();

const setTokens = (res: any, userId: string) =>{
    const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET as string);
    res.cookie("token", token);
}

export const resolvers: IResolvers = {
    Query: {
        currentUser: async (_, __, { req }) => {
            console.log("req:",req.user);
            if(req.user){
                const user: User | undefined = await User.findOne(req.user);
                console.log(user);
                return user;
            }
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
            console.log(user);
            setTokens(res, user._id);
            return true;
        },
        login: async (_, {email, password}, { res }) => {
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
        },
       createProfile: async (_, {userId, firstName, lastName, dateOfBirth}, { req }) => {
            const user: User | undefined = await User.findOne(userId);
            const userRepository = (req.connection as Connection).getMongoRepository(User);
            if(user){
                const profile: Profile = await Profile.create({
                    firstName,
                    lastName,
                    dateOfBirth
                }).save();
                await userRepository.update(user, { profile });
                return profile;
            }
            return null;
       }
    }
}

