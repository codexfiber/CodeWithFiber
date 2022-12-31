const express = require("express");
const redis = require("redis");
const data = require("./db.json");

// create express app
const app = express();
const port = process.env.PORT || 3000;

// database instance - we use here settimeout to simulate a database call delay
function getUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.find((u) => u.name === user) || false);
    }, 5000);
  });
}

// connect to redis
redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  // password: "password",
});

// test the connection
try {
  redisClient.connect();
  console.log("Connected to Redis");
} catch (error) {
  console.error(`Error : ${error}`);
  process.exit(1);
}

// define a simple route
app.get("/api", async (req, res) => {
  const { user } = req.query;
  // check if the user is existing in the query
  if (!user) res.send("Please provide a user");
  // check if the user is database
  const dbUser = await getUser(user);
  if (!dbUser) res.send("User not found");
  //   res.send("Hello " + JSON.stringify(isUser));

  // check if the user is cached
  const cachedUser = JSON.parse(await redisClient.get(user));

  if (cachedUser) {
    // user is cached
    console.log("User cached");
    res.send("this user was cached : " + JSON.stringify(cachedUser));
  } else {
    console.log("User not cached");
    // add user to cache
    await redisClient.set(user, JSON.stringify(dbUser) , {
        // set the expiration time to 10 seconds
        EX: 10
    });
    res.send("this user was not cached : " + JSON.stringify(dbUser));
  }
});

// listen for requests
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
