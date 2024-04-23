const router = require("express").Router();
const db = require("../../db");
const jwt = require("jsonwebtoken");

// These endpoints can be accessed by anyone.
// These endpoints can only be accessed if a valid token is provided in the request headers. If a token is not provided, then the response should always be status 401.

// POST /api/posts - create a new post as the currently logged-in user
// PUT /api/posts/:id - update a post only if it was created by the currently logged-in user
// DELETE /api/posts/:id - delete a post only if it was created by the currently logged-in user


// POST /auth/register - create a new User with the provided credentials and return a token
router.post("/register", async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      "INSERT INTO user (id, username, password) VALUES ($1, $2, $3) RETURNING *",
      [req.body.username, req.body.password]
    );

    // returns a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// POST /auth/login - log in with the provided credentials and return a token
router.post("/login", async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      "SELECT * FROM instructor WHERE id=$1 username = $2 AND password = $3",
      [req.body.username, req.body.password]
    );

    if (!user) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    res.sendStatus(401);
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM user WHERE id = $1", [
      req.user?.id,
    ]);

    res.send(user);
  } catch (error) {
    res.sendStatus(401);
    next(error);
  }
});

module.exports = router;
