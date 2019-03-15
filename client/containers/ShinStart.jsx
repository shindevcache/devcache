// will display Login form and Register form
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ShinLogin from '../components/ShinLogin.jsx';
import ShinRegister from '../components/ShinRegister.jsx';

class ShinStart extends Component {
  constructor(props){
    super(props)
  }
//this.props.mode
  render(){
      return (

          <ShinLogin/>

      )
  }
}

const MapStateToProps = (store) => ({
  username: store.state.username,
  password: store.state.password,
  email: store.state.email,
  fullname: store.state.fullname,
  mode: store.state.mode
})

const MapDispatchToProps = (dispatch) => ({
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

export default connect(MapStateToProps, MapDispatchToProps)(ShinStart)