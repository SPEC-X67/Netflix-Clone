import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../components/TitleCards/TitleCard";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const [heroData, setHeroData] = useState({
    title: "Loading...",
    description: "Please wait while we load the content.",
    image: "",
    id: 0,
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDg1MmYxMmYwYTNmZmI1YzZkZTAxNGNiMDU2ZDg0OCIsIm5iZiI6MTczMTg2MjgwNS45ODI4MzM5LCJzdWIiOiI2NzNhMWZkMjU4NTlmOTgxZWVkZmM1MmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.a9Ph8IpZRBxo8AZh01MrTpANcrLRwLvLtpy0g9fUCYY'
    }
  };
  
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const movie = data.results[Math.floor(Math.random() * data.results.length)];
          setHeroData({
            title: movie.title,
            description: movie.overview,
            image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            id: movie.id,
          });
        }
      })
      .catch((err) => console.error("Failed to fetch hero data:", err));
  }, []);
  

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <div className="masked-container">
          <img src={heroData.image} alt={heroData.title} className="banner-img" />
        </div>

        <div className="hero-caption">
          <img src={hero_title} className="caption-img" />
          <h1 className="hero-title">{heroData.title}</h1>
          <p>{heroData.description}</p>
          <div className="hero-btns">
            <Link to={`/player/${heroData.id}`} className="btn">
              <img src={play_icon} alt="" />
              Play
            </Link>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
        </div>
        <div className="more-cards">
          <TitleCard />
          <TitleCard title={"Trending Now"} category={"top_rated"} />
          <TitleCard title={"Top Rated"} category={"popular"} />
          <TitleCard title={"Upcoming"} category={"upcoming"} />
          <TitleCard title={"Top Pics for You "} category={"now_playing"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
