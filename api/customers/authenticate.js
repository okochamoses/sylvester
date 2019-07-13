const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const customerRepo = require("./repository");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  "customer",
  new JwtStrategy(opts, async (JwtPayload, done) => {
    const { id } = JwtPayload;
    const customer = await customerRepo.findById(id);

    if (customer) {
      const payload = {
        id: customer.id,
        username: customer.username
      };
      return done(null, payload);
    }
    return done(null, false);
  })
);

module.exports = passport;
