// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
//   <h1>Hello World</h1>,
//   document.getElementById('root')
// )
(function(){
  const root = document.getElementById('root');
  const state = {
    posts: [],
    siteInfo: {
      name: '',
      description: ''
    }
  }
  class Component {
    constructor(element, ...children) {
      this.element = element;
      this.children = children || [];
    }
    // Creates a DOM element and nests children
    create () {
      const elType = typeof this.element === 'string' 
        ? this.element
        : 'div';
      const el = document.createElement(elType);
      const childCount = this.children.length;
      if (!childCount) {
        return el;
      }
      for (let i = 0; i < childCount; i += 1) {
        const child = this.children[i];
        if ( typeof child === 'string' ) {
          el.textContent = child;
        } else if ( typeof child === 'object' ) {
          el.appendChild(child);
        }
      }
      return el;
    }
  }
  const getPost = e => {
    e.preventDefault();
    location = e.target.href;
    const id = e.target.id;
    const post = state.posts.find(post => post.id == id);
    const title = `<h1>${post.title.rendered}</h1>`;
    console.log('title type: ', typeof title);
    const body = `<div>${post.content.rendered}</div>`;
    const article =`<article>${title}${body}</article>`;
    const contentContainer = document.getElementById('content-body');
    contentContainer.innerHTML = article;
  }
  const getPostFromSlug = slug => {
    return fetch(`/wp-json/wp/v2/posts?slug=${slug}`)
      .then(res => res.json())
      .then(json => {
        const title = new Component('h1', json[0].title.rendered).create();
        const body = new Component('article').create();
        body.innerHTML = json[0].content.rendered;
        return new Component('div', title, body).create();
      })
  }
  const getPosts = () => {
    const postContent = document.createElement('div');
    return fetch('/wp-json/wp/v2/posts')
      .then(res => res.json()) // TO DO: handle error
      .then(json => {
        state.posts = json.map(post => post);
        const list = document.createElement('ul');
        json.forEach(post => {
          const item = document.createElement('li');
          const anchor = document.createElement('a');
          item.appendChild(anchor);
          anchor.text = post.title.rendered;
          anchor.href = `${post.slug}`;
          anchor.id = post.id;
          anchor.onclick =  async function(e) {
            e.preventDefault();
            const link = e.target.href;
            history.pushState(null, `${state.siteInfo.name} | ${link}`, link);
            const thePost = await getPostFromSlug(location.pathname);
            const contentContainer = document.getElementById('content-body');
            contentContainer.innerHTML = '';
            contentContainer.appendChild(thePost);
          }
          list.appendChild(item);
        });
        postContent.innerHTML = '<h1>Posts</h1>';
        postContent.appendChild(list);
        return postContent;
      })
      .catch(err => {
        postContent.innerHTML = err;
        return postContent;
      })
  }
  const appContainer = () => {
    const h1 = new Component('h1', state.siteInfo.name).create();
    const h2 = new Component('h2', state.siteInfo.description).create();
    const header = new Component('header', h1, h2).create();

    const main = new Component('div').create();
    main.id = 'content-body';

    return new Component('div', header, main).create();
  }
  const getSiteInfo = (state) => {
    return fetch('/wp-json')
      .then(res => res.json())
      .then(json => {
        state = Object.assign(state, {
            'siteInfo': {
              description: json.description,
              name: json.name
            }
          }
        );
      })
      .then(() => appContainer())     
  }
  async function init() {
    root.innerHTML = '';
    const appContainer = await getSiteInfo(state);
    root.appendChild(appContainer);
    const slug = location.pathname;
    const postContainer = document.getElementById('content-body');
    const postData = (slug === '/' || slug === '')
      ? await getPosts()
      : await getPostFromSlug(slug);
    postContainer.appendChild(postData);
  }
  window.addEventListener('DOMContentLoaded', e => init());
  window.addEventListener('popstate', e => {
    console.log('popstate fired');
    if ( location.hash === '' ) {
      init();
    }
  });
}())