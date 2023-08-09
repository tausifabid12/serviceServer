import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require('neo4j-driver');
import {typeDefs} from './schema/type_defs.js';



import dotenv from 'dotenv';
dotenv.config();
const port = parseInt(process.env.PORT) || 4000;


// DB connection 
const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

console.log("DB connected", driver);

//exporting session
export const session = driver.session({ database: 'neo4j' })
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });


// Starting server
neoSchema.getSchema().then( async (schema) => {
  const server = new ApolloServer({
      schema,
  });
  const { url } = await startStandaloneServer(server, { listen: { port: port } });
  console.log(`🚀 Server listening at: ${url}`);

})









