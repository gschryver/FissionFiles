import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import AuthenticatedRoutes from "./components/Authenticated";
import NavBar from "./components/nav/navbar";
import { UserProvider, UserContext } from "./managers/UserManager";
import { ArticleProvider } from "./managers/ArticleManager";
import { PostProvider } from "./managers/PostManager";
import { ForumProvider } from "./managers/ForumManager";
import { CommentProvider } from "./managers/CommentManager";
import { ScientistProvider } from "./managers/ScientistManager";
import { TagProvider } from "./managers/TagManager";
import { CategoryProvider } from "./managers/CategoryManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";

function App() {
  return (
    <UserProvider>
      <CategoryProvider>
      <TagProvider>
        <ScientistProvider>
          <CommentProvider>
            <ForumProvider>
              <PostProvider>
                <ArticleProvider>
                  <BrowserRouter>
                    <AppContent />
                  </BrowserRouter>
                </ArticleProvider>
              </PostProvider>
            </ForumProvider>
          </CommentProvider>
        </ScientistProvider>
      </TagProvider>
      </CategoryProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { user, getUserStatus, login } = useContext(UserContext);

  useEffect(() => {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      const parsedUserProfile = JSON.parse(userProfile);
      getUserStatus(parsedUserProfile.email).then((responseUser) => {
        // Only update if the user is different.
        if (responseUser && (!user || user.id !== responseUser.id)) {
          login(responseUser);
        }
      });
    }
  }, [getUserStatus, login, user]);

  return (
    <>
    {/* <NavBar /> */}
      {/* Conditionally rendering routes based on user's login status. */}
      {user ? <AuthenticatedRoutes /> : <ApplicationViews />}
    </>
  );
}

export default App;
