const db = require(".");
const { faker } = require("@faker-js/faker");

async function syncAndSeed() {
  console.log("Seeding the database.");
  try {
    await db.query(`
    DROP TABLE IF EXISTS user, posts;
    `);
    await db.query(`
    CREATE TABLE user
    (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );

      CREATE TABLE posts 
      (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        userId INTEGER NOT NULL REFERENCES instructor(id) ON DELETE CASCADE
      );
    `);


    // Add at least 3 users.
    await Promise.all(
      [...Array(5)].map(() =>
        db.query(
          `INSERT INTO user (id, username, password) VALUES ($1, $2, $3);`,
          [faker.internet.userName(), faker.internet.password()]
        )
      )
    );

    // Add at least 3 posts for the 3 users added.
    await Promise.all(
      [...Array(20)].map((_, i) =>
        db.query(
          `INSERT INTO user (id, title, content, userId) VALUES ($1, $2, $3, $4);`,
          [
            faker.person.fullName(),
            faker.number.int({ min: 10, max: 50 }),
            (i % 5) + 1,
          ]
        )
      )
    );

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

if (require.main === module) {
  seed();
}




module.exports = syncAndSeedseed;
