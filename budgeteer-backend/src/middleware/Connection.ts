import { Connection } from "typeorm";

export const connectionMiddleware = (connection: Connection) => async (req, _, next) => {
    req.connection = connection;
    next();
}