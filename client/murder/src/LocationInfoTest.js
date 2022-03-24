import React, {Component} from "react";
import {hot} from "react-hot-loader";
import LocationInfo, {worldInfo as worlds, zoneInfo as zones} from "./LocationInfo";

class LocationInfoTest extends Component{

  constructor(props) {
    super(props);
    this.keyIndex = 0;
    this.loopCount = 0;
    this.loopMax = 1;
    this.state = {
        text: "START\n"
    };
    this.loopDelay = 10;
    this.tick = this.tick.bind(this);
  }
  
  componentDidMount(){
    this.keyMax = zones.length;
    this.timerId = setInterval(
      () => this.tick(), 
      this.loopDelay
    );
  }
  componentWillUnmount(){
      clearInterval(this.timerId);
  }

  tick() {
      if(this.loopCount < this.loopMax){
        let zone = zones[this.keyIndex];
        let value = LocationInfo.toString(zone);
        this.setState((prevState) => ({text: prevState.text + value +",\n"}));
        this.loopCount = this.loopCount +1;
      }else{
        this.loopCount = 0;
        this.keyIndex = this.keyIndex +1;
        if(this.keyIndex < this.keyMax){
          this.setState((prevState) => ({text: prevState.text +'\n'}));
        }else{
          this.setState((prevState) => ({text: prevState.text +'\nFINISHED\n'}));
          this.componentWillUnmount();
        }
      }
  }

  render(){
    return(
      <div className="LocationInfoTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default LocationInfoTest;
