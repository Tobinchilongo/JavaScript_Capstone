const commentsEndpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EXmby9I6BhLpYqOc41Bj/comments';
const fetchMovieComments = async (movieId) => {
  const response = await fetch(`${commentsEndpoint}?item_id=${movieId}`).catch((err) => err);
  return response.json();
};

export default fetchMovieComments;
