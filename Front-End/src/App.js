import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/Items';
import itemService from './services/items';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuctionForm from './components/AuctionForm'
import CreditCardForm from './components/CreditCardForm';
import UserProfile from './components/UserProfile'

import './css/app.css';

//color palette for item boxes
const colorPalette = [
  '#FFA500',
  '#42a5f5',
  '#66bb6a',
  '#ec407a',
  '#ffca28'
];

//functional compoenent for homepage, uses highest bidded item
const Home = ({ items }) => {
  const featuredItem = items.reduce((maxBidItem, currentItem) => {
    if (currentItem.startingBid > maxBidItem.startingBid) {
      return currentItem;
    }
    return maxBidItem;
  }, items[0]);

  return (
    <div className="center-content featured-item-section home-page">
      <h2 className="featured-item-heading">Featured Item</h2>
      {featuredItem ? (
        <div className="item-box">
          <Link to={`/bid/${featuredItem.id}`} className="item-link">
            {/*able to click on title to go to bid page */}
            <h3 className="item-name">{featuredItem.itemName}</h3> </Link>
          <div className="item-component">
            <span className="category-text">Category:</span> {featuredItem.category}
          </div>
          <div className="item-component">
            <span className="description-text">Description:</span> {featuredItem.description}
          </div>
          <div className="item-component">
            <span className="starting-bid-text">Starting Bid:</span> ${featuredItem.startingBid}
          </div>
          <div className="item-component">
            <span className="participants-text">Participants:</span> {featuredItem.participants}
          </div>
        </div>
      ) : (
        <p>No featured item available.</p>
      )}
    </div>
  );
};

//display all item lists and clickable boxes to go to bid page
const Listings = ({ items }) => {
  return (
    <div>
      <div className="listings-container">
        {items.map((item, index) => (
          <Link key={item.id} to={`/bid/${item.id}`} className="listing-item">
            <div className="listing-item-box" style={{ backgroundColor: colorPalette[index % colorPalette.length] }}>
              <h3 className="listing-name">{item.itemName}</h3>
              <div className="listing-category">
                Category: {item.category}
              </div>
              <div className="listing-description">
                Description: {item.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

//bidding page 
const Bidding = () => {
  return <div>Bid Page</div>;
};

const CreditCard = () => {
  return <div><CreditCardForm /> </div>
};

const App = () => {
  const [items, setItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    itemService.getAll().then((items) => setItems(items));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      itemService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await loginService.login({ username, password });//autenticate and retrieve user

    window.localStorage.setItem('loggedappUser', JSON.stringify(user));//store user data in storage
    itemService.setToken(user.token);

    //update user state and clear credentials
    setUser(user);
    setUsername('');
    setPassword('');
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();//clear user data from local storage
    setUser(null);
  };

  const handleLoginSuccess = () => {
    window.location.href = '/';
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('/api/users/register', {//send user registration data to server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {//alert and redirect to login
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      alert('Registration successful!');
      window.location.href = '/login';
    } catch (error) {
      alert(error);
    }
  }

  const handleCreateAuction = async (itemName, category, description, startingBid, startTime, startDate) => {
    //create auction item and update item state
    const auction = await itemService.create({
      itemName,
      category,
      description,
      startingBid,
      startTime,
      startDate,
    })

    setItems(items.concat(auction))
  }


  return (
    <Router>
      <div className="color-palette">
        <nav>
          <ul>
            <div className="left-links">
              <li className="link-item">
                <Link to="/">Auctioneer</Link>
              </li>
              <li className="link-item">
                <Link to="/items">Listings</Link>
              </li>
            </div>
            <div className="right-links">
              {user === null ? (
                <li className="link-item">
                  <Link to="/register">Register</Link>
                </li>
              ) : null}
              <li className="login-logout">
                {user === null ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <>
                    <li className="link-item">
                      <Link to="/cc"> CreditCard </Link>
                    </li>
                    <li className="link-item">
                      <Link to="/user-profile"> User Profile</Link>
                    </li>
                    <AuctionForm handleCreateAuction={handleCreateAuction} />
                    <> Welcome back, {user.firstName} </>
                    <button onClick={handleLogout} type="submit">logout</button>
                  </>
                )}
              </li>
            </div>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Home items={items} />}
          />
          <Route
            path="/items"
            element={<Listings items={items} />} />
          <Route
            path="/items"
            element={<CreditCard items={CreditCard} />} />
          <Route
            path="/bid/:id"
            element={<Bidding />} />
          <Route
            path="/login"
            element={
              <div className="login-page">
                <LoginForm
                  handleLogin={handleLogin}
                  username={username}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  password={password}
                  onLoginSuccess={handleLoginSuccess}
                />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="login-page">
                <RegisterForm handleRegister={handleRegister} />
              </div>
            }
          />
          <Route
            path="/user-profile"
            element={<UserProfile />}
          />
          <Route
            path="/cc"
            element={<CreditCardForm username={user} />}
          />
        </Routes>

      </div>
    </Router>
  );
};

export default App;