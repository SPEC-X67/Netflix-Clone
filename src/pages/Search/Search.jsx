import { Link, useNavigate, useParams } from 'react-router-dom'
import './Search.css'
import { useEffect, useState } from 'react';
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Search = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDg1MmYxMmYwYTNmZmI1YzZkZTAxNGNiMDU2ZDg0OCIsIm5iZiI6MTczMTg2MjgwNS45ODI4MzM5LCJzdWIiOiI2NzNhMWZkMjU4NTlmOTgxZWVkZmM1MmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.a9Ph8IpZRBxo8AZh01MrTpANcrLRwLvLtpy0g9fUCYY'
    }
  };

  const API_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`;

  useEffect(() => {
    console.log(API_URL);
    setLoading(true);

    fetch(API_URL, options)
    .then((res) => res.json())
    .then((data) => setResults(data.results || []))
    .catch((err) => console.log("Error fetching search results:",err))
    .finally(() => setLoading(false))

  },[query]);

  return (
    <div className='search-page'>
      <div className="top-ctn">
      <img
        src={back_arrow_icon}
        onClick={() => {
          navigate(-1);
        }}
      />
      <h2>Search Results for {query}</h2>
      </div>
        {loading ? (<p>Loading...</p>) : results.length > 0 ? (
          <div className='search-results'>
            {results.map((movie) => (
              <Link to={`/player/${movie.id}`} key={movie.id} className='search-card'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title} />
                <h3>{movie.title}</h3>
              </Link>
            ))}
          </div> 
        ) : ( <p>No results found.</p>
        )}
    </div>
  )
}

export default Search
