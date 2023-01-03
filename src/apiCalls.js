const fetchApiData = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.log(`${path} API Error!`))
};

const fetchData = () => {
  return Promise.all([
    fetchApiData("users"),
    fetchApiData("sleep"),
    fetchApiData("hydration"),
  ])
};
  
export default { fetchData };