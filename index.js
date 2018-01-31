const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;

const dogs = [
    {
        id: 1,
        type: "Corgi",
        name: "Billy"
    },
    {
        id: 2,
        type: "miniGoldenDoodle",
        name: "Pickles",
    },
    {
        id: 3,
        type: "bostonTerrier",
        name: "Charles"
    }
];

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.params);
    console.log(req.headers);
    console.log(req.body);
    next();
});

app.get('/api/dogs', (req, res, next) => {
    res.status(200).json(dogs);
});

app.get(`/api/dogs/:id`, (req, res, next) => {
    const selected = dogs.filter(val => val.id === Number(req.params.id))[0];
    if(selected) {
      return res.json(selected);}
    else {
        return res.status(500).json({message: "Dog Not Found"});
    }
});

app.post('/api/dogs/', (req, res, next) =>{
    dogs.push(req.body);
    res.json(dogs);
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});