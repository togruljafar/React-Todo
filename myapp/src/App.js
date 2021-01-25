import React,{Component} from 'react';
import './App.css';
// Layouts
import Navbar from './layouts/Navbar';
import Header from './layouts/Header';
// components
import TodoList from './components/TodoList';
import TodoImpList from './components/TodoImpList';
import TodoTdyList from './components/TodoTdyList';
import TodoConsumer from './context';
// react-router-dom
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
// forms
import AddTodo from './forms/AddTodo';
import EditTodo from './forms/EditTodo';
// pagesfire
import NotFound from './pages/NotFound'


class App extends Component {
  state = {
        onSelect: false,
        showSideBar: false
      }
  showSideBarEvent = (e) => {
    // Open and close my Sidebar Menu
    this.setState({
        showSideBar: !this.state.showSideBar
    })
  }
  selectItemEvent = (dispatch,e) => {
    e.preventDefault();
    // show select item
    this.setState({
        onSelect: !this.state.onSelect
    })
    dispatch({type: "UPDATE_ONSELECT", payload: !this.state.onSelect});
  }
  
  render() {

    return (
      <Router>
        <TodoConsumer>
        {
          value => {
            const {dispatch, functions,myCheckedArr,todoLists} = value;

            return (
              <div className = "app d-flex justify-content-between w-100">
                <Navbar sideBarTitle = "App List" showSideBar = {this.state.showSideBar} showSideBarEvent = {this.showSideBarEvent} todoLists = {todoLists} />
                <div className = {!this.state.showSideBar ? "todoapp w-100" : "todoapp"} >
                  <div className = "todoapp-inner">
                    <Header title = "My Tasks" 
                      showSideBarEvent = {this.showSideBarEvent} 
                      showSideBar = {this.state.showSideBar}
                      onSelect = {this.state.onSelect}
                      selectItemEvent = {this.selectItemEvent.bind(this, dispatch)}
                      myCheckedArr = {myCheckedArr} />
                    <hr/>
                    <Switch>
                      <Route exact path = "/" component = {TodoList}/>
                      <Route exact path = "/important" component = {TodoImpList}/>
                      <Route exact path = "/today" component = {TodoTdyList}/>
                      <Route exact path = "/add-task" component = {AddTodo}/>
                      <Route exact path = "/edit-task/:id" component = {EditTodo}/>
                      <Route default component = {NotFound}/>
                    </Switch>
                    <Link to = "/add-task" className = "addItem d-flex align-items-center" onClick = {functions.showAddFormEvent} >
                        <i className="fas fa-plus pr-3"></i>
                        <p className = "mb-0">Add a Task</p>
                    </Link>
                  </div>
                </div>
              </div>
            )
          }
        }
        </TodoConsumer>
      </Router>
    )
  }
  
}

export default App;
