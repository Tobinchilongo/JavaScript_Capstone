const url1 = 'https://api.tvmaze.com/shows';

const fetchData = (url, CostumSettings = {}) => {
  const response = fetch(url, CostumSettings)
    .then((res) => res.json());
  return response;
};

const getData = () => fetchData(url1);

export default getData;