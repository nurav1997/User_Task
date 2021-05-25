/*
1.There are Users and Blogs, and any user can comment on any blog.
2.	Create a database with sample data, use the database of your choice.
3.	Consider all users who have commented on the same blog as friends (1st level friend).
4.	A friend is 2nd level friend if he has commented on a blog where a 1st level friend has also commented but has not commented on any common blog.
5.	Example - Blog1 has the comment of { User1, User2 }, Blog2 has the comment of { User1, User3 } here User2 and User3 are 2nd level friend if there exists no blog which has the comment of User2 and User3.
6.	Similar to above there can be third level friend 
7.	Create a REST api GET / users / <userId>/level/<levelNo> which should give list of all friends of that level for given userId (ex- /users/1234/level/1 for first level friend)
8.	Use high standard design principles while implementing the solution
9.	Write modular and clean code with comments keeping in mind scalability and manageability of code.
*/

var express = require('express');
const sequelize = require('./config/database');

sequelize.authenticate().then(() => {
    console.log('Connected to the database !!! :)');
}).catch(err => console.log("err : " + err));

app = express(),
    port = process.env.PORT || 5000;

app.use('/api', require('./routes/routes').router);

app.listen(port);

console.log('The user task api is running at : ' + port);