import React, {Component} from "react";
import "./App.css";

class AudioFlags extends Component{
    
    constructor(props){
        super(props);
        this.narrate = props.narrate ?? true;
        this.environ = props.environ ?? true;
        this.atmos   = props.atmos   ?? true;
    }

    render(){
      console.log("AudioFlags rendering...");
      return(
          <table className="AudioFlagsTable">
            <thead className="AudioFlagsHeader">
            <tr><th>Audio</th></tr>
            </thead>
            <tbody className="AudioFlagsContent">
              <tr>
                <td><input type="checkbox" checked={this.props.gameState.audioFlags.narrate} 
                                           id="narrate" name="narrate" 
                                           onChange={(evt) => {this.props.gameState.audioHandler(evt)}} >
                </input><label for="narrate">Narrate</label>
                <audio id="voice_narrate" name="voice_narrate" autoPlay></audio>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" checked={this.props.gameState.audioFlags.environ} 
                                           id="environ" name="environ" 
                                           onChange={(evt) => {this.props.gameState.audioHandler(evt)}} >
                </input><label for="environ">Environ</label>
                <audio id="voice_environ" name="voice_environ" autoPlay></audio>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" checked={this.props.gameState.audioFlags.atmos} 
                                           id="atmos" name="atmos" 
                                           onChange={(evt) => {this.props.gameState.audioHandler(evt)}} >
                </input><label for="atmos">Atmos</label>
                <audio id="voice_atmos" name="voice_atmos" autoPlay></audio>
                </td>
              </tr>
            </tbody>
          </table>
      );
    }
  }    
  export default AudioFlags;