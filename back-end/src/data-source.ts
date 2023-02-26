import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entity/user";
import Event from "./entity/event";
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lam050901',
    database: 'google_calendar',
    synchronize: false,
    logging: false,
    entities: [User, Event],
    migrations: ["dist/src/migrations/*.js"],
})

