import React from 'react';
import './Todo.css'
import {FaFilter} from 'react-icons/fa'
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleSwitch from "./ToggleSwitch";



export default function Todo(props) {






  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);
      

  return <div>
    <Container classname="header">
      <Row>
        <Col sm={5}></Col>
        <Col sm={3}>
          <div classsname="header"><h2>T0-DO</h2></div> 
      </Col>
      <Col sm={4}></Col>
     
      
      </Row> 
      <ColoredLine color="red" />
      
     
   <Row>
     <Col sm={3}></Col>
     <Col sm={4} >TODAY  </Col>
     <Col><FaFilter></FaFilter> Filters </Col>
     

   </Row>
   <ColoredLine color="red" />  
<Row>
<Col sm={3}></Col>
     <Col sm={4} >Task 1 {props.event} </Col>
     <Col><ToggleSwitch label="Mark as Done task 1" /> </Col>
 
</Row>
<ColoredLine color="red" /> 
<Row>
<Col sm={3}></Col>
     <Col sm={4} >Task 2 </Col>
     <Col><ToggleSwitch label="Mark as Done task 2" /> </Col>
 
</Row>
<ColoredLine color="red" /> 
<Row>
<Col sm={3}></Col>
     <Col sm={4} >Task 3 </Col>
     <Col><ToggleSwitch label="Mark as Done task3" /> </Col>
 
</Row>
<ColoredLine color="red" /> 


     
        {/* <ToggleSwitch label="Subscribe" /> */}
  
        </Container> 

  </div>;
}
