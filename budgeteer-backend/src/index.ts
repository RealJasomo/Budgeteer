import 'reflect-metadata';
import { createConnection } from 'typeorm'; 
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as express from 'express';
import { authMiddleware } from './middleware/Auth';
import { connectionMiddleware } from './middleware/Connection';

const startServer = async () => {
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true
    };
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res}: any) => ({req , res})
    });

    const connection = await createConnection();

    const app = express();
    
    //Express middleware
    app.use(cookieParser());
    app.use(morgan("common"));
    app.use(cors(corsOptions));
    app.use(authMiddleware);
    app.use(connectionMiddleware(connection));

    server.applyMiddleware({ app , cors: corsOptions});

    const port = process.env.PORT || 4000;

    app.listen(port, ()=>{
        console.log(`Server is listening on localhost:${port}${server.graphqlPath}`);
    });
}

startServer();
