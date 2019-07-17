const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const adminRepo = require("./repository");
const { JWT_SECRET_ADMIN } = require("../../config/keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET_ADMIN;

passport.use(
  "admin",
  new JwtStrategy(opts, async (JwtPayload, done) => {
    const { id } = JwtPayload;
    const admin = await adminRepo.findById(id);

    if (admin) {
      const payload = {
        id: admin.id,
        username: admin.username
      };
      return done(null, payload);
    }
    return done(null, false);
  })
);

module.exports = passport;
