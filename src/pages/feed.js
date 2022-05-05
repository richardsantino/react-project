import React from 'react';
import Layout from '../components/shared/Layouts';
import Post from '../components/feed/Post';

import { UserContext } from '../auth';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/post/query'

export default function FeedPage(){
    const { loading, error, data} = useQuery(GET_POSTS);
    const { currentUser } = React.useContext(UserContext);

    console.log(data);

    return (
        <>
            { loading && <h1>Carregando...</h1>}
            { !loading &&
                <Layout>
                <div className="row">
                    <div className="col-10 mx-auto">
                        { data.post.map((post) => <Post key={post.id} post={post} />) }
                    </div>
                </div>
            </Layout>
            }
        </>
    );
    
        
}