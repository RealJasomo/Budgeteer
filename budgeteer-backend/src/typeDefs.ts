import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type User{
        _id: String!
        id: ID!
        email: String!
        profile: Profile
    }

    type Profile{
        _id: String!
        id: ID!
        firstName: String!
        lastName: String!
        dateOfBirth: String!
    }
    
    type Query{
        currentUser: User
    }

    type Mutation {
        register(email: String!, password: String!): Boolean!
        login(email: String!, password: String!): User
        createProfile(userId: String!, firstName: String!, lastName: String!, dateOfBirth: String!): Profile
    }
`;