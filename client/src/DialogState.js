import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

class DialogState extends Component{

    constructor(props) {
      super(props);
    }

    render(){
      console.log("DialogState rendering...");
      return(
          <div className="DialogState">
              <table className="DialogStateTable">
              <thead className="DialogStateHeader">
              <tr><th>World</th><th>Zone</th><th>NPC</th><th>Trigger</th><th>NxTrigger</th><th>Delay</th><th>RESET</th></tr>
              </thead>
              <tbody className="DialogStateContent">
              <tr><td>{this.props.gameState.location.world}</td><td>{this.props.gameState.location.zone}</td><td>{this.props.gameState.location.npc}</td>
                  <td>{this.props.gameState.loop.trigger}</td><td>{this.props.gameState.loop.nxtrigger}</td><td>{this.props.gameState.loop.delay}</td>
                  <td><button type="button" value="Reset Game" onClick={(evt) => {this.props.gameState.resetHandler(evt)}}>Reset Game</button></td>
              </tr>
              </tbody>
              </table>
          </div>
      );
    }
  }

export default DialogState;