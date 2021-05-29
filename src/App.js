import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Navbar} from 'react-bootstrap';
import HomeComponent from './components/home/home';
import ManagerComponent from './components/manager';
import DeviceComponent from './components/device';
import ManagerForm from './components/manager-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    } 
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">
            <img
              alt=""
              src="/logo-site.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Clean Hands
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Router>
              <Switch>
                <Route path='/' exact render={(props=> <HomeComponent {...props} />)}></Route>
              </Switch>
            </Router>
          </Row>
        </Container>
      </>
    );
  }
    
}

export default App;
