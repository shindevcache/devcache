// will display all content once user is logged in
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ShinSide from '../components/ShinSide.jsx'


const MapStateToProps = store => ({
  snippet: store.state.snippet,
  comments: store.state.comments,
  tags: store.state.tags,
  accountid: store.state.accountid,
  currentSnippetId: store.state.currentSnippetId
})

const MapDispatchToProps = dispatch => ({
  updateSnippet: (value) => {
    dispatch(actions.updateSnippet(value))
  },
  updateComments: (value) => {
    dispatch(actions.updateComments(value));
  },
  updateTags: (value) => {
    dispatch(actions.updateTags(value));
  },
  submitSnippet: (snippet, comments, accountid) => {
    dispatch(actions.submitSnippet(snippet, comments, accountid));
  },
  logout: () => {
    dispatch(actions.logout())
  },
  deleteSnippet: (currentSnippetId) => {
    dispatch(actions.deleteSnippet(currentSnippetId))
  }
})

class ShinMain extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
    <div>
      <form>
        <textarea placeholder="snippet display" rows={25} cols={88} onChange={(e) => this.props.updateSnippet(e.target.value)} value={this.props.snippet}></textarea>
        <input type="text" placeholder="comments" onChange={(e) => this.props.updateComments(e.target.value)}/>
        <input type="text" placeholder="tags" onChange={(e) => this.props.updateTags(e.target.value)}/>
        <button onClick={(e) => {e.preventDefault(); this.props.submitSnippet(this.props.snippet, this.props.comments, this.props.accountid)}}>Submit Snippet</button>
        <button onClick={(e) => {e.preventDefault(); this.props.deleteSnippet(this.props.currentSnippetId)}}>Delete Snippet</button>
      </form>
      <button onClick={() => this.props.logout()}>Logout</button>
      <ShinSide />
    </div>
    )
  }
  
}

export default connect(MapStateToProps, MapDispatchToProps)(ShinMain)