const router = require("express").Router();
const db = require("../../db");


// Deny access if user is not logged in
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send;
  }
  next();
});


// GET /api/posts - get all posts
router.get("/", async (req, res, next) => {
  try {
    const { rows: students } = await db.query(
      "SELECT * posts"
      [req.user.id]
    );
    res.send(students);
  } catch (error) {
    next(error);
  }
});


// GET /api/posts/:id - get the post specified by id
router.get("/:id", async (req, res, next) => {
  try {
    const {
      rows: [posts],
    } = await db.query(
      "SELECT * FROM posts WHERE id = $1",
      [req.params.id, req.post.id]
    );

    if (!post) {
      return res.status(401).send("post not found.");
    }

    res.send(student);
  } catch (error) {
    next(error);
  }
});


// POST /api/posts - create a new post as the currently logged-in user
router.post("/", async (req, res, next) => {
  try {
    const {
      rows: [posts],
    } = await db.query(
      "INSERT INTO posts (id, title, content, userId) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.body.id, req.body.title, req.user.content, req.user.id]
    );

    if (!posts) {
      return res.status(401).send;
    }

  } catch (error) {
    next(error);
  }
});


// PUT /api/posts/:id - update a post only if it was created by the currently logged-in user
router.put("/:id", async (req, res, next) => {
  try {
    const {
      rows: [posts],
    } = await db.query(
      "UPDATE posts SET id = $1, title = $2 content=$3 userId = $4 AND userPost = $4 RETURNING *",
      [req.body.id, req.body.title, req.params.contents, req.user.id]
    );

    if (!posts) {
      return res.status(401).send;
    }

    res.send(student);
  } catch (error) {
    next(error);
  }
});


// DELETE /api/posts/:id - delete a post only if it was created by the currently logged-in user
router.delete("/:id", async (req, res, next) => {
  try {
    const {
      rows: [post],
    } = await db.query(
      "DELETE FROM post WHERE id = $1 AND userId = $2 RETURNING *",
      [req.params.id, req.user.id]
    );

    if (!post) {
      return res.status(401).send;
    }

    res.send(student);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
