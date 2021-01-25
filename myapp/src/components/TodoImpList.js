import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoConsumer from '../context';

class TodoImpList extends Component {
    
    render() {
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
                                    if(todoItem.isImportant) {
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
export default TodoImpList;