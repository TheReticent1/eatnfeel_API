const {
  addOrder,
  getOrder,
  getUserOrder,
  orderById,
  acceptOrder,
  cancleOrder } = require("../controllers/order");
const userAuth = require("../auth/userAuth");
const authCheck = require("../auth/checkAuth");
const { addOrderValidator, acceptOrderValidator, cancleOrderValidator } = require("../validator/validation");
const express = require("express");

const router = express.Router();

router.post("/order/add", userAuth, addOrderValidator, addOrder);
router.get("/orders", authCheck, getOrder);
router.get("/orders/:userId", userAuth, getUserOrder);
router.put("/order/:orderId", authCheck, acceptOrderValidator, acceptOrder);
router.put("/order/cancle/:orderId", userAuth,cancleOrderValidator,cancleOrder);

router.param("orderId", orderById);
module.exports = router;
