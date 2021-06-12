
  import {
    Button,
    Form,
    Row,
    Col
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../home/home.css';
  
  
  const React = require('react');
  const ConfigForm = (props) => {
    const { 
        colorDefault, 
        colors,
        ranges,
        configEdit,
        rangeDefault,
        selectAction,
        sendAction,
        editAction,
        cancelAction,
    } = props;

    return (
        <Form>
            <Row>
            <Col sm={4} md={4} lg={4}>
                <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Control as="select" size="md" defaultValue={configEdit ? configEdit.color : 0 } onChange={event => selectAction(event, 'color', configEdit !== null)}>
                {
                    configEdit && <option value={configEdit.color} selected >{configEdit.colorText}</option>
                }
                {
                    colors.map((color, index) => {
                        if(!configEdit && index == 0) {
                            console.log("entre-color");
                            console.log(configEdit);
                        return <option value={color.idColor} selected >{color.text}</option>
                        }

                        return <option value={color.idColor}>{color.text}</option>
                    })
                }
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={4} md={4} lg={4}>
                <Form.Group>
                <Form.Label>Frecuencia</Form.Label>
                <Form.Control as="select" size="md" defaultValue={configEdit ? configEdit.rangeType : 0 } onChange={event => selectAction(event, 'range', configEdit !== null)}>
                    {
                        configEdit && <option value={configEdit.rangeType} selected >{configEdit.rangeText}</option>
                    }
                    {
                    ranges.map((option, index) => {
                        if(!configEdit && index==0) {
                            console.log("entre-rangeo");
                            console.log(configEdit);
                            return <option value={option.idRange} selected>{option.text}</option>
                        }
                        return <option value={option.idRange}>{option.text}</option>
                    })
                    } 
                </Form.Control>
                </Form.Group>
            </Col>
            {
                configEdit ? (
                    <Col sm={4} md={4} lg={4} className="buttons-edit-container">
                        <Button className="mr-2" onClick={() => editAction()} variant="success" type="button">
                            Guardar
                        </Button>
                        <Button onClick={cancelAction} variant="danger" type="button">
                            cancelar
                        </Button>
                   </Col>
                ) : (
                    <Col sm={4} md={4} lg={4}>
                        <Button disabled={ !colors.length || !ranges.length} onClick={sendAction} variant="success add-button" type="button">
                            Agregar
                        </Button>
                    </Col>
                )
            }
            
            </Row>
        </Form>
    )
  }
  export default ConfigForm
  