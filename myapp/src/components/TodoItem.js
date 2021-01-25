import React, { Component } from 'react'
import TodoConsumer from '../context';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios'

class TodoItem extends Component {
    state = {
        itemTitle: "",
        itemDescription: "",
        itemTime: "",
        isImportant: false,
        isCheacked: false,
        isMarkStar: false,
        isVisible: false
    }
    static defaultProps = {
        itemTitle: "Bilgi yok",
        itemDescription: "Bilgi yok",
        itemTime: "Bilgi yok"
    }
    // show more info
    showItemEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    // global actions
    onCheckBox = async(dispatch, e) => {
        const {myCheckedArr} = this.props;
        const {id} = this.props;
        this.setState({
            isCheacked: !this.state.isCheacked
        })

        if(!this.state.isCheacked) { 
            myCheckedArr.push(id);
            dispatch({type: "CHECKEDBYID_ARR", payload: myCheckedArr });
        } else {
            const index = myCheckedArr.indexOf(id);
            if (index > -1) {
                myCheckedArr.splice(index, 1);
                dispatch({type: "CHECKEDBYID_ARR", payload: myCheckedArr });
            }
        }

    }    

    componentDidMount = async() => {
        const {id} = this.props;
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
    onMarkStar = async (dispatch,e) => {
        // Edit Task
        const {itemTitle,itemDescription,itemTime,isImportant,isCheacked} = this.state;
        const {id} = this.props;

        this.setState({
            isImportant: !this.state.isImportant
        })
        const updatedItem = {
            itemTitle,
            itemDescription,
            itemTime,
            isImportant: !isImportant,
            isCheacked
        };

        const responseItem = await axios.put(`http://localhost:3002/todoItems/${id}`, updatedItem);
        dispatch({type: "EDIT_ITEM", payload: responseItem.data});
    }
    deleteItem = async (dispatch,e) => {
        const {id} = this.props;
        // Delete request
        await axios.delete(`http://localhost:3002/todoItems/${id}`);
        dispatch({type: "DELETE_ITEM", payload: id});
        window.location.pathname = window.location.pathname;

    }
    componentDidMount() {
        this.setState({
            isMarkStar: this.props.isImportant,
            isCheacked: this.props.isCheacked
        })
    }
    render() {
        const {isCheacked,isVisible} = this.state;
        const {itemTitle, itemDescription, itemTime, id, onSelect, isImportant} = this.props;
        return (
            <TodoConsumer>{
                value => {
                    const {dispatch, functions} = value;
                    
                    return (
            
                        <div className = "todoItem p-2 d-flex flex-wrap align-items-center" >
                        {
                            onSelect ? <div className = "checkBox" onClick = {this.onCheckBox.bind(this, dispatch)}>
                                        {
                                            isCheacked ? <i className="fas fa-check"></i> : null
                                        }
                                    </div> 
                            : <div className = "showItem" onClick = { !onSelect ? this.showItemEvent : null}>{
                                isVisible ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>
                            }</div> 
                        }
                            
                            <div className = "listBody" onClick = { !onSelect ? this.showItemEvent : null}>
                                <p className = "item-title">{itemTitle}</p>
                                <p className = "item-time"><i className="far fa-calendar-alt"></i> {itemTime}</p>
                            </div>
                            <div className = "starBox" onClick = {this.onMarkStar.bind(this, dispatch)}>
                            {
                                !isVisible ? <i className={ isImportant ? "fas fa-star" : "far fa-star"} style = {{color: "dodgerblue"}}></i> : null
                            }
                            </div>
                            {
                                isVisible ? <div className = "w-100 d-flex flex-wrap align-items-center">
                                <p className = "item-description">{itemDescription}</p>
                                <div className = "selectedItemEventcons mr-0 ml-auto p-1">
                                    <Link to = {`edit-task/${id}`} onClick = {functions.showEditFormEvent}><i className="far fa-edit"></i></Link>
                                    <i className="fas fa-folder-plus"></i>
                                    <i className={ isImportant ? "fas fa-star" : "far fa-star"}  onClick = {this.onMarkStar.bind(this, dispatch)}></i>
                                    <i className="far fa-trash-alt" onClick = {this.deleteItem.bind(this, dispatch)}></i>
                                </div></div> 
                                : null
                            }
                        </div>
                    )
                }
            }</TodoConsumer>
        )
        
    }
}
TodoItem.propTypes = {
    itemTitle: PropTypes.string.isRequired,
    itemDescription: PropTypes.string.isRequired,
    itemTime: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}
export default  TodoItem;