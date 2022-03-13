import React, {Component} from "react";
import {hot} from "react-hot-loader";

import LoopProcessor from "./LoopProcessor";
import LoopInfo      from "./LoopInfo";
import LocationInfo  from "./LocationInfo";
import GameState     from "./GameState";
import AgentInfo     from "./AgentInfo";

class LoopProcessorTest extends Component{

  constructor(props) {
    super(props);
    this.keyIndex = 0;
    this.loopCount = 0;
    this.loopMax = 1;
    this.gameState = new GameState(props);
    this.loopProc  = new LoopProcessor({name:"Test Processor"});
    this.state = {
        text: "START\n"
    };
    this.loopDelay = 1;
    this.tick = this.tick.bind(this);
  }
  
  componentDidMount(){
    // console.log("MessageMap keys:" + this.keys);
    this.timerId = setInterval( () => this.tick(), this.loopDelay );
  }
  
  componentWillUnmount(){
    clearInterval(this.timerId);
  }

  tick() {
      if(this.loopCount < this.loopMax){
        this.gameState = this.loopProc.processLoop(this.gameState);
        let row = this.gameState.row;
        let loop = this.gameState.loop;
        this.setState((prevState) => ({ text: prevState.text + "env:"  + row.e +
                                                               ", ins:"+ row.i +
                                                               ", out:"+ row.o +
                                                               ", act:"+ row.a +
                                                               ", dly:"+ loop.delay +"\n" }));
        this.loopCount = this.loopCount +1;
      }else{
        this.setState((prevState) => ({ text: prevState.text +'FINISHED\n' }));
        this.componentWillUnmount();
      }
  }

  render(){
    return(
      <div className="LoopProcessorTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}
export default LoopProcessorTest;
