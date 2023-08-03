import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom"; 
import ApplicationViews from "./components/ApplicationViews";
import AuthenticatedRoutes from './components/Authenticated';
import Header from './components/Header';
import { UserProvider, UserContext } from "./managers/UserManager";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <UserProvider>
            <BrowserRouter> 
                <AppContent />
            </BrowserRouter>
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
    <>
      <Header />
      {user ? <AuthenticatedRoutes /> : <ApplicationViews />}
    </>
  );
}

export default App;
