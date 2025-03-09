import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { UserContext } from '../../store/Context';
import { auth } from '../../firebase/config';
import { signOut, onAuthStateChanged } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        setCurrentUser(loggedInUser.displayName);
      } else {
        setUser(null);
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); 
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      setUser(null); 
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        <div className="loginPage">
  {currentUser ? (
    <div className="userInfo">
      <span className="userName">Welcome, {currentUser}</span>
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>
    </div>
  ) : (
    <button onClick={() => navigate('/login')} className="loginButton">
      Please log in
    </button>
  )}
</div>

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={() => navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
