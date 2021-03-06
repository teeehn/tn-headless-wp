import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    const {
      posts,
      getSinglePost
    } = this.props;
  
    return (
      <ul className="post-list">
        {
          posts && posts.length > 0 
            ? posts.map(post => {
  
                const {
                  id,
                  slug,
                  title
                } = post;
  
                const {
                  rendered: linkText = ''
                } = title;
  
                return (
                  <li key={id}>
                    <a 
                      href={`/${slug}`}
                      onClick={e => {
                        e.preventDefault();
                        getSinglePost(slug);
                      }}
                    >{linkText}</a>
                  </li>
                );
              })
            : null
        }
      </ul>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array
}

PostList.defaultProps = {
  posts: []
}

export default PostList;
