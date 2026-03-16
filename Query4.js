const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("ieeevisTweets");
  const collection = db.collection("tweet");

  const results = await collection
    .aggregate([
      { $group: {
        _id: "$user.screen_name",
        avgRetweets: { $avg: "$retweet_count" },
        tweetCount: { $sum: 1 }
      }},
      { $match: { tweetCount: { $gt: 3 } } },
      { $sort: { avgRetweets: -1 } },
      { $limit: 10 }
    ])
    .toArray();

  console.log("Top 10 by average retweets (more than 3 tweets):");
  results.forEach((r, i) =>
    console.log(`${i + 1}. ${r._id} - avg: ${r.avgRetweets.toFixed(2)} (${r.tweetCount} tweets)`)
  );
  await client.close();
}

main().catch(console.error);