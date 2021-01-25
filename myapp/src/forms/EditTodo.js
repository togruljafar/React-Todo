import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios'
import { HiOutlineX } from "react-icons/hi";
//import PropTypes from 'prop-types'

class EditTodo extends Component {
    state = {
        itemTitle: "",
        itemDescription: "",
        itemTime: "",
        isImportant: false,
        isCheacked: false,
        error: false
    }
    changeInputValue = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    componentDidMount = async() => {
        const {id} = this.props.match.params;
        const responseItem = await axios.get(`http://localhost:3002/todoItems/${id}`);
        const {itemTitle,itemDescription,itemTime,isImportant,isCheacked} = responseItem.data;
        this.setState({
            itemTitle,
            itemDescription,
            itemTime,
            isImportant,
            isCheacked
        })
    }
    validateForm = () => {
        const {itemTitle,itemDescription,itemTime} = this.state;

        if(itemTitle === "" || itemDescription === "" || itemTime === "") {
            return false;
        }
        
        return true;
    }
    editItem = async(dispatch,e) => {
        e.preventDefault();
        // Edit Task
        const {itemTitle,itemDescription,itemTime,isImportant,isCheacked} = this.state;
        const {id} = this.props.match.params;
        const updatedItem = {
            itemTitle,
            itemDescription,
            itemTime,
            isImportant,
            isCheacked
        };
        if(!this.validateForm()) {
            this.setState({
                error: true
            })
            return
        }

        const responseItem = await axios.put(`http://localhost:3002/todoItems/${id}`, updatedItem);
        dispatch({type: "EDIT_ITEM", payload: responseItem.data});
        //Redirector
        this.props.history.push("/");
    }
    render() {
        const {itemTitle,itemDescription,itemTime,error} = this.state;

        return (
            <UserConsumer>{
                value => {
                    const {dispatch, functions, showEditForm } = value;
                    return (
                        <div className = "card editItemForm"  style = {showEditForm ? {bottom: "0"} : null}>
                            <div className = "card-header d-flex justify-content-between">
                                <h4>Update a Task</h4>
                                <HiOutlineX style = {{fontSize: "40px", cursor: "pointer"}} onClick = {functions.showEditFormEvent} />
                            </div>
                            <div className = "card-body">
                            {
                                error ? <div className = "alert alert-danger">Please check your informations!</div> : null
                            }
                                <form onSubmit = {this.editItem.bind(this,dispatch)}>
                                    <div className = "form-group">
                                        <label htmlFor = "itemTitle"></label>
                                        <input 
                                            type = "text" 
                                            name = "itemTitle" 
                                            id = "id"
                                            placeholder = "Enter task Title"
                                            className = "form-control"
                                            value = {itemTitle}
                                            onChange = {this.changeInputValue}
                                        />
                                    </div>
                                    <div className = "form-group">
                                        <label htmlFor = "itemDescription"></label>
                                        <input 
                                            type = "text" 
                                            name = "itemDescription" 
                                            id = "id"
                                            placeholder = "Enter task Description"
                                            className = "form-control"
                                            value = {itemDescription}
                                            onChange = {this.changeInputValue}
                                        />
                                    </div>
                                    <div className = "form-group">
                                        <label htmlFor = "itemTime"></label>
                                        <input 
                                            type = "date" 
                                            name = "itemTime" 
                                            id = "id"
                                            placeholder = "Enter task add Date"
                                            className = "form-control"
                                            value = {itemTime}
                                            onChange = {this.changeInputValue}
                                        />
                                    </div>
                                    <button className = "btn editItemBtn btn-block" type = "submit">Update task</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            }</UserConsumer>
        )

       
    }
}
export default EditTodo;