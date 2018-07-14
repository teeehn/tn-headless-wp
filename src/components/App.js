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
        description: '',
        name: '',
        url: ''
      }
    }
  }

  getSiteInfo() {
    return fetch('/wp-json')
      .then(res => res.json())
      .then(json => {
          return Object.assign(this.state, { siteInfo: {
            description: json.description,
            name: json.name,
            url: json.url
          }
        });
      })
      .then(state => this.setState(state, this.init()))
  }

  getPostList() {
    return fetch('/wp-json/wp/v2/posts')
      .then(res => res.json()) // TO DO: handle error
      .then(json => {
        return Object.assign(this.state, { 
          posts: json,
          singlePost: undefined
        })
      })
      .then(state => this.setState(state, this.setHistory(state)))
  }

  getSinglePost(slug) {
    return fetch(`/wp-json/wp/v2/posts?slug=${slug}`)
        .then(res => res.json())
        .then(json => {
            return Object.assign(this.state, {
                singlePost: {
                    content: json[0].content.rendered,
                    title: json[0].title.rendered
                }
            })
          }
        )
        .then(state => this.setState(state, this.setHistory(state)))
  }

  handlePopState(state) {
    this.setState(state);
  }

  init () {
    const slug = location.pathname;
    if ( (slug === '/' || slug === '') ) {
        if ( this.state.posts.length > 0 ) {
            return;
        }
        this.getPostList();
    } else {
        this.getSinglePost(slug);
    }      
  }

  setHistory(state) {
    window.history.pushState(state, null, state.location);
  }

  componentDidMount() {
    window.addEventListener('popstate', e => this.handlePopState(e.state));
    this.getSiteInfo();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', e => this.handlePopState(e.state));  
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
                getSinglePost = {slug => this.getSinglePost(slug)}
              />
            )
        }
      </div>
    );
  }
}

export default App;
