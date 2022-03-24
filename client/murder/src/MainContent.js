import React, {Component} from "react";
import "./App.css";

import LocationSelector   from "./LocationSelector";
import NPCSelector        from "./NPCSelector";
import PlayerEditor       from "./PlayerEditor";
import DialogOptions      from "./DialogOptions";
import AudioFlags         from "./AudioFlags";

class MainContent extends Component{

    render(){
      console.log("MainContent rendering...");
      let zoneInfo = this.props.gameState.location.getZone(this.props.gameState.location.zone);
      let zoneName = zoneInfo.display ?? "";

      return(
          <div className="MainContent">
            <table className="MainContentTable">
              <tbody>
                <tr>
                  <td className="PlayerDialogPane">{zoneName}<br/>
                  <textarea rows="32" cols="70" placeholder="" 
                            id="playerview" name="playerview" maxLength="1024" 
                            value={this.props.gameState.instext} readOnly />
                  </td>
                  <td className="NPCDialogPane">
                    <DialogOptions    gameState={this.props.gameState} />
                  </td>
                  <td className="MainContentRightPane">
                    <section><table>
                      <tr><td><LocationSelector gameState={this.props.gameState} /></td>
                          <td rowSpan="2"><AudioFlags gameState={this.props.gameState} /></td>
                      </tr>
                      <tr><td><NPCSelector      gameState={this.props.gameState} /></td>
                      </tr>
                    </table></section>
                    <PlayerEditor     gameState={this.props.gameState} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="EnvDialogPane">
                  <textarea rows="8" cols="181" placeholder="Environment Text" 
                            id="envview" name="envview" maxLength="1024" 
                            value={this.props.gameState.envtext} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      );
    }
  }

export default MainContent;