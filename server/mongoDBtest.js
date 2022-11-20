var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("node-vue-moba");
//     myobj = {
//         name: "123"
//     }
//     dbo.collection("name").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("插入成功");
//         db.close();
//     });
// });

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("node-vue-moba");
    dbo.collection("name").find({}).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
