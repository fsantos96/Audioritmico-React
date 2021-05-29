
  import {
    Link
  } from "react-router-dom";
  import {
    Container,
    Table,
    Row,
    Col,
    Button
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './manager.css';
  import * as apiService from '../../services/apiService';
  const React = require('react');
  const { useEffect, useState} = require('react');

  const ManagerComponent = (props) => {
    const [managerList, setManagerList] = useState([]);
    var deviceId = props.location.search.split("=");
    deviceId = deviceId.length > 1 ? deviceId[1] : null;
 
    useEffect(() => {
      apiService.getManagerList().then((data) => {
        console.log(data)
        if(data.manager && data.manager.length) {
          setManagerList(data.manager)
        }
      })
    }, []);

    const handlerDelete = (id) => {
      apiService.deleteManager(id).then((data) => {
        setManagerList(data.manager)
      })
    }

    return (
      <Container className="mt-5 justify-center">
        <Link to="/">
          <Button variant="primary" type="button">
              Volver
          </Button>
        </Link>
        <h1 className="mt-4">Lista de mail de gerentes</h1>
        <div className="email-add-button">
          <Link to="/manager/form">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512" width="3em"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg>
              </Button>
          </Link>
        </div>
        <Table className="mt-5 table-emails" bordered hover size="md">
          <thead>
            <tr>
              <th className="thead-emails">Emails</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              managerList.map((manager) => {
                return manager.enabled && (
                  <tr>
                    <td>{manager.email}</td>
                    <td>
                      <Row sm={6} md={6} lg={6}>
                        <Col sm={6} md={6} lg={6}>
                          <Link to={`/manager/form?id=${manager.id}`}><Button variant="warning">Editar</Button></Link>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                          <Button onClick={() => handlerDelete(manager.id)} variant="danger">Borrar</Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Container>
    )
  }
  export default ManagerComponent
  