const router = require("express").Router();
const appController = require("../Controller/appController.js");

router.post("/user/signup", appController.signup);
router.post("/user/getbil", appController.getbill);

module.exports = router;
