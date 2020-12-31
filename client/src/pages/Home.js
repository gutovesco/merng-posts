import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    return (
        <div>
            {data !== undefined && data.getPosts !== undefined ?
                <>
                    <Grid columns={3}>
                        <Grid.Row>
                            <h1 style={{display: 'flex', alignSelf: 'center', fontSize: '2rem', marginLeft: 15, marginTop: 20}}>Recent posts</h1>
                        </Grid.Row>
                        <Grid.Row>
                            {loading ? <div>Loading...</div> :
                                data.getPosts && data.getPosts.map(post => (
                                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Grid.Row>
                    </Grid>
                </> : <div>nada</div>}
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
 {
    getPosts{
     id 
     body 
     createdAt 
     username 
     likeCount
     likes{
        username
     }
     commentCount
     comments{
        id username createdAt body
     }
 }
 }
`

export default Home;
