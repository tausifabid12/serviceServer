import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require('neo4j-driver');
import {typeDefs} from './schema/type_defs.js';
import express from 'express';
import cors from 'cors';
import jwtPackage from '@neo4j/graphql-plugin-auth';
const { Neo4jGraphQLAuthJWTPlugin } = jwtPackage;

const { OGM } = require("@neo4j/graphql-ogm");

const app = express();
// Apply CORS middleware
app.use(cors());

// custom middleware
const authorizationMiddleware = async (requestContext) => {
    const { operation, document } = requestContext;
    const operationType = operation.operation;
  
    // Extract the requested node from the operation's selection set
    const { selections } = document.definitions[0].selectionSet;
    const requestedNode = selections[0].name.value; // Assuming it's the first field
  
    // Implement your authorization logic here
    const user = requestContext.context.currentUser; // Assuming you set the user in context during authentication
  
    // You need to modify this logic based on your permission structure
    if (!user.hasPermissionForNode(requestedNode, operationType)) {
      throw new Error("Unauthorized access");
    }
  };



import dotenv from 'dotenv';
import createJwt from "./utls/createJwt.js";
dotenv.config();
const port = parseInt(process.env.PORT) || 4000;


// DB connection  config
const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// ogm set up

const ogm = new OGM({ typeDefs, driver });
const User = ogm.model("User");

// custom resolvers
const resolvers = {
  Mutation: {
      signUp: async (_source, {  email, name }) => {
          const [existing] = await User.find({
              where: {
                  email,
              },
          });

          if (existing) {
              throw new Error(`User with username ${email} already exists!`);
          }

          const { users } = await User.create({
              input: [
                  {
                       email,
                       name
                  }
              ]
          });

          return createJwt({ sub: users[0].id });
      },
      signIn: async (_source, { email}) => {
          const [user] = await User.find({
              where: {
                email,
              },
          });

          if (!user) {
              throw new Error(`User with username ${email} not found!`);
          }


          return createJwt({ sub: user.id });
      },
  },
};




//exporting session
export const session = driver.session({ database: 'neo4j' })
const neoSchema = new Neo4jGraphQL({ 
    typeDefs,
    resolvers,
     driver,    
  plugins: {
  auth: new Neo4jGraphQLAuthJWTPlugin({
      secret: process.env.ACCESS_TOKEN
  })
} 


});



Promise.all([neoSchema.getSchema(), ogm.init()]).then(([schema]) => {
  const server = new ApolloServer({
      schema,
  });


  startStandaloneServer(server, 
    {
      listen: { port: port }
  }).then(({ url }) =>  {
      console.log(`🚀 Server ready at ${url}`);
  });
});





// extend type User @auth(rules: [
//   { 
//     operations: [CREATE],
//     isAuthenticated: true,  
//   }
// ])


