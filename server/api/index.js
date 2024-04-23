const router = require("express").Router();

router.use("/users", require("./auth/users"));
router.use("/posts", require("./auth/posts"));
const express = require('express');
const app = express();


app.listen(0, () => console.log('Application is running'));

module.exports = router;
