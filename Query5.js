const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("ieeevisTweets");

  const tweets = db.collection("tweet");
  const users = db.collection("users");
  const tweetsOnly = db.collection("tweets_only");

  // Step 1: Get all unique users and insert into users collection
  const uniqueUsers = await tweets
    .aggregate([
      { $group: { _id: "$user.id", user: { $first: "$user" } } },
      { $replaceRoot: { newRoot: "$user" } }
    ])
    .toArray();

  await users.deleteMany({});
  await users.insertMany(uniqueUsers);
  console.log(`Inserted ${uniqueUsers.length} unique users into users collection`);

  // Step 2: Copy tweets but replace user object with just the user id
  const allTweets = await tweets.find({}).toArray();

  const strippedTweets = allTweets.map(tweet => {
    const { user, ...rest } = tweet;
    return { ...rest, user_id: user.id };
  });

  await tweetsOnly.deleteMany({});
  await tweetsOnly.insertMany(strippedTweets);
  console.log(`Inserted ${strippedTweets.length} tweets into tweets_only collection`);

  await client.close();
}

main().catch(console.error);