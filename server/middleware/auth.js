// Purpose is Clarification before actions e.g Liking or Deleting
import jwt from 'jsonwebtoken';

const auth = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];

        //if token greater than 500 that is Google's
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;