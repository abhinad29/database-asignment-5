## Loading the Data
So basically what I did was download the ieeevis2020Tweets.dump.bz2 file 
from the link provided. Then I used 7-Zip to extract it which gave me a 
folder called ieeevis2020Tweets.dump with the actual .dump file inside it.

Then I made sure MongoDB was installed and running by doing:
mongod --dbpath "C:\data\db"

Then I ran this to import the data:
mongoimport -h localhost:27017 -d ieeevisTweets -c tweet --file "C:\Users\abhin\Downloads\ieeevis2020Tweets.dump\ieeevis2020Tweets.dump"

It imported 3325 documents successfully.

Then I created a folder called tweet-queries and ran:
npm init -y
npm install mongodb

Then I wrote a separate js file for each query and ran them with node Query1.js, node Query2.js, etc.

## Results
- Query 1: 1996 tweets are not retweets or replies
- Query 2: MSFTResearch had the most followers with 513,811
- Query 3: ieeevis got the most tweets directed at them (268 tweets)
- Query 4: Deserts_X had the highest average retweets (31.50)
- Query 5: Created a users collection with 1135 unique users and a tweets_only collection with 6650 tweets
