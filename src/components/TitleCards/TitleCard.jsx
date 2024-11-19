import "./TitleCard.css";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const TitleCard = ({title, category}) => {

  const  [apiData, setApiData] = useState([])
  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDg1MmYxMmYwYTNmZmI1YzZkZTAxNGNiMDU2ZDg0OCIsIm5iZiI6MTczMTg2MjgwNS45ODI4MzM5LCJzdWIiOiI2NzNhMWZkMjU4NTlmOTgxZWVkZmM1MmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.a9Ph8IpZRBxo8AZh01MrTpANcrLRwLvLtpy0g9fUCYY'
    }
  };
  
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardRef.current.addEventListener("wheel", handleWheel);
  }, []);

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

TitleCard.propTypes = {
  title : PropTypes.string,
  category : PropTypes.string
}

export default TitleCard;
