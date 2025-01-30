const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT = process.env.JWT || "1234";

const { createUser, getUser } = require("../db/db");

const setToken = (id) => {
  return jwt.sign({ id }, JWT, { expiresIn: "5h" });
};

// Authorized Token
const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) return next();
  try {
    const { id } = jwt.verify(token, JWT);
    const user = await getUser(id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await createUser(username, password);
    const token = setToken(response.id);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
})

module.exports = router;
