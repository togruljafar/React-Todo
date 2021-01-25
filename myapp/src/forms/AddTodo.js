import React, { Component } from 'react';
import UserConsumer from '../context';
import { HiOutlineX } from "react-icons/hi";
import axios from 'axios';
//import PropTypes from 'prop-types'

class AddTodo extends Component {
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
    validateForm = () => {

        const {itemTitle,itemDescription,itemTime} = this.state;

        if(itemTitle === "" || itemDescription === "" || itemTime === "") {
            return false;
        }
        
        return true;
    }
    addItem = async(dispatch, e) => {
        // Add Item
        e.preventDefault();
        const {itemTitle,itemDescription,itemTime,isImportant,isCheacked} = this.state;
        const newItem = {
            itemTitle,
            itemDescription,
            itemTime,
            isImportant,
            isCheacked
        }
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }
        const responseItems = await axios.post(`http://localhost:3002/todoItems`, newItem);
        dispatch({type: "ADD_ITEM", payload: responseItems.data});

        // Redirector
        this.props.history.push("/");
    }
    render() {
        const {itemTitle,itemDescription,itemTime,error} = this.state;

        return (
            <UserConsumer>{
                value => {
                    const {dispatch, functions, showAddForm } = value;
                    return (
                        <div className = "card addItemForm" style = {showAddForm ? {bottom: "0"} : null}>
                            <div className = "card-header d-flex justify-content-between">
                                <h4>Add a Task</h4>
                                <HiOutlineX style = {{fontSize: "40px", cursor: "pointer"}} onClick = {functions.showAddFormEvent} />
                            </div>
                            <div className = "card-body">
                            {
                                error ? <div className = "alert alert-danger">Please check your informations!</div> : null
                            }
                                <form onSubmit = {this.addItem.bind(this,dispatch)}>
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
                                    <button className = "btn addItemBtn btn-block" type = "submit">Add New Task</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            }</UserConsumer>
        )

       
    }
}
export default AddTodo;