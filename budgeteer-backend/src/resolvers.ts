import { IResolvers } from "graphql-tools";

export const resolvers: IResolvers = {
    Query: {
        currentUser: (_, __, { req }) => {
            return null;
        }
    },
    Mutation: {
        register: async (_, {email, password}) => {
            return false;
        }
    }
}