import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostContext } from '../../managers/PostManager';
import { ForumContext } from '../../managers/ForumManager';
import { CommentContext } from '../../managers/CommentManager';

const Post = () => {
    const { getPostById } = useContext(PostContext);
    const { getForumById } = useContext(ForumContext);
    const { getCommentsForPost } = useContext(CommentContext);
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [forum, setForum] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getPostById(postId)
            .then(fetchedPost => {
                console.log("Fetched post", fetchedPost);
                setPost(fetchedPost);
                return getForumById(fetchedPost.forumId);
            })
            .then(fetchedForum => {
                console.log("Fetched forum", fetchedForum);
                setForum(fetchedForum);
                return getCommentsForPost(postId);
            })
            .then(fetchedComments => {
                console.log("Fetched comments", fetchedComments);
                setComments(fetchedComments);
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

            {/* Displaying comments */}
            <div className="comments-section">
                <h2>Comments</h2>
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                        <p>By: {comment.user.displayName}</p> 
                        <p>Date: {new Date(comment.timestamp).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {forum && <Link to={`/forums/${forum.id}/posts`}>Back to {forum.name}</Link>}
        </div>
    );
}

export default Post;
