import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class NavbarList extends Component {
    
    onActiveEvent = (e) => {
        const {id,listName,activeLinkEvent} = this.props;
        activeLinkEvent(id);
        // Todo add head title
        this.props.addTodoTitle(listName);
    
    }
    
    componentDidMount() {
        this.props.activeLinkEvent(1);
    }
        
    render () {
        const {listName,listIcon,showSideBarEvent,id} = this.props;
        return (
            <li className = "nav-item mb-2" onClick = {this.onActiveEvent} >
                <Link to = {id === 1 ? "/" : listName} className = "nav-link" onClick = {showSideBarEvent}><i className = {listIcon}></i> {listName}</Link>
            </li>           
        )
    }
    
}
export default NavbarList;