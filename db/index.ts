import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/**
 * Simple configuration, see the docs
 * https://sequelize.org/docs/v6/getting-started/ 
 */
export async function getConnection(): Promise<Sequelize> {
    // 1. setup DB
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_UNAME,
        password: process.env.DB_PASS,
    })
  
    // 2. authenticate!
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to DB.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // 3. initialize models

    PersonalInformation.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        favorite_language: {
            type: DataTypes.STRING,
        },
        favorite_os: {
            type: DataTypes.STRING,
        }
      }, { sequelize });

    // 4. return
    return sequelize;
}

/** ------------ TABLES ------------ */

export class PersonalInformation extends Model {
    declare id: number;
    name!: string;
    favorite_language!:string;
    favorite_os!: string;
}