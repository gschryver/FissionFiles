import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ForumContext } from '../../managers/ForumManager';

const PostList = () => {
    const { getPostByForumId, getForumById } = useContext(ForumContext);
    const [posts, setPosts] = useState([]); 
    const [forum, setForum] = useState(null);
    const navigate = useNavigate();
    const { forumId } = useParams(); 

    useEffect(() => {
        getPostByForumId(forumId).then(setPosts);
        getForumById(forumId).then(setForum);  
    }, [forumId, getPostByForumId, getForumById]);

    const goToEdit = (postId) => {
        navigate(`/post/edit/${postId}`);
    };

    return (
        <div className="post-list-container">
            <Link to="/forums">Back to Forums List</Link>
            
            {/* Only display the forum name if it's loaded */}
            {forum && <h1>Posts for {forum.name}</h1>}
            <ul>   
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <p>Content: {post.content}</p>
                        <p>Author: {post.user ? post.user.displayName : 'Unknown'}</p>
                        <p>Date: {new Date(post.timestamp).toLocaleDateString()}</p>
                        <button onClick={() => goToEdit(post.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
