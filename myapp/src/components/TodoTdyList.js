import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoConsumer from '../context';

class TodoTdyList extends Component {
    render() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;

        return (
            <div className = "todoList">
                <TodoConsumer>
                {
                    value => {
                        const {todoItems, onSelect, myCheckedArr} = value;
                        return (
                            <div>
                            {   
                                todoItems.map(todoItem => {
                                    if(todoItem.itemTime === today ) {
                                        return (
                                        <TodoItem 
                                            key = {todoItem.id}
                                            id = {todoItem.id}
                                            itemTitle = {todoItem.itemTitle} 
                                            itemDescription = {todoItem.itemDescription}
                                            itemTime = {todoItem.itemTime}
                                            onSelect = {onSelect}
                                            isImportant = {todoItem.isImportant}
                                            isCheacked = {todoItem.isCheacked}
                                            myCheckedArr = {myCheckedArr}
                                            />
                                        )
                                    }
                                })
                            }
                            </div>
                        )
                    }
                }
                </TodoConsumer>
            </div>
        )
    }
}
export default TodoTdyList;