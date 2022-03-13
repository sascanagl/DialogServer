import React, {Component} from "react";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import AgentInfo from "./AgentInfo";

let raceOptions     = [];
let genderOptions   = [];
let skinOptions     = [];
let eyeOptions      = [];
let hairOptions     = [];
let clothOptions    = [];
let heightOptions   = [];
let weightOptions   = [];
let cleanOptions    = [];
let beautyOptions   = [];
let strengthOptions = [];

class PlayerEditor extends Component{

  constructor(props){
    super(props);
    this.composeOptions =this.composeOptions.bind(this);
  }

  composeOptions(mapItems){
    return Array.from(mapItems).map((item) => <option key={item.id} value={item.id}>{item.text}</option>);
  }

  static logIt( msg ){ /*console.log( "PlayerEditor: "+ msg ); */ }

  render(){
    PlayerEditor.logIt( "rendering player options...");
    if (raceOptions.length == 0){
      raceOptions     = this.composeOptions(AgentInfo.getOptionsFor("race"));
      genderOptions   = this.composeOptions(AgentInfo.getOptionsFor("gender"));
      skinOptions     = this.composeOptions(AgentInfo.getOptionsFor("skin"));
      eyeOptions      = this.composeOptions(AgentInfo.getOptionsFor("eye"));
      hairOptions     = this.composeOptions(AgentInfo.getOptionsFor("hair"));
      clothOptions    = this.composeOptions(AgentInfo.getOptionsFor("cloth"));
      heightOptions   = this.composeOptions(AgentInfo.getOptionsFor("height"));
      weightOptions   = this.composeOptions(AgentInfo.getOptionsFor("weight"));
      cleanOptions    = this.composeOptions(AgentInfo.getOptionsFor("clean"));
      beautyOptions   = this.composeOptions(AgentInfo.getOptionsFor("beauty"));
      strengthOptions = this.composeOptions(AgentInfo.getOptionsFor("strength"));
    }

    return(
      <table className="PlayerProfileTable">
          <thead className="PlayerProfileHeader">
              <tr><th colSpan="2">Player Profile</th></tr>
          </thead>
          <tbody className="PlayerProfileContent">
          <tr><td><label htmlFor="uid">UID: </label></td>
          <td><input type="number" id="uid" name="uid" placeholder="Integer" size="20" 
                     min="0" step="1" value={this.props.gameState.player.uid} 
                     onChange={(evt) => {this.props.gameState.player.handler(evt)}}  /></td></tr>
          <tr><td><label htmlFor="firstName">First Name: </label></td>
          <td><input type="text" id="firstName" name="firstName" placeholder="First Name" size="20" 
                     autoComplete="off" value={this.props.gameState.player.firstName} 
                     onChange={(evt) => {this.props.gameState.player.handler(evt)}} /></td></tr>
          <tr><td><label htmlFor="lastName">Last Name: </label></td>
          <td><input type="text" id="lastName" name="lastName" placeholder="Last Name" size="20" 
                     autoComplete="off" value={this.props.gameState.player.lastName} 
                     onChange={(evt) => {this.props.gameState.player.handler(evt)}} /></td></tr>
          <tr><td><label htmlFor="age">Age: </label></td>
          <td><input type="number" id="age" name="age" placeholder="Integer" size="3" 
                     min="18" max="99" step="1" value={this.props.gameState.player.age} 
                     onChange={(evt) => {this.props.gameState.player.handler(evt)}} /></td></tr>
          <tr><td><label htmlFor="gender">Gender: </label></td>
          <td><select value={this.props.gameState.player.gender} id="gender" name="gender" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {genderOptions}
          </select></td></tr>
          <tr><td><label htmlFor="race">Race: </label></td>
          <td><select value={this.props.gameState.player.race} id="race" name="race" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {raceOptions}
          </select></td></tr>
          <tr><td><label htmlFor="skin">Skin: </label></td>
          <td><select value={this.props.gameState.player.skin} id="skin" name="skin" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {skinOptions}
          </select></td></tr>
          <tr><td><label htmlFor="eyes">Eyes: </label></td>
          <td><select value={this.props.gameState.player.eyes} id="eyes" name="eyes" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {eyeOptions}
          </select></td></tr>
          <tr><td><label htmlFor="hair">Hair: </label></td>
          <td><select value={this.props.gameState.player.hair} id="hair" name="hair" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {hairOptions}
          </select></td></tr>
          <tr><td><label htmlFor="cloth">Cloth: </label></td>
          <td><select value={this.props.gameState.player.cloth} id="cloth" name="cloth" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {clothOptions}
          </select></td></tr>
          <tr><td><label htmlFor="height">Height: </label></td>
          <td><select value={this.props.gameState.player.height} id="height" name="height" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {heightOptions}
          </select></td></tr>
          <tr><td><label htmlFor="weight">Weight: </label></td>
          <td><select value={this.props.gameState.player.weight} id="weight" name="weight" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {weightOptions}
          </select></td></tr>
          <tr><td><label htmlFor="cleanliness">Cleanliness: </label></td>
          <td><select value={this.props.gameState.player.cleanliness} id="cleanliness" name="cleanliness" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {cleanOptions}
          </select></td></tr>
          <tr><td><label htmlFor="beauty">Beauty: </label></td>
          <td><select value={this.props.gameState.player.beauty} id="beauty" name="beauty" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {beautyOptions}
          </select></td></tr>
          <tr><td><label htmlFor="strength">Strength: </label></td>
          <td><select value={this.props.gameState.player.strength} id="strength" name="strength" size="1" 
                      onChange={(evt) => {this.props.gameState.player.handler(evt)}} >
                {strengthOptions}
          </select></td></tr>
          </tbody>
      </table>
    );
  }
}

export default PlayerEditor;