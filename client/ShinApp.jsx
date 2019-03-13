import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShinStart from './containers/ShinStart.jsx';
import ShinMain from './containers/ShinMain.jsx';

class ShinApp extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    if (this.props.isLoggedIn === false){
      return (
      <div>
        <ShinStart />
      </div>
      )
    }
    else if (this.props.isLoggedIn === true){
      return (
      <div>
        <ShinMain />
      </div>
      )
    }
  }
}

const MapStateToProps = (store) => ({
  isLoggedIn: store.state.isLoggedIn,
})

const MapDispatchToProps = (store) =>({

})

export default connect(MapStateToProps, MapDispatchToProps)(ShinApp)