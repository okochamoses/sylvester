const { assert } = require("chai");
const Customer = require("../Customer");
const validate = require("../customerValidation");

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

  describe("should validate a users details", () => {
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
});
