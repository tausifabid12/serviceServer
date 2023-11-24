import jwt from "jsonwebtoken";


const decodeJWT = (token): {sub: string, iat: number} => {
    let decodedToken;
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err);
        } else {
            decodedToken = decoded;

        }
      });

      return decodedToken;
    
}

export default decodeJWT;