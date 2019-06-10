const { addTable, getTable, bookTable, tableById,deleteTable,resetTable } = require("../controllers/table");
const authCheck = require("../auth/checkAuth");
const authUser = require("../auth/userAuth");
const { addTableValidator, bookTableValidator } = require("../validator/validation");
const express = require("express");

const router = express.Router();

router.post("/table/add", authCheck, addTableValidator, addTable);
router.get("/tables", getTable);
router.put("/table/:tableId",authUser,bookTableValidator,bookTable);
router.put("/super/table/:tableId",authCheck,bookTableValidator,bookTable);
router.put("/super/reset/table/:tableId",authCheck,resetTable);
router.delete("/super/table/:tableId",authCheck,deleteTable);

router.param("tableId",tableById)
module.exports = router;