//import Passport from "passport";
import JwtPassport from "passport-jwt";

//Database Model
import { UserModel } from "../database/allModels";

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoAPP",
};

export default (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};

//Explanation
// const req={
//     heders:{
//         Authorization:"Bearer hhgtybmn,mbvgfs543ui7bncde436689hjbhgcrt46gbheuubh6hbnbftuFdzngfAtr"
//     }
// }
//Here the tokens in the websites are stored in this format is bearer space and the token but during validation the string bearer needs to be removed to do that we use the function .fromAuthHeaderAsBearerToken
//will be converted to
// const req={
//     heders:{
//         Authorization:"hhgtybmn,mbvgfs543ui7bncde436689hjbhgcrt46gbheuubh6hbnbftuFdzngfAtr"
//     }
// }
//jwt__payload contails the user's id
