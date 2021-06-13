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
import * as apiService from '../../services/apiService';
import ConfigForm from '../ConfigForm';

const React = require('react');
const { useEffect, useState} = require('react');
const colors = [
  { idColor: 0, text: 'Rojo'},
  { idColor: 1, text: 'Azul'},
  { idColor: 2, text: 'Verde'},
  { idColor: 3, text: 'Blanco'},
  { idColor: 4, text: 'Cyan'},
  { idColor: 5, text: 'Amarillo'},
  { idColor: 6, text: 'Magenta'}
]
const ranges = [
  { idRange: 0, text: '0 - 31', min: 0, max: 31},
  { idRange: 1, text: '32 - 63', min: 32, max: 63},
  { idRange: 2, text: '64 - 125', min: 64, max: 125},
  { idRange: 3, text: '126 - 250', min: 126, max: 250},
  { idRange: 4, text: '251 - 500', min: 251, max: 500},
  { idRange: 5, text: '501 - 1000', min: 501, max: 1000}
]
var colorSelected = null;
var rangeSelected = null;

const HomeComponent = (props) => {
  const [listConfigurations, setListConfigurations] = useState([])
  const [configEdit, setConfigEdit] = useState(null)
  const getColorsAvailables = () => {
    return colors.filter((color) => {
      const isUsed = listConfigurations.find(config => config.color == color.idColor);
      return !isUsed;
    })
  };

  const getRangessAvailables = () => {
    return ranges.filter((range, index) => {
      const isUsed = listConfigurations.find(config => config.rangeType == range.idRange);
      return !isUsed;
    })
  };
  
  const getConfigFormated = (data) => {
    // esta funcion le agrega la propiedad edit a cada configuracion para saber si esta editando o no
    var listFormated = data.configurations.map(item => {
      return { ...item, edit: false }
    })

    return listFormated;
  }

  const deleteConfig = (id) => {
    apiService.deleteConfiguration(id).then(data => {
      setListConfigurations(data.configurations);
    })
  }

  const handlerSelected = (event, select, isEdit) => {
    if(!isEdit) {
      if(select == 'color') {
        colorSelected = event.target.value;
      } else {
        rangeSelected = event.target.value
      }
    } else {
      const value = {};
      value[select == 'color' ? 'color' : 'rangeType'] = event.target.value;
      const configEdited = {
        ...configEdit,
        ...value 
      }

      setConfigEdit(configEdited)
    }
  }

  const saveConfig = () => {
    apiService.saveConfig(colorSelected, rangeSelected, {min: ranges[rangeSelected].min,  max:ranges[rangeSelected].max}).then(data => {
      setListConfigurations(getConfigFormated(data));
    })
  }

  const disabledEditMode = () => {
    return listConfigurations.map(config => {
      config.edit = false;
      return config;
    });
  }

  const handlerEditButton = (id) => {
    // se obtiene el indice de la configuracion a editar
    const index = listConfigurations.findIndex( config => config.id == id);
    // se reinicia el modo edicion para todas las configuraciones
    var configutations = disabledEditMode();
    //se pasa a modo edicion el item elegido
    configutations[index].edit = true;
    // se actualiza la variable de estaddo que maneja el item a editar.
    setConfigEdit({
      ...configutations[index], 
      colorText: colors[configutations[index].color].text,
      rangeText: ranges[configutations[index].rangeType].text,
    });
    // actualiza la lista de la tabla, con removiendo al elemento que se este actualizando.
    setListConfigurations(configutations);
  }

  const editConfig = () => {
    console.log(configEdit)
    const index = listConfigurations.findIndex( config => config.id == configEdit.id);
    if(listConfigurations[index].color == configEdit.color && listConfigurations[index].rangeType == configEdit.rangeType) {
      setConfigEdit(null);
      setListConfigurations(disabledEditMode());
      return;
    }
    
    apiService.editConfig({
      id: configEdit.id,
      color: configEdit.color,
      rangeType: configEdit.rangeType,
      range: {
        min: ranges[configEdit.rangeType].min,
        max: ranges[configEdit.rangeType].max,
      }
    }).then(data => {
      setConfigEdit(null);
      setListConfigurations(getConfigFormated(data));
    })
  }

  const cancelEdit = () => {
    setConfigEdit(null);
    setListConfigurations(disabledEditMode());
  }

  const colorsAvailable = getColorsAvailables();
  const rangesAvailables = getRangessAvailables();
  if(rangesAvailables[0] && colorsAvailable[0]) {
    colorSelected = colorsAvailable[0].idColor;
    rangeSelected = rangesAvailables[0].idRange;
  }

  // el useEffect, recibe 2 params, el primero es la funcion que se ejecuta
  // y el segundo indica 3 cosas
  // 1- si no esta se ejecuta siempre que haya render
  // 2- si esta pero es una array vacio se ejecuta unicamente un vez
  // 3- es que este y el array tenga una variable, en este el useEffect se ejecuta cada vez que se altere esa variable

  useEffect(() => {
    apiService.getAllConfigurations().then(data => {
      setListConfigurations(getConfigFormated(data));
    })
  })

  return (

  <Container>
         <Row className="justify-content-center home-container">
          <Col sm={3} md={3} lg={3}></Col>
          <Col sm={6} md={6} lg={6}>
              <ConfigForm
                colorDefault={colorSelected}
                rangeDefault={rangeSelected}
                colors={colorsAvailable}
                ranges={rangesAvailables}
                selectAction={handlerSelected}
                sendAction={saveConfig}
              />
            </Col> 
            <Col sm={3} md={3} lg={3}></Col>
         </Row>
         <Row>
          <Col sm={2} md={2} lg={2}></Col>
          <Col sm={8} md={8} lg={8}>
            {
              configEdit && (
                <Row className="mb-2">
                  <ConfigForm
                    configEdit={configEdit}
                    colors={colorsAvailable}
                    ranges={rangesAvailables}
                    selectAction={handlerSelected}
                    editAction={editConfig}
                    cancelAction={cancelEdit}
                  />
                </Row>
              )
            }
            <Row className="mb-2">
            {
              listConfigurations.length > 0 && <Table className="table-color" bordered hover size="md"> 
                <thead>
                  <tr>
                    <th className="thead-color">Color</th>
                    <th>Frecuencia</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listConfigurations.map(config => !config.edit && (
                      <tr>
                        <td>{colors[config.color].text}</td>
                        <td>{ranges[config.rangeType].text}</td>
                        <td> 
                          <Row sm={6} md={6} lg={6}>
                            <Col sm={6} md={6} lg={6}>
                              <Button variant="warning" onClick={() => handlerEditButton(config.id)}>Editar</Button>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                              <Button onClick={() => deleteConfig(config.id)} variant="danger">Borrar</Button>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            }
            </Row>
          </Col>
          <Col sm={2} md={2} lg={2}></Col>
         </Row>
       </Container>
       
  )
}
export default HomeComponent
