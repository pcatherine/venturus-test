
import React from "react";
// import Sidebar from "./Sidebar";
// import { Link, NavLink } from "react-router-dom";
import FontAwesome from "../Icon/FontAwesome";
import "./layout.scss";



export default class Layout extends React.Component {

  render() {

    return (
      <div id="page-area" >
        <div className="px-5 py-4">
          <h3 className="font-weight-bold"> <FontAwesome icon="question" className="mr-2" />Venturus Sports </h3>
        </div>

        <div className="p-5 light-green">

          <div className="row">
            <div className="col-md-2">
              <div className="row">
                <div className="col-md-4">
                  <FontAwesome icon="puzzle-piece" size="3x" className="mr-2" />
                </div>
                <div className="col-md-6">
                  <span>Sport type</span>
                  <h4 className="font-weight-bold"> Cycling </h4>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="row">
                <div className="col-md-4">
                  <FontAwesome icon="question" size="3x" className="mr-2" />
                </div>
                <div className="col-md-6">
                  <span>Modo</span>
                  <h4 className="font-weight-bold"> Advanced </h4>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="row">
                <div className="col-md-4">
                  <FontAwesome icon="map-signs" size="3x" className="mr-2" />
                </div>
                <div className="col-md-6 pr-0">
                  <span>Route</span>
                  <h4 className="font-weight-bold"> 30 miles </h4>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="container-fluid p-5" >
          {this.props.children}
        </div>
      </div>
    );
  }
}