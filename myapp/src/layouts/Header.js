import React, { Component } from 'react';
import TodoConsumer from '../context';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOutlineX } from "react-icons/hi";

class Header extends Component { 
    state = {
        itemTitle: "",
        itemDescription: "",
        itemTime: "",
        isImportant: false
    }
    selectedDltEvent = (dispatch,e) => {
        this.props.myCheckedArr.map(async(id) => {
            // Delete request Selected items
            const responseItem = await axios.delete(`http://localhost:3002/todoItems/${id}`);
            dispatch({type: "DELETE_ITEM", payload: responseItem.data});

            // Redirector
            window.location.pathname = "/" 
        })
    }
    selectedMSEvent = (dispatch, e) => {
        // Mark star Selected items
        this.props.myCheckedArr.map(async(id) => {

            const responseItem = await axios.get(`http://localhost:3002/todoItems/${id}`);
            this.setState({
                itemTitle: responseItem.data.itemTitle,
                itemDescription: responseItem.data.itemDescription,
                itemTime: responseItem.data.itemTime,
                isImportant: !responseItem.data.isImportant,
            })

            const responseItems = await axios.put(`http://localhost:3002/todoItems/${id}`, this.state);
            dispatch({type: "EDIT_ITEM", payload: responseItems.data});

            // Redirector
            window.location.pathname = "/" 
            
        })
    }
    
    render() {
        const {showSideBarEvent,onSelect,selectItemEvent} = this.props;
        // const{todoTitle} = this.state;
        return (
            <TodoConsumer>{
                value => {
                    const {dispatch,todoTitle} = value;
                    return (
                        <div className = "header d-flex justify-content-between align-items-center">
                            <GiHamburgerMenu className = "svgBtn" onClick = {showSideBarEvent}/>
                            <h3 className = "head-title">{todoTitle}</h3>
                            {
                                onSelect ? <div className = "selectedItemEventcons">
                                    <i className="fas fa-folder-plus"></i>
                                    <i className="fas fa-star" onClick = {this.selectedMSEvent.bind(this,dispatch)}></i>
                                    <i className="far fa-trash-alt" onClick = {this.selectedDltEvent.bind(this,dispatch)}></i>
                                    <HiOutlineX onClick = {selectItemEvent} />
                                </div> : <i className="fas fa-tasks selectedIconi" onClick = {selectItemEvent}></i> 
                            }
                            
                        </div>
                    ) 
                }
            }</TodoConsumer>
        )
        
    }
}
export default Header;