const db = require("./db");
const posts = require("./db-posts");

const isValidUser = function (username, password) {
  const user = db.filter((user) => {
    if (user.username === username && user.password === password) {
      return true;
    } else {
      return false;
    }
  });
  return user.length ? true : false;
};

const getUser = function (username) {
  return db.filter((user) => user.username === username)[0];
};

const validToken = function (username, authToken) {
  const user = db.filter(
    (user) => user.username == username && user.auth_token == authToken
  );
  return user.length === 1 ? true : false;
};

const getPosts = function () {
  return posts;
};

const addPost = function (newPost) {
  posts.unshift(newPost);
};

const generateAuthToken = function (user) {
  // TODO
  const hash = user.username + "123";
  db.forEach((dbuser) => {
    if (dbuser.username === user.username) {
      dbuser.auth_token = hash;
    }
  });
  return hash;
};

module.exports = {
  isValidUser,
  getPosts,
  addPost,
  generateAuthToken,
  getUser,
  validToken,
};
