import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions,  } from "passport-jwt";
import User from "../models/User";
import { PassportStatic } from "passport";
import { IUser } from "../interfaces/Interface";


const opts = {} as StrategyOptions;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY!;

export default (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload: IUser, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if(user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
               console.log(error); 
            }
        })
    );
}