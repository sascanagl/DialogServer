import React, {Component} from "react";
import "./App.css";

class NPCSelector extends Component{

    constructor(props){
      super(props);
      this.composeOptions = this.composeOptions.bind(this);
    }

    composeOptions(zoneId){
        let ns = [{id:"none", display:""}];
        let ns2 = this.props.gameState.location.getZone(zoneId).npcs;
        let npcs = ns.concat(ns2);
        return npcs.map((item) => <option key={item.id} value={item.id}>{item.display}</option>);
    }
  
    render(){
      console.log("NPCSelector rendering...");
      let npcOptions = this.composeOptions(this.props.gameState.location.zone); //zone = zoneId only
      return(
        //<section className="NPCSelector">
          <table className="NPCSelectorTable">
            <thead className="NPCSelectorHeader">
            <tr><th>Talk To</th></tr>
            </thead>
            <tbody className="NPCSelectorContent">
            <tr>
              <td><select value={this.props.gameState.location.npc} id="npc" name="npc" size="1"
                    onChange={(evt) => {this.props.gameState.location.npcHandler(evt)}} >
                    {npcOptions}
              </select></td>
            </tr>
            </tbody>
          </table>
        //</section>
      );
    }
  }

export default NPCSelector;