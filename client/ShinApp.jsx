import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'

import ShinStart from './containers/ShinStart.jsx';
import ShinMain from './containers/ShinMain.jsx';
import ShinSnippet from './containers/ShinSnippet.jsx';
import ShinLogin from './components/ShinLogin.jsx';
import ShinRegister from './components/ShinRegister.jsx';
import * as actions from './actions/actions';

class ShinApp extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
        <Router>
          <div>
          <Route exact path='/' render={() => this.props.isLoggedIn ? <Redirect to='/main' /> : <ShinLogin {...this.props} />} />
          <Route path='/register' render={() => <ShinRegister {...this.props}/>} />
          <Route path='/main' render={() => !this.props.isLoggedIn ? <Redirect to='/' /> : <ShinMain {...this.props}/> }/>
          </div>  
        </Router>
      
    )
  }
}

const MapStateToProps = (store) => ({
  isLoggedIn: store.state.isLoggedIn,
  username: store.state.username,
  password: store.state.password,
  email: store.state.email,
  fullname: store.state.fullname,
  mode: store.state.mode
})

const MapDispatchToProps = (dispatch) =>({
  updateUsername: (value) => {
    dispatch(actions.updateUsername(value))
  },
  updatePassword: (value) => {
    dispatch(actions.updatePassword(value))
  },
  updateFullname: (value) => {
    dispatch(actions.updateFullname(value))
  },
  updateEmail: (value) => {
    dispatch(actions.updateEmail(value))
  },
  loginUser: (username, password) => {
    dispatch(actions.loginUser(username, password))
  },
  registerUser: (username, password, fullname, email) => {
    dispatch(actions.registerUser(username, password, fullname, email))
  },
  toggleMode: () => {
    dispatch(actions.toggleMode())
  },
  loginFail: (value) => {
    dispatch(actions.loginFail(value))
  }
})

export default connect(MapStateToProps, MapDispatchToProps)(ShinApp)