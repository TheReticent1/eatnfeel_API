exports.signUpValidator = (req, res, next) => {
  //name
  req.check("name", "enter your full name").notEmpty();
  req.check("name", "lenght must be 5 or more").isLength({
    min: 5,
    max: 50
  });
  //email
  req.check("email", "enter your mail id").notEmpty();
  req.check("email", "please enter proper mail id").isEmail();
  //password
  req.check("password", "enter password").notEmpty();
  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
};

exports.signInValidator = (req, res, next) => {
  //email
  req.check("email", "enter your mail id").notEmpty();
  req.check("email", "please enter proper mail id").isEmail();
  //password
  req.check("password", "enter password").notEmpty();
  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
}

exports.addMobileValidator = (req, res, next) => {
  req.check("userId", "please enter user Id").notEmpty();
  req.check("mobile", "Please enter mobile no.").notEmpty();
  req.check("mobile", "Please enter 10 digit mobile number").isLength({
    min: 10,
    max: 10
  });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}

exports.userIdValidator = (req, res, next) => {
  req.check("userId", "Please enter userid to param").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}

exports.postAddressValidator = (req, res, next) => {
  req.check("userId", "Please enter user id").notEmpty();
  req.check("addressArea", "please enter address area").notEmpty();
  req.check("addressArea", "Address area length must be greater than 6").isLength({
    min: 6
  });
  req.check("completeAddress", "Please enter complete address").notEmpty();
  req.check("completeAddress", "Please enter complete address more than 15 letters").isLength({
    min: 15
  });
  req.check("addressType", "Please enter type of address").notEmpty();
  req.check("addressType", "Must be 4 letters eg. home or work").isLength({
    min: 4,
    max: 4
  });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}

exports.addAdminValidator = (req, res, next) => {
  //name
  req.check("name", "enter your full name").notEmpty();
  req.check("name", "lenght must be 5 or more").isLength({
    min: 5,
    max: 50
  });
  //email
  req.check("email", "enter your mail id").notEmpty();
  req.check("email", "please enter proper mail id").isEmail();
  //password
  req.check("password", "enter password").notEmpty();
  //authkey
  req.check("authKey", "please enter auth key").notEmpty();
  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
}

exports.addMenuValidator = (req, res, next) => {
  //name
  req.check("name", "write a name").notEmpty();
  req.check("name", "name must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150
  });
  //description
  req.check("description", "write a description").notEmpty();
  req.check("description", "description must be between 4 to 2000 charecters")
    .isLength({
      min: 4,
      max: 2000
    });
  //labels
  req.check("labels", "write a label").notEmpty();
  req.check("labels", "labels must be 4 characters or more").isLength({
    min: 4
  });
  //price
  req.check("price", "write a price").notEmpty();
  //foodType
  req.check("food_type", "write a food type").notEmpty();
  req.check("food_type", "food type must be 3 characters or more").isLength({
    min: 3
  });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
}

exports.updateValidator = (req, res, next) => {
  req.check("_id", "enter user id").notEmpty();
  this.signUpValidator(req,res,next);
}

exports.updateMenuValidator = (req, res, next) => {
  req.check("_id", "enter menu id").notEmpty();
  this.addMenuValidator(req,res,next);
}

exports.updateMobileValidator = (req, res,next) => {
  req.check("_id", "Please enter id").notEmpty();
  this.addMobileValidator(req,res,next);
}

exports.updateAddressValidator = (req, res,next) => {
  req.check("_id","Please enter id").notEmpty();
  this.postAddressValidator(req,res,next);
}

exports.updateAdminValidator=(req,res,next)=>{
  req.check("_id","Please enter id").notEmpty();
  req.check("newPassword","Please enter new password").notEmpty();
  this.addAdminValidator(req,res,next);
}