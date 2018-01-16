import React, { Component } from 'react';
import './Post.css';

// const cx = React.addons.classSet;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false
    };
  }

  toggleLike = () => {
    if (this.state.isLiked) {
      this.props.post.likes--;
      this.setState ({ isLiked: false });
    } else {
      this.props.post.likes++;
      this.setState ({ isLiked: true });
    }
  }

  render() {
    const post = this.props.post;
    const likes = post.likes;

    const likeClass = this.state.isLiked? 'fa-thumbs-up' : 'fa-thumbs-o-up';
    return (
      <article className="post-container">
        <div className="post-body">
          <div className="poster-info">
            <img src={post.creator.photo}
                alt={post.creator.name} />
            <div className="poster-name">{post.creator.name}</div>
          </div>
          <div className="post-text">
            {post.text}
          </div>
        </div>
        <footer>
          <div className="footer-top">
            { likes } <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </div>
          <div className="footer-bottom">
            <a onClick={() => this.toggleLike()} className="button-option">
              <i className={'fa ' + likeClass} aria-hidden="true"></i><label className={this.state.isLiked? 'highlighted' : ''}>Like</label>
            </a>
            <a className="button-option">
              <i className="fa fa-comment-o" aria-hidden="true"></i>Comment
            </a>
            <a className="button-option">
              <i className="fa fa-share" aria-hidden="true"></i>Share
            </a>
          </div>
        </footer>
      </article>
    );
  }
}

export default Post;
