import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    return (
        <div>
            {data !== undefined && data.getPosts !== undefined ?
                <>
                    <Grid columns={3}>
                        <Grid.Row>
                            <h1 style={{ display: 'flex', alignSelf: 'center', fontSize: '2rem', marginLeft: 15, marginTop: 20 }}>Recent posts</h1>
                        </Grid.Row>
                        <Grid.Row>
                            {user && (
                                <Grid.Column>
                                    <PostForm />
                                </Grid.Column>
                            )}
                            {loading ? <div>Loading...</div> :
                                <Transition.Group>
                                    {data.getPosts && data.getPosts.map(post => (
                                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                            <PostCard post={post} />
                                        </Grid.Column>
                                    ))}
                                </Transition.Group>
                            }
                        </Grid.Row>
                    </Grid>
                </> : <div>nada</div>}
        </div>
    )
}

export default Home;
