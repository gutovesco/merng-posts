import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import MenuBar from './components/MenuBar'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <Route path="/posts/:postId" component={SinglePost}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
