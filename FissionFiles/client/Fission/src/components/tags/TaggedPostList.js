import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap'; 
import { TagContext } from '../../managers/TagManager';

const TaggedPostList = () => {
    const { getPostsByTagId, getTagById } = useContext(TagContext); 
    const { tagId } = useParams();
    const [posts, setPosts] = useState([]);
    const [tagName, setTagName] = useState(''); 

    useEffect(() => {
        getTagById(tagId).then(tag => {
            setTagName(tag.name);
        });

        getPostsByTagId(tagId).then(setPosts);
    }, [tagId, getTagById, getPostsByTagId]); 

    return (
        <Container className="mt-4">
            <h2>Posts with Tag: {tagName}</h2>
            
            <Table striped bordered hover> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Post Title</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default TaggedPostList;
