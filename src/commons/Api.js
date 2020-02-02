const Api = {};

export default Api;

Api.getUsers = () => (async () => {
  return await fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  })
})();

Api.getPhotos = () => (async () => {
  return await fetch(`https://jsonplaceholder.typicode.com/photos`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  })
})();

Api.getAlbums = () => (async () => {
  return await fetch(`https://jsonplaceholder.typicode.com/albums`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  })
})();

Api.getPosts = () => (async () => {
  return await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  })
})();

Api.getAll = () => (async () => {
  return Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users`),
    fetch(`https://jsonplaceholder.typicode.com/posts`),
    fetch(`https://jsonplaceholder.typicode.com/photos`),
    fetch(`https://jsonplaceholder.typicode.com/albums`)
  ]).then(async ([user, post, photo, album ]) => {
    const users = await user.json();
    const posts = await post.json();
    const photos = await photo.json();
    const albums = await album.json();
    return [users, posts, photos, albums ];
    // return [user, photo, album, post];
  }).then(response => {
    // return responseText;
    // console.log(response);
    return response;
    // return response.json();

  }).catch((err) => {
    console.log(err);
  });
})();