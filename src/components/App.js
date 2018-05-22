import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MainHeader } from './MainHeader';
import PostList from './PostList';
import SinglePost from './SinglePost';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '/',
      posts: [],
      singlePost: undefined,
      siteInfo: {
        name: '',
        description: ''
      }
    }
  }

  getSiteInfo() {
    return fetch('/wp-json')
      .then(res => res.json())
      .then(json => {
          return Object.assign(this.state, { siteInfo: {
            description: json.description,
            name: json.name
          }
        });
      })
      .then(state => this.setState(state, this.setHistory(this.state)))
  }

  getPostList () {
    return fetch('/wp-json/wp/v2/posts')
      .then(res => res.json()) // TO DO: handle error
      .then(json => {
        return Object.assign(this.state, { 
          posts: json,
          singlePost: undefined
        })
      })
      .then(state => this.setState(state, this.setHistory(this.state)))
  }

  getSinglePost (slug) {
    return fetch(`/wp-json/wp/v2/posts?slug=${slug}`)
      .then(res => res.json())
      .then(json => {
        return Object.assign(this.state, { 
          location: json[0].link,
          singlePost: json[0]
         })
      })
      .then(state => this.setState(state, this.setHistory(this.state)))
  }

  handlePopState(e) {
    this.setState(e.state);
  }

  setHistory (state) {
    window.history.pushState(state, null, state.location);
  }

  componentDidMount() {
    window.addEventListener('popstate', e => this.handlePopState(e));
    this.getSiteInfo();
  }

  render () {
    const {
      posts,
      singlePost,
      siteInfo
    } = this.state;

    const {
      name,
      description
    } = siteInfo;

    return (
      <div>
        <MainHeader 
            description={description} 
            name={name} 
        />
        {
          singlePost
            ? <SinglePost post={singlePost} />
            : (
              <PostList 
                posts={posts} 
                getPosts={() => this.getPostList()} 
                getSinglePost = {slug => this.getSinglePost(slug)}
              />
            )
        }
      </div>
    );
  }
}

export default App;
