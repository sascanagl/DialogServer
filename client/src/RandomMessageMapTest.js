import React, {Component} from "react";
import RandomMessageMap from "./RandomMessageMap.js";

class RandomMessageMapTest extends Component{

  constructor(props) {
    super(props);
    this.gameState = { player: {}, location:{}, loop:{} };
    this.tick = this.tick.bind(this);
    this.testRandomMessageKeys = this.testRandomMessageKeys.bind(this);
    this.testRandomMessage = this.testRandomMessage.bind(this);
    this.state = {
      loopCount: 0,
      loopMax: 15,
      text: "Loading...\n",
      loopDelay: 25,
      error: null,
      errCount: 0,
      randomMessageKeysRun: false,
      randomMessageRun: false,
      randomMessageKeysDone: false,
      randomMessageDone: false,
      testComplete: false,
      randomMessageKeys: [],
      randomMessage: ""
    };
  }

  componentDidMount(){
  this.timerId = setInterval(
      () => this.tick(), 
      this.state.loopDelay
    );
  }

  componentWillUnmount(){
      clearInterval(this.timerId);
  }

  testRandomMessageKeys(){
    this.setState({ randomMessageKeysRun: true });
    console.log("Testing getRandomMessageKeys...");
    RandomMessageMap.getRandomMessageKeys()
    .then( response => {
      console.log("getRandomMessageKeys returned...");
      if( (!response.count) || (response.count < 1)){
        this.setState({ randomMessageKeysDone: true, text: this.state.text + "No Random Message Keys returned", errCount: this.state.errCount +1 });
        this.forceUpdate();
      }else{
        this.setState({ randomMessageKeysDone: true, randomMessageKeys: response.keys, text: this.state.text + "\nRandom Message Keys:\n"+ response.keys +"\n"});
        this.forceUpdate();
      }
    })
    .catch(err => {
      console.log("getRandomMessageKeys returned with error...");
      this.setState({ randomMessageKeysDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount +1 });
      this.forceUpdate();
    });
  }

  testRandomMessage(){
    this.setState({ randomMessageRun: true });
    console.log("Testing getRandomMessage...");
    RandomMessageMap.getRandomMessage("unknown", this.gameState)
    .then( response => {
        console.log("getRandomMessage returned...");
        if(!response.key){
          this.setState({ randomMessageDone: true, text: this.state.text + "\nNo Random Message returned", errCount: this.state.errCount +1 });
          this.forceUpdate();
        }else{
          this.setState({ randomMessageDone: true, randomMessage: response.message, text: this.state.text + "\nRandom Message: "+ response.message +"\n"});
          this.forceUpdate();
        }
    })
    .catch(err => {
        console.log("getRandomMessage returned with error...");
        this.setState({ randomMessageDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount+1 });
        this.forceUpdate();
    });
  }

  tick() {
    if( !(this.state.randomMessageKeysRun === true) ) { this.testRandomMessageKeys(); }
    if( !(this.state.randomMessageRun === true) )  { this.testRandomMessage(); }// might be there, might not. Should still get a 200 response.
    this.setState({testComplete: (this.state.randomMessageDone === true && this.state.randomMessageKeysDone === true )})
    if(this.state.testComplete === true){
      console.log("Stopping loop... "+ this.state.errCount + " errors");
      this.setState({text: this.state.text +"\nTesting Complete with "+ this.state.errCount + " errors"});
      clearInterval(this.timerId);
    }else{
      this.setState({text: this.state.text +".", loopCount: this.state.loopCount +1 });
      if(this.state.loopCount > this.state.loopMax){
        this.setState({errCount: this.state.errCount +1});
        this.setState({text: this.state.text +"\nTest failed with Timeout and "+ this.state.errCount +" errors"});
        clearInterval(this.timerId);
      }
    }
    this.forceUpdate();
  }

  render(){
    return(
      <div className="RandomMessageMapTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default RandomMessageMapTest;