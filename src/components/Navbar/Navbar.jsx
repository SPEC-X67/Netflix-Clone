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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    }
  };

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
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
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
