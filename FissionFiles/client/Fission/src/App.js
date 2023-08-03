import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import AuthenticatedRoutes from './components/Authenticated';
import Header from './components/Header';
import { UserProvider, UserContext } from "./managers/UserManager";
// import react-bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
}

function AppContent() {
  const { user, getUserStatus, login } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userProfile = JSON.parse(localStorage.getItem("user"));
      getUserStatus(userProfile.email)
          .then(user => {
              if (user) {
                  login(user);
              }
          });
    }
  }, []); 

  return (
    <Router>
      <Header />
      {user ? <AuthenticatedRoutes /> : <ApplicationViews />}
    </Router>
  );
}

export default App;
