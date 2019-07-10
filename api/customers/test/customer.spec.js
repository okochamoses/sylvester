const { assert } = require("chai");
const Customer = require("../Customer");
const validate = require("../customerValidation");
const { hash, comparePassword } = require("../helper");

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
    it("should have valid names", () => {
      assert(validate.name(customer.firstName), "First Name validation failed");
      assert(validate.name(customer.lastName), "Last Name validation failed");
    });
    it("should have a valid username", () => {
      assert(validate.username(customer.username), "Username validation failed");
    });
    it("should have a valid email", () => {
      assert(validate.email(customer.email), "Email not valid");
    });
    it("should have an alphanumeric password with length between 6 and 32", () => {
      assert(validate.password(customer.password), "Password does not adhere to password policy");
    });
    it("should have a valid nigerian or south-african phone number", () => {
      assert(validate.phoneNumber(customer.phoneNumber), "Phone number is invalid");
    });
  });

  describe("password hashing functions", () => {
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
  });
});
