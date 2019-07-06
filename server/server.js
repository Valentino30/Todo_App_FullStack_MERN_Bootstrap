const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todosRouters = express.Router();
const PORT = 4000;
const Todo = require('./todo.model');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected successfully')
});

todosRouters.route('/').get((req, res) => {
    Todo.find((err, todo) => {
        if (err) {
            res.status(400).json('Failed to fetch todos')
        } else {
            res.json(todo)
        }
    })
});

todosRouters.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(400).json('Could not find todo with id: ' + id)
        } else {
            res.json(todo)
        }
    })
});

todosRouters.route('/add').post((req, res) => {
    let todo = new Todo (req.body);
    todo.save()
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch(err => {
        res.status(400).json('Failed to add new todo')
    }) 
});

todosRouters.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        console.log(todo)
        if (err) {
            res.status(404).json('Could not find todo with id: ' + id)
        } else {
            todo.delete()
                .then(todo => {
                    res.json(todo)
                })
                .catch(err => {
                    res.json('Could not delete todo with id: ' + id)
                })
        }
    })
});

todosRouters.route('/update/:id').post((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(404).json('Could not find todo with id: ' + id)
        } else {

            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save()
                .then(todo => {
                    res.json(todo)
                })
                .catch(err => {
                    res.status(400).json('Update not successfull')
                })
        }
    })
});

app.use('/todos', todosRouters);

app.listen(PORT, () => {
    console.log('Server lstening on PORT: ' + PORT)
});