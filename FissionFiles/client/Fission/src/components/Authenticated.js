import React from 'react';
import { Route, Routes } from "react-router-dom";
import NotAuthorized from './NotAuthorized';
import Home from "./Home";
import AdminDashboard from './admin/AdminDashboard';
import UserProfile from "./users/UserProfile";
import UserList from "./users/UserList";
import UserProfileUpdate from "./users/UserProfileUpdate";
import ArticleList from './articles/ArticleList';
import Article from './articles/Article';
import AddArticle from './articles/AddArticle';
import UpdateArticle from './articles/UpdateArticle';
import PostList from './posts/PostList';
import Post from './posts/Post';
import NewPostForm from './posts/AddPost';
import UpdatePost from './posts/UpdatePost';
import ForumList from './forums/ForumList';
import AddForumForm from './forums/AddForum';
import UpdateForum from './forums/UpdateForum';

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
      <Route path="/post/:postId/:commentId?" element={<Post />} />
      <Route path="/posts/add" element={<NewPostForm />} />
      <Route path="/post/edit/:postId" element={<UpdatePost />} />
      <Route path="/forums" element={<ForumList />} />
      <Route path="/forums/:forumId/edit" element={<UpdateForum />} />
      <Route path="/forums/:forumId/posts" element={<PostList />} />
      <Route path="/forums/add" element={<AddForumForm />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
    </Routes>
  );
}
