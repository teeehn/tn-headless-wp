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
        title && title.rendered
          ? <h2>{ title.rendered }</h2>
          : null
      }
      {
        content && content.rendered
          ? <span dangerouslySetInnerHTML={bodyText(content.rendered)}></span>
          : null
      }
    </div>
  )
}

export default SinglePost;
