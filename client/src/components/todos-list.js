import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}> 
            {props.todo.todo_description} </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_responsible} </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_priority} </td>
        <td>
            <Link to={"/update/" + props.todo._id}> update </Link>
        </td>
        <td>
            <Link to={"/delete/" + props.todo._id}> delete </Link>
        </td>
    </tr>
);

class TodosList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    todoList () {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />
        })
    }

    render() {
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th> Description </th>
                            <th> Responsible </th>
                            <th> Priority </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default TodosList;