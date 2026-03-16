const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("ieeevisTweets");
  const collection = db.collection("tweet");

  // Count tweets that are not retweets and not replies
  const count = await collection.countDocuments({
    retweeted_status: { $exists: false },
    in_reply_to_screen_name: null
  });

  console.log("Tweets that are not retweets or replies:", count);
  await client.close();
}

main().catch(console.error);