var connection = require('../config/connection');
var heroMatch;

module.exports = function (app) {
    //get route for all profiles post route to add new profiles
    app.get('/api/heroes', function (req, res) {
        //get all of the profiles from the database
        connection.query(`SELECT * FROM heroes;`, function (err, data) {
            if (err) throw err;
            //display all of the data to /api/heroes
            return res.json(data);
        })

    })
    app.post('/api/heroes', function (req, res) {
        //check the body
        console.log(req.body)
        //grab the body and the body scores 
        let newFriend = req.body;
        let newFriendScores = req.body.scores.split(',');
        //set up the variables
        let heroes;
        let leastDifference;
        let indexOfClosestMatch;
        console.log(newFriend);
        //grab the values from the database
        connection.query(`SELECT * FROM heroes;`, function (err, data) {
            if (err) throw err;
            //store the data into heroes variable
            heroes = data;
            //makes the closest Match by going through each hero's scores and comparing it to the user's scores
            heroes.forEach(function (hero, heroIndex) {
                //split each hero's score into an array
                hero = hero.scores.split(',');
                //go through each array
                let difference = hero.reduce(function (accumulator, value, scoreIndex) {
                    //take each number in the array and subtract the newFriendScore by each hero array number
                    return accumulator += Math.abs(newFriendScores[scoreIndex] - value);
                }, 0)
                //if the heroIndex is at 0
                if (heroIndex === 0) {
                    //make the leastDifference and indexOfClosestMatch = difference and heroIndex
                    leastDifference = difference;
                    indexOfClosestMatch = heroIndex;
                    //if the difference is less than the leastDifference
                } else if (difference < leastDifference) {
                    //set the values to the current index
                    leastDifference = difference;
                    indexOfClosestMatch = heroIndex;
                }
            })
            //add one to the indexOfClosestMatch so that it matches the id in the database
            let heroId = indexOfClosestMatch + 1;
            //set up the database query
            let heroQuery = `SELECT * FROM heroes WHERE id = ${heroId};`;
            //check the query to make sure it works
            console.log(heroQuery);
            connection.query(heroQuery, function (err, result) {
                if (err) throw err;
                console.log(result);
                //store result in the global variable
                heroMatch = result;
                //check to make sure that the data is actually filterable
                for (ent in result) {
                    console.log(result[ent].name);
                    console.log(result[ent].photo);
                }
                //set the response to heroMatch
                return res.json(heroMatch);
            })
        })
        //make the variables for the insert query
        let name = req.body.name;
        let photo = req.body.photo;
        let scores = req.body.scores;

        //make the connection query with query language 
        connection.query(`INSERT INTO heroes SET ?;`, {
            //put the incoming data into the database fields
            name: name,
            photo: photo,
            scores: scores
        }, function (err, data) {
            //if error, show the error
            if (err) throw err;
            //shows that the addition was a success
            console.log('Success!');
        })

    })

}