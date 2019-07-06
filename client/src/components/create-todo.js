import React, { Component } from "react";
import axios from 'axios';

class CreateTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeDescription (e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    
    onChangeResponsible (e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onChangePriority (e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
    onSubmit (e) {
        e.preventDefault();

        console.log("Todo Created");
        console.log("Description: ", this.state.todo_description);
        console.log("Responsible: ", this.state.todo_responsible);
        console.log("Priority: ", this.state.todo_priority);
        console.log("Completed: ", this.state.todo_completed);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
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
            <div>
                <form onSubmit={this.onSubmit} >
                    <div className='form-group'>
                        <label> Description </label>
                        <input className='form-control' type='test' value={this.state.todo_description} onChange={this.onChangeDescription}/>

                    </div>
                    
                    <div className='form-group'> 
                        <label> Responsible </label>
                        <input className='form-control' type='test' value={this.state.todo_responsible} onChange={this.onChangeResponsible}/>

                    </div>
                    <label> Priority </label>
                    <div className='form-group'>
                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio' 
                                value='Low' 
                                checked={this.state.todo_priority === 'Low'}
                                onChange={this.onChangePriority} />
                            <label className='form-check-label'> Low </label>
                        </div>

                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio' 
                                value='Medium' 
                                checked={this.state.todo_priority === 'Medium'}
                                onChange={this.onChangePriority} />
                            <label className='form-check-label'> Medium </label>
                        </div>

                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio' 
                                value='High' 
                                checked={this.state.todo_priority === 'High'}
                                onChange={this.onChangePriority} />
                            <label className='form-check-label'> High </label>
                        </div>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Create Todo' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        );
    }
};

export default CreateTodo;