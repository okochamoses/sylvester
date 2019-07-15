const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const vendorRepo = require("./repository");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  "vendor",
  new JwtStrategy(opts, async (JwtPayload, done) => {
    const { id } = JwtPayload;
    const vendor = await vendorRepo.findById(id);

    if (vendor) {
      const payload = {
        id: vendor.id,
        username: vendor.username
      };
      return done(null, payload);
    }
    return done(null, false);
  })
);

module.exports = passport;
