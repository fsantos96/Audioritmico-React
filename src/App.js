import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Navbar, Jumbotron} from 'react-bootstrap';
import HomeComponent from './components/home/home';
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
        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href="">
            <img
              alt=""
              src="/logo-site.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Lighting Waves
          </Navbar.Brand>
        </Navbar>
        <Jumbotron>
        <Container>
          <Row>
            <p>Seleccion de colores por frecuencia</p>
            <Router>
              <Switch>
                <Route path='/' exact render={(props=> <HomeComponent {...props} />)}></Route>
              </Switch>
            </Router>
          </Row>
        </Container>
        </Jumbotron>
      </>
    );
  }
    
}

export default App;
