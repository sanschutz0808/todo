let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/todoApp";

let db = null;

async function getDatabase() {
    if(db != null) {
        return db;
    }
    return await new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, server) => {
            if (err) reject(err);
            db = server.db("todoApp");
            resolve(db);
        });
    });
}

module.exports = {
    getDatabase
};