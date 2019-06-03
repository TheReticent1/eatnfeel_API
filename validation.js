//User validation
const Joi = require("@hapi/joi");

//Signup validation

const signupValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

//Signin validation
const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const mobileValidation = data => {
  const schema = {
    userId: Joi.string()
      .required(),
    mobile: Joi.string()
      .min(10)
      .max(10)
      .required()
  };
  return Joi.validate(data, schema);
};

const addressValidation = data => {
  const schema = {
    userId: Joi.string()
      .required(),
    addressArea: Joi.string()
      .min(6)
      .required(),
    completeAddress: Joi.string()
      .min(15)
      .required(),
    addressType: Joi.string()
      .min(4)
      .required()
  };
  return Joi.validate(data, schema);
};

const adminValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    authKey: Joi.string()
    .required()
  };
  return Joi.validate(data, schema);
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.mobileValidation = mobileValidation;
module.exports.addressValidation = addressValidation;
module.exports.adminValidation = adminValidation;