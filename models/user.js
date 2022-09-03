const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const { handleSchemaValidationErrors } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    //   subscription: {
    //     type: String,
    //     enum: ["starter", "pro", "business"],
    //     default: "starter",
    //   },
    //   token: {
    //     type: String,
    //     default: null,
    //   },
    //   owner: {
    //     type: SchemaTypes.ObjectId,
    //     ref: "user",
    //   },
  },
  { versionKey: false }
);

userSchema.post("save", handleSchemaValidationErrors);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
