import {
  Link
} from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Table,
  Jumbotron
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';


const React = require('react');

const HomeComponent = (props) => {
  return (

  <Container>
         <Row className="mt-5">
          <Col sm={3} md={3} lg={3}></Col>
          <Col sm={6} md={6} lg={6}>
            {/* row que se repite */}
            <Row className="mb-2">
              
            <Table className="mt-5 table-color" bordered hover size="md"> 
            <tr>
            <thead>
            <tr>
              <th className="thead-color">Color</th>
              <th>Frecuencia</th>
            </tr>
          </thead>

                    <td>
                      <Row sm={6} md={6} lg={6}>
                        <Col sm={6} md={6} lg={6}>
                          <Button variant="warning">Editar</Button>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                          <Button variant="danger">Borrar</Button>
                        </Col>
                      </Row>
                    </td>
            </tr>
            </Table> 

              <Col sm={4} md={4} lg={4}>
                Rojo
              </Col>
              <Col sm={4} md={4} lg={4}>
                63Hz
              </Col>
              <Col sm={4} md={4} lg={4}>
              <Button variant="primary mt-4" type="button">
              Editar
              </Button> 
              <Button variant="danger mt-4" type="button">
              Borrar
              </Button>

              </Col>  
            </Row>
            
            
            
          </Col>
          <Col sm={3} md={3} lg={3}></Col>
         </Row>
         <Row className="justify-content-center home-container">
          <Col sm={3} md={3} lg={3}></Col>
          <Col sm={6} md={6} lg={6}>
              <Form>
                <Row>
                  <Col sm={4} md={4} lg={4}>
                    <Form.Group>
                      <Form.Label>Color</Form.Label>
                      <Form.Control as="select" size="md">
                          <option value="0" selected >Rojo</option>
                          <option value="1">Azul</option>
                          <option value="2">Verde</option>
                          <option value="3">Blanco</option>
                          <option value="4">Cyan</option>
                          <option value="5">Amarillo</option>
                          <option value="6">Magenta</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Form.Group>
                      <Form.Label>Frecuencia</Form.Label>
                      <Form.Control as="select" size="md">
                          <option value="0" selected >0 - 31</option>
                          <option value="1">31</option>
                          <option value="2">63</option>
                          <option value="3">125</option>
                          <option value="4">250</option>
                          <option value="5">500</option>
                          <option value="6">1000</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="success mt-4" type="button">
                    Agregar
                    </Button>
                </Col>
                </Row>
              </Form>
            </Col> 
            <Col sm={3} md={3} lg={3}></Col>
         </Row>
       </Container>
       
  )
}
export default HomeComponent
