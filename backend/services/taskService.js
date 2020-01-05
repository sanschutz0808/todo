const {getDatabase} = require("../providers/database");

const ObjectId = require('mongodb').ObjectID

async function getTasks() {
    const db = await getDatabase();

    return await new Promise((resolve, reject) => {
        db.collection("tasks").find({}).toArray((err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

async function getTaskById(id, db) {
    let myquery = {_id: ObjectId(id)};

    return await new Promise((resolve, reject) => {
        db.collection("tasks").findOne(myquery, function(err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

async function createTask(task) {
    const db = await getDatabase();
    db.collection("tasks").insertOne(task, (err, updateResult) => {
        if (err) throw err;
        console.log("1 task inserted");
    });

    return task;
}

async function patchTask(id, task) {

    const db = await getDatabase();

    let myquery = {_id: ObjectId(id)};

    let updateResult = await new Promise((resolve, reject) => {
        db.collection("tasks").updateOne(myquery, {
            $set: task
        }, (err, updateResult) => {
            if (err) reject(err);
            resolve(updateResult)
        });
    });

    if(updateResult.result.n === 0){
        throw new Error('Task not found');
    }

    return await getTaskById(id, db);
}

module.exports = {
    createTask, patchTask, getTasks
};