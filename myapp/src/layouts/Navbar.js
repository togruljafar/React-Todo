import React, { Component } from 'react';
import TodoConsumer from '../context';
import { HiOutlineX } from "react-icons/hi";
import AddList from '../forms/AddList';
import NavbarList from './NavbarList';

class Navbar extends Component {
    activeLinkEvent = (clickedID) => {
        const linkArr = [];
        document.querySelectorAll(".nav-item").forEach( navitem => {
            linkArr.push(navitem);
            navitem.classList.remove('active');
        })
        linkArr[clickedID-1].classList.add('active');
    }
    render () {
        const {showSideBar,showSideBarEvent} = this.props;
        return (
            <TodoConsumer>
            {
                value => {
                    const {todoLists, functions} = value;
                    return (
                        <div className = { showSideBar ? "navbar open-navbar" : "navbar close-navbar" } >
                            <div className = "closeMenuBtn"><HiOutlineX className = "closeBtn" onClick = {showSideBarEvent}/></div>
                            <nav className = "navbar-nav w-100 h-100 navbar-expand-lg navbar-dark p-4 pt-5" >
                                <a href = "/" className = "navbar-brand">App List</a>
                                <hr className = "mb-4" />
                                <ul className = "navbar-nav">
                                {
                                    // add class active for isActive action
                                    todoLists.map( todoList => {
                                        return (
                                            <NavbarList
                                            key = {todoList.id}
                                            id = {todoList.id}
                                            listName = {todoList.listName}
                                            listIcon = {todoList.listIcon}
                                            showSideBarEvent = {showSideBarEvent}
                                            addTodoTitle = {functions.addTodoTitle}
                                            activeLinkEvent = {this.activeLinkEvent}
                                            />
                                        )
                                    })
                                }
                                </ul>
                                <div className = "addlist d-flex align-items-center" >
                                    <i className="fas fa-plus pr-3"></i>
                                    <p className = "mb-0">New List</p>
                                </div>
                            </nav>
                            <AddList/>
                        </div>
                    )
                }
            }            
            </TodoConsumer>
            
        )
    }
    
}
export default Navbar;