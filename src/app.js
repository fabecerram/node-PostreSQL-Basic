// Main application file

const express = require('express');
const pool = require('./services/dbservice');

const app = express();
app.use(express.json());

//Routes

// get all task
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query(
            'SELECT * FROM todo'
        );

        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// get a todo task
app.get('/todos/:id', async(req, res) =>{
    try {
        const { id } = req.params;

        const todo = await pool.query(
            'SELECT * FROM TODO WHERE todo_Id = $1',
            [ id ]
        );

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
    
});

// create new task
app.post('/todos', async(req, res) => {
    try {
        const { todo_description  } = req.body;

        const newTodo = await pool.query(
            'INSERT INTO todo (todo_description, creation_Date, completed) VALUES ($1, $2, $3) RETURNING *',
            [ todo_description, new Date() , false ]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});


// update a task
app.put('/todos/:id', async(req, res) => {    
    try {
        const { id } = req.params;
        const { todo_description } = req.body;

        const updateTodo = await pool.query(
            'UPDATE todo SET todo_description = $1, update_Date = $2 WHERE todo_Id = $3', 
            [ todo_description, new Date(), id ]
        );

        res.json('The information has been succesfully updated!');
    } catch (error) {
        console.log(error.message);
    }
});


// delete a task
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_Id = $1',
            [ id ]
        );

        res.json('The task has been succesfully deleted!');
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(
    3000, () => {
        console.log("Server is running!");
    }
);

module.exports = app;