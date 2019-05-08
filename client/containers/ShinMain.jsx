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
  currentSnippetid: store.state.currentSnippetid
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
  deleteSnippet: (currentSnippetid) => {
    dispatch(actions.deleteSnippet(currentSnippetid))
  },
  patchSnippet: (currentSnippetid, comments, snippet) => {
    dispatch(actions.patchSnippet(currentSnippetid, comments, snippet))
  }
})

class ShinMain extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className='container'>
        <div className='main'>
        <h3>SHIN devCache</h3>
          <form>
            <textarea placeholder="snippet display" rows={25} cols={88} onChange={(e) => this.props.updateSnippet(e.target.value)} value={this.props.snippet}></textarea>
            <input type="text" placeholder="comments" onChange={(e) => this.props.updateComments(e.target.value)} value={this.props.comments}/>
            <input type="text" placeholder="tags" onChange={(e) => this.props.updateTags(e.target.value)} />
            <button onClick={(e) => {e.preventDefault(); this.props.submitSnippet(this.props.snippet, this.props.comments, this.props.accountid)}}>Submit Snippet</button>
            <button onClick={(e) => {e.preventDefault(); this.props.deleteSnippet(this.props.currentSnippetid)}}>Delete Snippet</button>
            <button onClick={(e) => {e.preventDefault(); this.props.patchSnippet(this.props.currentSnippetid, this.props.comments, this.props.snippet)}}>Update Snippet</button>
          </form>
          <button onClick={() => {this.props.logout()}}>Logout</button>
        </div>
        <ShinSide />
      </div>
    )
  }
  
}

export default connect(MapStateToProps, MapDispatchToProps)(ShinMain)