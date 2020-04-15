var express = require("express");
var router = express.Router();

const userHelper = require("../helper/user-helper");
const authMiddleware = require("../middleware/authorization");

router.get("/user", authMiddleware, function (req, res, next) {
  const cookie = req.cookies;
  const user = userHelper.getUser(cookie["username"]);
  res.send(JSON.stringify({ email: user["email"] }));
});

router.post("/auth", function (req, res, next) {
  const cred = req.body;
  if (!cred.username || !cred.password) {
    return res.status(400).send({ status: "not ok" });
  }
  const isValid = userHelper.isValidUser(cred.username, cred.password);
  if (isValid) {
    const authToken = userHelper.generateAuthToken(cred);
    res.cookie("username", cred.username, { maxAge: 10000 });
    res.cookie("auth_token", authToken, { httpOnly: true, maxAge: 10000 });
  }
  res.status(200).send(
    JSON.stringify({
      status: isValid ? "ok" : "invalid",
    })
  );
});

router.get("/posts", authMiddleware, function (req, res, next) {
  const posts = userHelper.getPosts();
  res.status(200);
  res.send(posts);
});

router.post("/new-post", authMiddleware, function (req, res, next) {
  const newPost = req.body;
  if (!newPost.header || !newPost.body || !newPost.author) {
    return res.status(400).send({ status: "not ok" });
  }
  userHelper.addPost(newPost);
  res.status(200).send(
    JSON.stringify({
      status: "ok",
    })
  );
});

module.exports = router;
