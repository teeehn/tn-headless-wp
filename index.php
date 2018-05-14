<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>tn headless wp theme</title>
  <?php //wp_head(); ?>
</head>
<body>
  <div id="app">
    <p>Loading...</p>
  </div>
<script>
(function(){
  const output = document.getElementById('app');
  const state = {
    posts: []
  }
  const getPost = e => {
    e.preventDefault();
    const id = e.target.id;
    const post = state.posts.find(post => post.id == id);
    const article = document.createElement('article');
    const title = `<h1>${post.title.rendered}</h1>`;
    article.innerHTML = title;
    const renderedElem = document.createElement('div');
    renderedElem.innerHTML = post.content.rendered;
    article.appendChild(renderedElem);
    output.innerHTML = '';
    output.appendChild(article);
  }
  const getPosts = () => {
    fetch('/wp-json/wp/v2/posts')
      .then(res => res.json()) // TO DO: handle error
      .then(json => {
        state.posts = json.map(post => post);
        const list = document.createElement('ul');
        json.forEach(post => {
          const item = document.createElement('li');
          const anchor = document.createElement('a');
          item.appendChild(anchor);
          anchor.text = post.title.rendered;
          anchor.href = post.link;
          anchor.id = post.id;
          anchor.onclick = getPost;
          list.appendChild(item);
        });
        output.innerHTML = '<h1>Posts</h1>';
        output.appendChild(list);
      });
  }
  getPosts();
}())
</script>
</body>
</html>
