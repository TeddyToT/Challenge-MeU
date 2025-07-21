const { body } = require("express-validator");
const MIN_PASSWORD_LENGTH = 6;

exports.createUserDTO = [
  body("name").optional().isString(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("passoword is required")
    .trim()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    ),
  body("phone")
    .escape()
    .optional()
    .isLength({min: 10, max:11})
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
    .withMessage("Invalid Vietnamese phone number"),
];

exports.accessDTO = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("passoword is required")
    .isString({ min: 6 })
    .trim()
    .withMessage("Password must have more than 6 characters"),
];
