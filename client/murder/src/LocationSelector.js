import React, {Component} from "react";
import "./App.css";

class LocationSelector extends Component{
    
    constructor(props){
      super(props);
      this.composeOptions =this.composeOptions.bind(this);
    }

    composeOptions(zoneId){
        let zs = [];
        zs.push({id:"none", display:""});
        let adjacents = this.props.gameState.location.getZone(zoneId).adjacents;
        adjacents.forEach((zid, index, array ) =>{
            let zone = this.props.gameState.location.getZone(zid);
            if(zone != null) zs.push(zone);
        });
        return zs.map((item) => <option key={item.id} value={item.id}>{item.display}</option>);
    }
  
    render(){
      console.log("LocationSelector rendering...");
      //let worldOptions = this.composeOptions(worlds);
      let zoneOptions  = this.composeOptions(this.props.gameState.location.zone); //zone = zoneId only

      return(
        //<section className="LocationSelector">
          <table className="LocationSelectorTable">
            <thead className="LocationSelectorHeader">
            <tr>
            <th>Move To</th></tr>
            </thead>
            <tbody className="LocationSelectorContent">
              <tr>
                <td><select value={this.props.gameState.location.zone} id="zone" name="zone" size="1"
                     onChange={(evt) => {this.props.gameState.location.locHandler(evt)}} >
                     {zoneOptions}
                </select></td>
              </tr>
            </tbody>
          </table>
        //</section>
      );
    }
  }
  export default LocationSelector;