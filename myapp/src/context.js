import React, { Component } from 'react';
import axios from 'axios';

const TodoContext = React.createContext();
// Provider, Consumer
const reducer = (state, action) => {
    switch(action.type) {
        case "DELETE_ITEM":
            return {
                ...state,
                todoItems: state.todoItems.filter(todoItem => action.payload.id !== todoItem.id)
            }
        case "ADD_ITEM":
            return {
                ...state,
                todoItems: [...state.todoItems, action.payload]
            }
        case "EDIT_ITEM":
            return {
                ...state,
                todoItems: state.todoItems.map(todoItem => todoItem.id === action.payload.id ? action.payload : todoItem)
            }
        case "UPDATE_ONSELECT":
            return {
                ...state,
                onSelect: action.payload
            }
        case "CHECKEDBYID_ARR":
            return {
                ...state,
                myCheakedArr:  action.payload
            }
        default: 
            return state
    }
}

export class TodoProvider extends Component {
    state = {
        todoItems: [],
        trashItems: [],
        todoLists: [
            {
                id : 1,
                listName: "My Task",
                listIcon: "fas fa-tasks"
            },
            {
                id : 2,
                listName: "Important",
                listIcon: "fas fa-star"
            },
            {
                id : 3,
                listName: "Today",
                listIcon: "fas fa-calendar-day"
            }
        ],
        myCheckedArr: [],
        todoTitle: "My Task",
        onSelect: false,
        showAddForm: false,
        showEditForm: false,
        functions:
        {
            showAddFormEvent: (e) => {
                this.setState({
                    showAddForm: !this.state.showAddForm
                })
                if(this.state.showAddForm) window.location.pathname = '/'
            },
            showEditFormEvent: (e) => {
                this.setState({
                    showEditForm: !this.state.showEditForm
                })
                if(this.state.showEditForm)  window.location.pathname = '/'
            },
            addTodoTitle: (listName) => {
                this.setState({
                    todoTitle: listName
                })
                
            }
        },
        dispatch: action => {
            this.setState(state => reducer(state,action));
        }

    } 
    componentDidMount = async () => {
        const responseItems = await axios.get("http://localhost:3002/todoItems");

        this.setState({
            todoItems: responseItems.data,
        })
    }
    render() {
        return (
            <TodoContext.Provider value = {this.state}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}

const TodoConsumer = TodoContext.Consumer;
export default TodoConsumer;