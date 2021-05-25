var express = require('express');
const { response } = require('..');
var router = express.Router();
const UserLevel = require('../models/user');

router.route('/users/:userId/friendlevel/:levelno').get(async (req, res) => {

    // here we get the userid and level number to fetch
    var userId = req.params.userId;
    var levelno = req.params.levelno;

    //user data
    var userData = [];

    // here we get the details from the database
    UserLevel.findAll().then(users => {
        users.forEach(element => {
            userData.push({ 'UID': element.UID, 'BID': element.BID, 'UserName': element.UserName })
        });
        console.log('Loaded all the data !!!');
        console.log(userData);

        switch (levelno) {
            case '1':
                //temp first level friend
                var level1friend = [];
                var currentbid = 0;

                // find the bid
                var CurrentUser = userData.find(o => o.UID == userId);
                console.log(CurrentUser);
                currentbid = CurrentUser.BID;

                //iterate through object
                userData.forEach(user => {
                    if (currentbid.toString() === user.BID.toString()) {
                        if (CurrentUser.UID != user.UID) {// check if friend is not himself
                            console.log('Found lvl 1');
                            level1friend.push(user);
                        }
                    }
                });

                if (level1friend.length < 1) {
                    res.send({ 'Message': 'Sorry no level 1 friends found !!!! 😥' })
                } else {
                    res.send(level1friend); // send level 1 friend
                }

                break;
            case '2':
                // temp level 2 friend
                var level2friend = [];
                level1friend = [];
                currentbid = 0;

                // find the bid
                CurrentUser = userData.find(o => o.UID == userId);
                console.log(CurrentUser);
                currentbid = CurrentUser.BID;

                //iterate through object get first level friend
                userData.forEach(user => {
                    if (currentbid == user.BID) {
                        if (CurrentUser.UID != user.UID) {// check if friend is not himself
                            console.log('Found lvl 1');
                            level1friend.push(user);
                        }

                    }
                });

                // iterate through first level friends
                level1friend.forEach(friend => {
                    userData.forEach(friend1 => { //iterate through all the data
                        if (friend.BID == friend1.BID) { // check for blog id match
                            if (friend.UID != friend1.UID) {
                                if (CurrentUser.UID != friend1.UID) {    // check if friend not himself
                                    if (level1friend.find(o => o.UID == friend1.UID) == undefined) { // check if second friend is not first friend
                                        console.log('inside');
                                        level2friend.push(friend1);
                                    }
                                }
                            }
                        }
                    });
                });

                if (level2friend.length == 0) {
                    res.send({ 'Message': 'Sorry no level 2 friends found !!!! 😥' })
                } else {
                    res.send(level2friend);// send lvl 2 friend array
                }



                break;
            case '3':
                // temp level 2 friend
                var level3friend = [];
                level2friend = [];
                level1friend = [];
                currentbid = 0;

                // find the bid
                CurrentUser = userData.find(o => o.UID == userId);
                console.log(CurrentUser);
                currentbid = CurrentUser.BID;

                //iterate through object get first level friend
                userData.forEach(user => {
                    if (currentbid == user.BID) {
                        if (CurrentUser.UID != user.UID) {// check if friend is not himself
                            console.log('Found lvl 1');
                            level1friend.push(user);
                        }

                    }
                });

                // iterate through first level friends
                level1friend.forEach(friend => {
                    userData.forEach(friend1 => { //iterate through all the data
                        if (friend.BID == friend1.BID) { // check for blog id match
                            if (friend.UID != friend1.UID) {    // check if friend not himself
                                if (level1friend.find(o => o.UID == friend1.UID) == undefined) { // check if second friend is not first friend
                                    console.log('inside');
                                    level2friend.push(friend1);
                                }
                            }
                        }
                    });
                });

                if (level2friend.length < 1) {
                    res.send({ 'Message': 'Sorry no level 2 friends found !!!! 😥 So no level 3 friends' });
                    break;
                } else {
                    //iterate through second level friends
                    level2friend.forEach(friend => {
                        userData.forEach(friend1 => { //iterate through all the data
                            if (friend.BID == friend1.BID) { // check for blog id match
                                if (friend.UID != friend1.UID) {    // check if friend not himself
                                    if (level1friend.find(o => o.UID == friend1.UID) == undefined) {
                                        if (level2friend.find(o => o.UID == friend1.UID) == undefined) { // check if second friend is not first friend
                                            console.log('inside3');
                                            level3friend.push(friend1);
                                        }
                                    }
                                }
                            }
                        });
                    });

                    if (level3friend.length < 1) {
                        res.send({ 'Message': 'Sorry no level 3 friends found !!!! 😥' })
                    } else {
                        res.send(level3friend);// send lvl 2 friend array
                    }

                }

                break;
            default:
                res.send({ 'Message': 'Support only 3 levels' })
        }
    });





});


module.exports.router = router;