import React, { Component } from 'react'
import { HiOutlineX } from "react-icons/hi";
//import PropTypes from 'prop-types'

class AddList extends Component {
    
    render() {
        const {showAddList,updateShowAddList} = this.props;
        return (
            <div className = {showAddList ? "card addItemForm" : "card" }>
                <div className = "card-header d-flex justify-content-between">
                    <h4>Add a List</h4>
                    <HiOutlineX style = {{fontSize: "40px", cursor: "pointer"}} onClick = {updateShowAddList} />
                </div>
                <div className = "card-body">
                    <form >
                        <div className = "form-group">
                            <label htmlFor = "listName"></label>
                            <input 
                                type = "text" 
                                name = "listName" 
                                id = "id"
                                placeholder = "Enter List Name"
                                className = "form-control"
                            />
                        </div>
                        <button className = "btn addItemBtn btn-block" type = "submit">Add New List</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddList;