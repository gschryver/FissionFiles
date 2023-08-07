import React from 'react';
import { Route, Routes } from "react-router-dom";
import NotAuthorized from './NotAuthorized';
import Home from "./Home";
import UserProfile from "./users/UserProfile";
import UserList from "./users/UserList";
import UserProfileUpdate from "./users/UserProfileUpdate";
import ArticleList from './articles/ArticleList';
import Article from './articles/Article';
import AddArticle from './articles/AddArticle';
import UpdateArticle from './articles/UpdateArticle';
import PostList from './posts/PostList';
import Post from './posts/Post';
import ForumList from './forums/ForumList';

export default function Authenticated() {
  return (
    <Routes>
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/" element={<Home />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/users" element={<UserList />} /> 
      <Route path="/edit-profile/:userId" element={<UserProfileUpdate />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/article/:articleId" element={<Article />} />
      <Route path="/articles/add" element={<AddArticle />} />
      <Route path="/articles/edit/:articleId" element={<UpdateArticle />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/forums" element={<ForumList />} />
      <Route path="/forums/:forumId/posts" element={<PostList />} />
    </Routes>
  );
}
