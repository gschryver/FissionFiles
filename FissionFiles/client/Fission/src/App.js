import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom"; 
import ApplicationViews from "./components/ApplicationViews";
import AuthenticatedRoutes from './components/Authenticated';
import Header from './components/Header';
import { UserProvider, UserContext } from "./managers/UserManager";
import { ArticleProvider, ArticleContext } from "./managers/ArticleManager";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        // Using the UserProvider to wrap all components so they can access the user's context.
        // Using the ArticleProvider to wrap all components so they can access the article's context.
        <UserProvider>
          <ArticleProvider>
            <BrowserRouter> 
                <AppContent />
            </BrowserRouter>
          </ArticleProvider>
        </UserProvider>
    );
}

function AppContent() {
  const { user, getUserStatus, login } = useContext(UserContext);

  useEffect(() => {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      const parsedUserProfile = JSON.parse(userProfile);
      getUserStatus(parsedUserProfile.email)
          .then(responseUser => {
              // Only update if the user is different.
              if (responseUser && (!user || user.id !== responseUser.id)) {
                  login(responseUser);
              }
          });
    }
  }, [getUserStatus, login, user]);
  

  return (
    <>
      <Header />
      {/* Conditionally rendering routes based on user's login status. */}
      {user ? <AuthenticatedRoutes /> : <ApplicationViews />}
    </>
  );
}

export default App;
