const CreateError = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
     try {
         const { authorization = "" } = req.headers;
         const [bearer, token] = authorization.split(" ");
         if (bearer !== "Bearer") {
             throw new CreateError(401, "Not authorized")
         }
         const { id } = jwt.verify(token, SECRET_KEY);
         const user = await User.findById(id);
         if (!user || !user.token) {
             throw new CreateError(401, 'Not authorized');
         }
         req.user = user;
         next()
     } catch (error) {
         next(error);
     }
}
 
module.exports = authenticate;