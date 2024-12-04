const express = require("express");
const { getUser, postUser, putUser, deleteUser,signIn} = require("./user.controller");
const router = express.Router();

router.get("/", getUser);
router.put("/update/:id", putUser); // Expecting ID as a parameter
router.delete("/delete/:id", deleteUser);
router.post("/signup", postUser);
router.post("/signin",signIn); 



module.exports = router; // Correctly export the router
