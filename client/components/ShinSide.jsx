// Side Bar
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const MapStateToProps = store => ({
  search: store.state.search,
  userTags: store.state.userTags
})

const MapDispatchToProps = dispatch => ({
  updateSearch: (value) => {
    dispatch(actions.updateSearch(value))
  }
})

class ShinSide extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='side-bar'>
        <input type="text" placeholder="search" />
        {/* Once tags are implemented, render big tags array here */}
      </div>

    )
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(ShinSide)