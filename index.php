<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>tn headless wp theme</title>
</head>
<body>
  <div id="app">
    <p>Loading...</p>
  </div>
<script>
(function(){
  const output = document.getElementById('app');
  const state = {
    posts: [],
    siteInfo: {
      name: '',
      description: ''
    }
  }
  const getPost = e => {
    e.preventDefault();
    location = e.target.href;
    const id = e.target.id;
    const post = state.posts.find(post => post.id == id);
    const title = `<h1>${post.title.rendered}</h1>`;
    const body = `<div>${post.content.rendered}</div>`;
    const article =`<article>${title}${body}</article>`;
    const contentContainer = document.getElementById('output');
    contentContainer.innerHTML = article;
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
          anchor.href = `/#/${post.slug}`;
          anchor.id = post.id;
          anchor.onclick = getPost;
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
    let content = `<h1>${state.siteInfo.name}</h1>`;
    content += `<h2>${state.siteInfo.description}</h2>`;
    content += `<div id="output"></div>`;
    return content;
  }
  const getSiteInfo = (state) => {
    return fetch('/wp-json')
      .then(res => res.json())
      .then(json => {
        state = Object.assign(state, {'siteInfo': {
          description: json.description,
          name: json.name
        }})
        return appContainer();
      });     
  }
  async function init() {
    const appContainerStr = await getSiteInfo(state);
    output.innerHTML = appContainerStr;
    const postContainer = document.getElementById('output');
    const postData = await getPosts();
    postContainer.appendChild(postData);
  }
  window.addEventListener('DOMContentLoaded', e => init());
  window.addEventListener('popstate', e => {
    if ( location.hash === '' ) {
      init();
    }
  });
}())
</script>
</body>
</html>
