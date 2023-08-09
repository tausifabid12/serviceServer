import jwt from 'jsonwebtoken';
const { sign } = jwt;
export const resolvers = {
    Mutation: {
        signUp: (parent, args) => {
            // send args to the database to save user
            const { email } = args?.signUpInput;
            const token = sign({ email }, process.env.ACCESS_TOKEN, {
                expiresIn: "1d",
            });
            console.log(token);
            return {
                token
            };
        },
        login: (parent, args) => {
            const { email } = args;
            // check if user is on the data base 
            //if exists
            const token = sign({ email }, process.env.ACCESS_TOKEN, {
                expiresIn: "1d",
            });
            console.log(token);
            return {
                token
            };
        }
    }
};
// Mutation: {
//   login: async (_, { email, password }) => {
//     // Authenticate the user and generate the access token
//     const user = await authenticateUser(email, password);
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
//     return {
//       user,
//       accessToken // Include the access token in the response
//     };
//   },
//   signup: async (_, { name, email, password }) => {
//     // Create a new user and generate the access token
//     const user = await createUser(name, email, password);
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
//     return {
//       user,
//       accessToken // Include the access token in the response
//     };
//   },
// }
