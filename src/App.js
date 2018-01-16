import React, { Component } from 'react';
import Post from './Post';
import './App.css';
import { getUserData } from './users';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      message: ''
    };

    getUserData().then(res => {
      this.setState({ user: res.data });
    });
  }

  handleChange = (event) => {
    this.setState({ message: event.target.value });
  }

  addPost = () => {
    const fullName = this.state.user.profile.first_name + ' ' + this.state.user.profile.last_name;
    const newUser = this.state.user;
    const newPost = {
      creator: {
        name: fullName,
        photo: this.state.user.profile.photo
      },
      text: this.state.message,
      likes: 0,
      shares: 0,
      comments: 0
    };
    
    newUser.feed.unshift(newPost);
    this.setState({ 
      user: newUser,
      message: ''
    });
  }

  render() {
    if (this.state.user) {
      const postList = this.state.user.feed
            .map((post, index) => <Post post={post} key={index}></Post>);
      const userPhoto = this.state.user.profile.photo;
      const fullName = this.state.user.profile.first_name + ' ' + 
          this.state.user.profile.last_name;

      return (
        <section className="container">
          <article className="new-post">
            <div className="main-content">
              <div className="profile-pic">
                <img src={ userPhoto }
                    alt={ fullName }/>
              </div>
              <div className="textbox">
                <textarea 
                  cols="30"
                  rows="10" 
                  placeholder="Say something!" 
                  value={this.state.message}
                  onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div className="button-section">
              <button onClick={this.addPost} 
                      disabled={!this.state.message}>Post</button>
            </div>
          </article>

          <section className="feed">
            {postList}
          </section>
        </section>
      );
    }
    else {
      return (<div>Loading...</div>);
    }
  }
}

export default App;
