import React, { Component } from "react";
import axios from 'axios';

class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSubmit (e) {
        e.preventDefault();

        console.log("Todo Deleted");
        console.log("Description: ", this.state.todo_description);
        console.log("Responsible: ", this.state.todo_responsible);
        console.log("Priority: ", this.state.todo_priority);
        console.log("Completed: ", this.state.todo_completed);

        axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id)
            .then(res => {console.log(res.data)});

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                    <div className='form-group'>
                        <label> Description </label>
                        <input 
                            className='form-control' 
                            type='text' 
                            value={this.state.todo_description}
                            readOnly/>

                    </div>
                    
                    <div className='form-group'> 
                        <label> Responsible </label>
                        <input 
                            className='form-control' 
                            type='text' 
                            value={this.state.todo_responsible}
                            readOnly/>

                    </div>

                    <div className='form-group'>
                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio' 
                                value='Low' 
                                checked={this.state.todo_priority === 'Low'}
                                readOnly/>
                            <label className='form-check-label'> Low </label>
                        </div>

                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio' 
                                value='Medium' 
                                checked={this.state.todo_priority === 'Medium'}
                                readOnly/>
                            <label className='form-check-label'> Medium </label>
                        </div>

                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio' 
                                value='High' 
                                checked={this.state.todo_priority === 'High'}
                                readOnly/>
                            <label className='form-check-label'> High </label>
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className='form-check form-check-inline'>
                            <input 
                                type='checkbox' 
                                className='form-check-input'
                                value={this.state.todo_completed}
                                checked={this.state.todo_completed}
                                readOnly/>
                            <label className='form-check-label'> Completed </label>
                        </div>
                    </div>

                    <div className='form-group'>
                        <input  
                            type='submit' 
                            value='Delete Todo' 
                            className='btn btn-primary' />
                    </div>
                </form>
        );
    }
};

export default DeleteTodo;