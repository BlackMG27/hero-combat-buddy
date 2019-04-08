let connection = require('../../config/connection');
let heroMatch;

module.exports = function (app) {
    //get route for all profiles post route to add new profiles
    app.get('/api/heroes', function (req, res) {
        //get all of the database rows
        connection.query(`SELECT * FROM heroes`, function (err, data) {
            if (err) throw err;
            return res.json(data);
        })

    })
    app.post('/api/heroes', function (req, res) {
        //check the body
        console.log(req.body)

        let newFriend = req.body;
        let newFriendScores = req.body.scores.split(',');
        let heroes;
        let leastDifference;
        let indexOfClosestMatch;
        console.log(newFriend);
        connection.query(`SELECT * FROM heroes`, function (err, data) {
            if (err) throw err;
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
                if (heroIndex === 0) {
                    leastDifference = difference;
                    indexOfClosestMatch = heroIndex;
                } else if (difference < leastDifference) {
                    leastDifference = difference;
                    indexOfClosestMatch = heroIndex;
                }
            })
            let heroId = indexOfClosestMatch + 1;
            let heroQuery = `SELECT * FROM heroes WHERE id = ${heroId};`;
            console.log(heroQuery);
            connection.query(heroQuery, function (err, result) {
                if (err) throw err;
                console.log(result);
                heroMatch = result;
                for (ent in result) {
                    console.log(result[ent].name);
                    console.log(result[ent].photo);
                }
                return res.json(heroMatch);
            })
        })



    })





}