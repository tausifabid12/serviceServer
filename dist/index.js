import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require('neo4j-driver');
import { typeDefs } from './schema/type_defs.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createJwt from "./utls/createJwt.js";
import decodeJWT from "./utls/decodeJWT.js";
const port = parseInt(process.env.PORT) || 4000;
import jwtPackage from '@neo4j/graphql-plugin-auth';
const { Neo4jGraphQLAuthJWTPlugin } = jwtPackage;
const { OGM } = require("@neo4j/graphql-ogm");
// initialize express
const app = express();
// Apply  middleware
app.use(cors());
dotenv.config();
// DB connection  config
const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
// ogm set up
const ogm = new OGM({ typeDefs, driver });
const User = ogm.model("User");
const Role = ogm.model("Role");
// custom resolvers
const resolvers = {
    Mutation: {
        signUp: async (_source, { email, name, user_type }) => {
            const [user] = await User.find({
                where: {
                    email,
                },
            });
            if (user) {
                throw new Error(`User with username ${email} already exists!`);
            }
            const { users } = await User.create({
                input: [
                    {
                        name,
                        email,
                        user_type,
                        createdAt: new Date().toISOString(),
                    }
                ]
            });
            return createJwt({ sub: users[0].id });
        },
        signIn: async (_source, { email }) => {
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
// authorization middleware
const authorizationMiddleware = async (requestContext) => {
    try {
        // Extract the requested node from the operation's selection set 
        const { operation, document } = requestContext;
        const operationType = operation.operation;
        const { selections } = document.definitions[0].selectionSet;
        const requestedNode = selections[0].name.value;
        // Get the user from context
        const userId = requestContext.contextValue?.currentUser;
        const [user] = await User.find({
            where: {
                id: userId,
            },
        });
        const [role] = await Role.find({
            where: {
                userHas: {
                    id: userId
                }
            },
        });
        const userType = user?.user_type;
        const permissions = role?.permissions;
        // restricting lab assistant to access employees and moduleTickets approval
        if (userType === 'LAB_ASSISTANT') {
            if (requestedNode === 'employees') {
                return false; // Authorization failed
            }
        }
        if (userType === 'COVENTEN_EMPLOYEE') {
            const lowerCasePermissions = permissions.map(item => item.toLowerCase());
            // filter permission according to nodes 
            const replacePermission = (permissionsArray, oldItem, newItem) => {
                const index = permissionsArray.findIndex(item => item === oldItem);
                permissionsArray[index] = newItem;
            };
            // update permission according to nodes
            if (lowerCasePermissions.includes('internal email')) {
                replacePermission(lowerCasePermissions, 'internal email', "communicationTickets");
            }
            if (lowerCasePermissions.includes('estimation') || lowerCasePermissions.includes('estimation complains')) {
                replacePermission(lowerCasePermissions, 'estimation', "invoices");
                replacePermission(lowerCasePermissions, 'estimation complains', "invoices");
            }
            if (lowerCasePermissions.includes('all tickets') || lowerCasePermissions.includes('assignments') || lowerCasePermissions.includes('ongoing chats')) {
                replacePermission(lowerCasePermissions, 'all tickets', "moduleTickets");
                replacePermission(lowerCasePermissions, 'assignments', "moduleTickets");
                replacePermission(lowerCasePermissions, 'ongoing chats', "moduleTickets");
            }
            if (lowerCasePermissions.includes('support')) {
                replacePermission(lowerCasePermissions, 'support', "supportTickets");
            }
            // throwing error if permission doesn't exists
            if (!lowerCasePermissions.includes(requestedNode)) {
                // throw new GraphQLError('You are not authorized to perform this action.', {
                //   extensions: {
                //     code: 'FORBIDDEN',
                //   },
                // });
                return false; // Authorization failed
            }
            else {
                return true; // Authorization succeeded
            }
        }
    }
    catch (error) {
        return error;
    }
};
const createContext = async ({ req }) => {
    //  Get the JWT token from the request headers
    const token = req.headers.authorization;
    if (token) {
        // Verify and decode the token to get user information
        const splitToken = token.split(' ')[1];
        const decodedToken = decodeJWT(splitToken);
        const currentUser = decodedToken?.sub;
        return {
            currentUser,
        };
    }
    return {}; // Default context if no token
};
//exporting session
export const session = driver.session({ database: 'neo4j' });
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
        plugins: [
            {
                async requestDidStart(requestContext) {
                    return {
                        async willSendResponse(requestContext) {
                            // const result = await authorizationMiddleware(requestContext)
                            // console.log(requestContext.response, "resoponse")
                            // requestContext.response.body = null
                        },
                    };
                },
            },
        ],
    });
    startStandaloneServer(server, {
        context: createContext,
        listen: { port: port }
    }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
});
