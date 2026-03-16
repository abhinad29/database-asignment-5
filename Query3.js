const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("ieeevisTweets");
  const collection = db.collection("tweet");

  const results = await collection
    .aggregate([
      { $match: { "in_reply_to_screen_name": { $ne: null } } },
      { $group: { _id: "$in_reply_to_screen_name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ])
    .toArray();

  console.log("Person with most tweets directed at them:");
  console.log(`${results[0]._id} with ${results[0].count} tweets`);
  await client.close();
}

main().catch(console.error);