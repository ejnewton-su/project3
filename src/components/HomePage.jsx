import React, { useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { AuthContext } from '../AuthContext'; 
import '../App.css';
import image1 from './images/expenses.png'; 
import image2 from './images/budget.jpg';

const HomePage = () => {
  const { isLoggedIn, login } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <main className="container my-5">
        {!isLoggedIn ? (
          <LoginSection handleLogin={login} />
        ) : (
          <>
            <FeatureSection />
            <VideoSection />
          </>
        )}
      </main>
    </div>
  );
};

const LoginSection = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <section className="mb-5">
      <h2 className="mb-3">Login</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
        <p>Username: admin | Password: password</p>
      </form>
    </section>
  );
};

const FeatureSection = () => {
  return (
    <section className="row mb-5">
      <div className="col-md-6">
        <div className="box-shadow feature-box">
          <img 
            src={image1} 
            alt="Expenses" 
            className="feature-img mb-3" 
          />
          <h4>Track Your Expenses</h4>
          <p>Easily input and monitor where your money is going.</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="box-shadow feature-box">
          <img 
            src={image2}
            alt="Budget" 
            className="feature-img mb-3" 
          />
          <h4>Manage Your Budget</h4>
          <p>Set limits and see how you are doing in real-time.</p>
        </div>
      </div>
    </section>
  );
};
const VideoSection = () => {
  return (
    <section className="row">
      <div className="col-md-4 mb-4">
        <div className="box-shadow video-box">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/BIibwcA48jg?si=OQ2haJtFDt1yMbC8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <p className="mt-2">Learn how to build your first budget.</p>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="box-shadow video-box">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/IIKr2915l2g?si=IYUnNzXmE_ITIPjf"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <p className="mt-2">Tips to reduce monthly expenses.</p>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="box-shadow video-box">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/vksHgs3It3o?si=dADtaO-8TImQs8z6"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <p className="mt-2">How to stick to your savings goals.</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;