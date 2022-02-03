import updateTotalCommentsCount, { fetchMovieComments } from './commentsDetails.js';

const commentsEndpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EXmby9I6BhLpYqOc41Bj/comments';
const url1 = 'https://api.tvmaze.com/shows';
const popup = document.querySelector('.movie-popup');

const get = (url) => fetch(url)
  .then((res) => res.json())
  .then((data) => data)
  .catch((error) => error);

const post = (url, params = {}) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
}).then((res) => res.text())
  .then((data) => (data.error
    ? { error: true, info: data }
    : { error: false, info: data }))
  .catch((error) => ({ error: true, info: error }));

const addComment = async (params) => {
  const response = await post(commentsEndpoint, params);
  return response;
};

const fetchMovieData = async (movieId) => {
  const response = await get(`${url1}/${movieId}`);
  return response;
};

const displayMovieComments = (data) => {
  popup.querySelector('.comments').innerHTML = data;
};

const showComments = (movieId) => {
  fetchMovieComments(movieId).then((data) => {
    if (!data.error) {
      let comments = '';
      data.forEach((comment) => {
        comments += `<li class="comments-list">${comment.creation_date} ${comment.username}: ${comment.comment}</li>`;
      });
      displayMovieComments(comments);
    } else {
      displayMovieComments('There is no comments posted yet for this movie.');
    }
  });
};

const enableClosePopup = () => {
  document.querySelector('#close-popup').addEventListener('click', () => {
    popup.style.display = 'none';
    popup.innerHTML = '';
  });
};

const displayMoviePopup = (movieId) => {
  popup.innerHTML = `Fetching data...<br>
    <span id="close-popup">X</span>`;
  fetchMovieData(movieId).then((data) => {
    popup.innerHTML = `
    <span id="close-popup">X</span>
    <img src="${data.image.medium}" class="popup-img">
    <h3 class="popup-title">${data.name}</h3>
    <table>
      <tr class="table-row">
        <td class="col col-1">
          <b >Premiered</b> </td> <td class="col col-2">${data.premiered}
        </td>
        </tr>
        <tr class="table-row">
        <td>
          <b>Ended</b></td> <td class="col col-2"> ${data.ended}
        </td>
      </tr>
      <tr class="table-row">
        <td>
          <b>Language</b></td> <td class="col col-2"> ${data.language}
        </td>
        </tr>
        <tr class="table-row">
        <td>
          <b>Type</b> </td> <td class="col col-2"> ${data.type}
        </td>
      </tr>
    </table>
    <h3 class="comment-title">
    Comments (<span class="total-comments">0</span>)
    </h3>
    <ul class="comments">
      fetching comments...
    </ul> 
    <form class="com-form">
      <h2>Add a comment</h2>
      <input type="text" name="username" placeholder="Your name" required>
      <textarea placeholder="Your insights" name="comment" required minlength="1"></textarea>
      <button type="submit">Submit</button>
    </form>
    `;
    enableClosePopup();
    showComments(movieId);

    const form = popup.querySelector('.com-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = form.elements.username.value;
      const msg = form.elements.comment.value;
      addComment({
        item_id: movieId,
        username: user,
        comment: msg,
      }).then(() => {
        showComments(movieId);
        updateTotalCommentsCount(movieId);
        form.reset();
      });
    });
  });
  popup.style.display = 'block';
  enableClosePopup();
};

const enableComments = () => {
  const commentBtns = document.querySelectorAll('.comment-btn');
  commentBtns.forEach((movie) => {
    movie.addEventListener('click', () => {
      const movieId = movie.getAttribute('movie_id');
      displayMoviePopup(movieId);
    });
  });
};

export default enableComments;
