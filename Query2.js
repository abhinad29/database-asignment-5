const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("ieeevisTweets");
  const collection = db.collection("tweet");

  const results = await collection
    .aggregate([
      { $sort: { "user.followers_count": -1 } },
      { $group: { _id: "$user.screen_name", followers: { $first: "$user.followers_count" } } },
      { $sort: { followers: -1 } },
      { $limit: 10 }
    ])
    .toArray();

  console.log("Top 10 screen names by followers:");
  results.forEach((r, i) => console.log(`${i + 1}. ${r._id} - ${r.followers} followers`));
  await client.close();
}

main().catch(console.error);