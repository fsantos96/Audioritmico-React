
import {
    Link
  } from "react-router-dom";
  import {
    Container,
    Button,
    Form,
    Row,
    Col,
    Alert,
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './index.css';
  import * as apiService from '../../services/apiService';
  const React = require('react');
  const { useState} = require('react');

  const DeviceComponent = (props) => {
    const [showErrorAckInput, setShowErrorAckInput] = useState(false);
    const [alert, setAlert] = useState(null);
    const [showErrorDoneNotificationInput, setShowErrorDoneNotificationInput] = useState(false);
    const [inputACKValue, setInputACKValue] = useState(20);
    const [inputDoneNotificationValue, setInputDoneNotificationValue] = useState(20);

    const handerClick = () => {
      if(showErrorDoneNotificationInput || showErrorAckInput) {
        return;
      }

      apiService.setDeviceAlertsTimes(inputACKValue, inputDoneNotificationValue).then(() => {
        setAlert({
          type: "success",
          message: "Los datos se guardaron con exito!."
        })
      }).catch((error) => {
        setAlert({
          type: "danger",
          message: "Ocurrio un error al guardar los datos!."
        })
      })
    }

    const handleValueChange = (event) => {
      const value = event.target.value;
      if(event.target.name === "inputAck") {
        setShowErrorAckInput(false);
        if(value > 0) {
          setInputACKValue(value);
        } else {
          setShowErrorAckInput(true)
        }
      } else {
        setShowErrorDoneNotificationInput(false);
        if(value > 0) {
          setInputDoneNotificationValue(value);
        } else {
          setShowErrorDoneNotificationInput(true)
        }
      }
    }

    if(alert) {
      setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
    return (
      <Container>
        { alert && <Alert className="mt-4" variant={alert.type}>
            {alert.message}
          </Alert>
        }
        <Row className="mt-4">
          <Col className="mb-4" sm={12} md={12} lg={12}>
            <Link to="/">
              <Button variant="primary" type="button">
                  Volver
              </Button>
            </Link>
          </Col>
          <Col className="mb-4" sm={12} md={12} lg={12}>
            <h1>Configuracion de Alertas</h1>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <Form>
              <Col sm={12} md={12} lg={12}>
                <Form.Group>
                  <Form.Label>Alerta de ACK</Form.Label>
                  <Form.Control className="device-form-inputs" type="numer" minValue={0} name="inputAck" placeholder="20" onChange={handleValueChange} />
                  <Form.Text className="text-muted">
                    Minutos de tolerancia para notificar la recepcion de una alerta
                  </Form.Text>
                  {
                    showErrorAckInput && (
                    <Form.Text className="text-danger">
                      El valor de este campo debe ser mayor a 0
                    </Form.Text>
                    )
                  }
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group>
                  <Form.Label>Alerta de tarea incompleta</Form.Label>
                  <Form.Control name="inputDoneNotificacion" className="device-form-inputs" type="numer" min={0} placeholder="20" onChange={handleValueChange} />
                  <Form.Text className="text-muted">
                    Minutos de tolerancia para notificar que la tarea aun no fue completada
                  </Form.Text>
                  {
                    showErrorDoneNotificationInput && (
                    <Form.Text className="text-danger">
                      El valor de este campo debe ser mayor a 0
                    </Form.Text>
                    )
                  }
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
              <Button variant="primary" type="button" onClick={handerClick}>
                  Enviar
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
  export default DeviceComponent
  