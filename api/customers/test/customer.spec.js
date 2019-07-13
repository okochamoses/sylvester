const { assert } = require("chai");
const Customer = require("../Customer");
const validate = require("../validation");
const { hash, comparePassword, generatePassword } = require("../helper");

describe("User signup", () => {
  let customer;
  before(() => {
    customer = new Customer({
      firstName: "Moses",
      lastName: "Okocha",
      username: "moses",
      email: "moses@gmail.com",
      password: "Password1",
      phoneNumber: "08012341234"
    });
  });

  describe("Validate a users details", () => {
    it("should validate a cutomers details for onboarding", () => {
      const validated = validate(customer);
      assert(validated.isEmpty, JSON.stringify(validated.errors));
    });
  });

  describe("password functions", () => {
    let hashedPassword;
    before(() => {
      hashedPassword = hash(customer.password);
    });
    it("should hash a password with a given salt", () => {
      assert.equal(
        hash(customer.password, "$2b$10$o.vHuv/mNvNfCNhNApytwe"),
        "$2b$10$o.vHuv/mNvNfCNhNApytwemdW.aI526JCQ2omlywn5gh2xZ2bCWdK"
      );
    });
    it("should hash a password when passed a string", () => {
      assert(hashedPassword.startsWith("$2b"));
    });
    it("should establish a password is same as hash", () => {
      assert(comparePassword(customer.password, hashedPassword));
    });

    it("should generate an alphanumeric password", () => {
      const regex = RegExp(/^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,}\S$/, "g");

      assert(regex.test(generatePassword()), "Password validation failed");
    });
  });
});
