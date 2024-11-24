import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_png from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useEffect, useRef, useState } from "react";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDg1MmYxMmYwYTNmZmI1YzZkZTAxNGNiMDU2ZDg0OCIsIm5iZiI6MTczMTg2MjgwNS45ODI4MzM5LCJzdWIiOiI2NzNhMWZkMjU4NTlmOTgxZWVkZmM1MmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.a9Ph8IpZRBxo8AZh01MrTpANcrLRwLvLtpy0g9fUCYY'
    }
  };

  
  useEffect(() => {
    if (window.scrollY >= 80) {
      navRef.current.classList.add("nav-dark");
    } else {
      navRef.current.classList.remove("nav-dark");
    }
  });
  window.addEventListener("scroll", () => {
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    }
  };
  
  const handleInput = async(e) => {

    const value = e.target.value
    setSearchInput(value);

    const API_URL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=en-US`;

    if(value.trim() == ""){
      return setSuggestions([]);
    }

    try {
      const response = await fetch(API_URL, options);
      const data = await response.json();

      setSuggestions(data.results.slice(0,5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <img src={search_icon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search a movie"
              value={searchInput}
              onChange={handleInput}
              className="search-input"
            />
            <div className="suggestions-list">
              {suggestions.map((movie) => (
                <div key={movie.id} className="suggestion-item" onClick={() => {
                  navigate(`/search/${movie.title}`);
                  setSearchInput("");
                  setSuggestions([]);
                }}>{movie.title}</div>
              ))}
            </div>
          </div>
        </form>

        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_png} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
