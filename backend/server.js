const { createTask, patchTask, getTasks } = require("./services/taskService");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const port = 3000;

app.get('/', async (req, res) => {
    res.send(await getTasks());
});

app.post('/', async (req, res) => {
    res.send(await createTask(req.body));
});

app.patch('/:id', async (req, res) => {
    try{
        res.send(await patchTask(req.params.id, req.body));
    } catch (e){
        res.status(404).send({error : e.message});
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));