import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostContext } from '../../managers/PostManager';
import { ForumContext } from '../../managers/ForumManager';


const Post = () => {
    const { getPostById } = useContext(PostContext);
    const { getForumById } = useContext(ForumContext);
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [forum, setForum] = useState(null);

    useEffect(() => {
        getPostById(postId)
            .then(fetchedPost => {
                console.log("Fetched post", fetchedPost);
                setPost(fetchedPost);
                return getForumById(fetchedPost.forumId);
            })
            .then (fetchedForum => {
                console.log("Fetched forum", fetchedForum);
                setForum(fetchedForum);
            });
    }, [postId]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="post-container">
            <h1>{post.title}</h1>

            <p>Author: {post.user.displayName}</p>
            <p>Date: {new Date(post.timestamp).toLocaleDateString()}</p>
            <div className="post-content">
                {post.content}
            </div>

            {forum && <Link to={`/forums/${forum.id}/posts`}>Back to {forum.name}</Link>}
        </div>
    );
}

export default Post;
