// import React from 'react';
// import './Todo.css'
// import {FaFilter} from 'react-icons/fa'
// import Container from 'react-bootstrap/Container';
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import ToggleSwitch from "./ToggleSwitch";



// export default function Todo(props) {






//   const ColoredLine = ({ color }) => (
//     <hr
//         style={{
//             color: color,
//             backgroundColor: color,
//             height: 1
//         }}
//     />
// );
      

//   return <div>
//     <Container classname="header">
//       <Row>
//         <Col sm={5}></Col>
//         <Col sm={3}>
//           <div classsname="header"><h2>T0-DO</h2></div> 
//       </Col>
//       <Col sm={4}></Col>
     
      
//       </Row> 
//       <ColoredLine color="red" />
      
     
//    <Row>
//      <Col sm={3}></Col>
//      <Col sm={4} >TODAY  </Col>
//      <Col><FaFilter></FaFilter> Filters </Col>
     

//    </Row>
//    <ColoredLine color="red" />  
// <Row>
// <Col sm={3}></Col>
//      <Col sm={4} >Task 1 {props.event} </Col>
//      <Col><ToggleSwitch label="Mark as Done task 1" /> </Col>
 
// </Row>
// <ColoredLine color="red" /> 
// <Row>
// <Col sm={3}></Col>
//      <Col sm={4} >Task 2 </Col>
//      <Col><ToggleSwitch label="Mark as Done task 2" /> </Col>
 
// </Row>
// <ColoredLine color="red" /> 
// <Row>
// <Col sm={3}></Col>
//      <Col sm={4} >Task 3 </Col>
//      <Col><ToggleSwitch label="Mark as Done task3" /> </Col>
 
// </Row>
// <ColoredLine color="red" /> 


     
//         {/* <ToggleSwitch label="Subscribe" /> */}
  
//         </Container> 

//   </div>;
// }

// import React, { Component } from 'react'
// import { isTemplateExpression, isTemplateSpan } from 'typescript';

//  class Todo extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//       event:{},
//        isloaded:false
//     }
//   }
//   componentDidMount(){
//     fetch('https://graph.microsoft.com/v1.0/me/events')

//     .then(res=>res.json())
//     .then(json=>{
//       this.setState({
//         isloaded:true,
//         event:json,
//       })

//     });
//   }
//   render() {
//     var {isloaded,event}=this.state;
//     if(!isloaded){
//      return <div>loading</div>
//     }
//     else{
//       return(
//         <div>
//           <ul>
//             {event.map(event=>(
//               <li key={event.id}></li>
//             )
//               )}
//           </ul>
//         </div>

//       )
//     }
//   }
// }
  

  


// export default Todo;
import React, { useEffect, useState } from "react";
import "./Todo.css";
import { FaFilter } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleSwitch from "./ToggleSwitch";
import { findIana } from "windows-iana";
import { useAppContext } from "../AppContext";
import { getUserWeekCalendar } from "../GraphService";
import { Event } from "microsoft-graph";

export default function Todo(props: any) {
  const app = useAppContext();
  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const loadEvents = async () => {
      if (app.user && !events) {
        try {
          const ianaTimeZones = findIana(app.user?.timeZone!);
          const events = await getUserWeekCalendar(
            app.authProvider!,
            ianaTimeZones[0].valueOf()
          );
          setEvents(events);
        } catch (err) {
          app.displayError!(err.message);
        }
      }
    };

    loadEvents();
  }, [app]);

  const ColoredLine = ({ color }: any) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  console.log(events);

  return (
    <div>
      <Container className="header">
        <Row>
          <Col sm={5}></Col>
          <Col sm={3}>
            <div className="header">
              <h2>T0-DO</h2>
            </div>
          </Col>
          <Col sm={4}></Col>
        </Row>
        <ColoredLine color="red" />

        <Row>
          <Col sm={3}></Col>
          <Col sm={4}>TODAY </Col>
          <Col>
            <FaFilter></FaFilter> Filters
          </Col>

          {events?.length &&
            events?.map((item, index) => (
              <div key={index}>
                <ColoredLine color="red" />
                <Row>
                  <Col sm={3}></Col>
                  <Col sm={4}>
                    {index + 1} : {item?.subject} - Date :
                    {item?.start?.dateTime?.toString().substring(0, 10)}
                  </Col>
                  <Col>
                    <ToggleSwitch label={`Mark as Done task ${index + 1}`} />
                  </Col>
                </Row>
              </div>
            ))}
        </Row>

        {/* <ToggleSwitch label="Subscribe" /> */}
      </Container>
    </div>
  );
}