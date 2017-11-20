import React, { Component } from 'react'
import { connect } from 'react-redux'

class Admin extends Component{
    render(){
        const currentUser = this.props.user.currentUser
        return(
            <div className="container" >
                <h2>This is the Admin component</h2>
                { (currentUser == null) ? 'No Current User':
                    <div>{currentUser.username}</div>
                }
            </div>
        )
    }
}

const stateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(stateToProps,null)(Admin)