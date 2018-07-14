import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const SinglePost = props => {
  const { post } = props;
  const {
    title = {},
    content = {}
  } = post;

  const bodyText = str => {
    return { __html: str };
  }

  return (
    <div className="post-single">
      {
        title
          ? <h2>{ title }</h2>
          : null
      }
      {
        content
          ? <span dangerouslySetInnerHTML={bodyText(content)}></span>
          : null
      }
    </div>
  )
}

export default SinglePost;
