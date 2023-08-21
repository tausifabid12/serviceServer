import jwt from "jsonwebtoken";
const createJwt = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.ACCESS_TOKEN, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });
};
export default createJwt;
