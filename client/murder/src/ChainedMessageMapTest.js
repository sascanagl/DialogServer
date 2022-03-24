import React, {Component} from "react";
import ChainedMessageMap from "./ChainedMessageMap.js";

class ChainedMessageMapTest extends Component{

  constructor(props) {
    super(props);
    this.gameState = { player: {}, location:{}, loop:{} };
    this.tick = this.tick.bind(this);
    this.testChainedMessageKeys = this.testChainedMessageKeys.bind(this);
    this.testChainedMessage = this.testChainedMessage.bind(this);
    this.state = {
      loopCount: 0,
      loopMax: 15,
      text: "Loading...\n",
      loopDelay: 25,
      error: null,
      errCount: 0,
      chainedMessageKeysRun: false,
      chainedMessageRun: false,
      chainedNLMessageRun: false,
      chainedMessageKeysDone: false,
      chainedMessageDone: false,
      chainedNLMessageDone: false,
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

  testChainedMessageKeys(){
    this.setState({ chainedMessageKeysRun: true });
    console.log("Testing getChainedMessageKeys...");
    ChainedMessageMap.getChainedMessageKeys()
    .then( response => {
      console.log("getChainedMessageKeys returned...");
      if( (!response.count) || (response.count < 1)){
        this.setState({ chainedMessageKeysDone: true, text: this.state.text + "No Chained Message Keys returned", errCount: this.state.errCount +1 });
        this.forceUpdate();
      }else{
        this.setState({ chainedMessageKeysDone: true, chainedMessageKeys: response.keys, text: this.state.text + "\nChained Message Keys:\n"+ response.keys +"\n"});
        this.forceUpdate();
      }
    })
    .catch(err => {
      console.log("getChainedMessageKeys returned with error...");
      this.setState({ chainedMessageKeysDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount +1 });
      this.forceUpdate();
    });
  }

  testChainedMessage(newlines){
    this.setState({ chainedMessageRun: true });
    console.log("Testing getChainedMessage...");
    ChainedMessageMap.getChainedMessage("outside.init1", this.gameState)
    .then( response => {
        console.log("getChainedMessage returned...");
        if(!response.key){
          this.setState({ chainedMessageDone: true, text: this.state.text + "\nNo Chained Message returned", errCount: this.state.errCount +1 });
          this.forceUpdate();
        }else{
          this.setState({ chainedMessageDone: true, chainedMessage: response.message, text: this.state.text + "\nChained Message: "+ response.message +"\n"});
          this.forceUpdate();
        }
    })
    .catch(err => {
        console.log("getChainedMessage returned with error...");
        this.setState({ chainedMessageDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount+1 });
        this.forceUpdate();
    });
  }

  testChainedNLMessage(){
    this.setState({ chainedNLMessageRun: true });
    console.log("Testing getChainedMessage with newlines...");
    ChainedMessageMap.getChainedMessage("outside.init1", this.gameState, true)
    .then( response => {
        console.log("getChainedMessage with newlines returned...");
        if(!response.key){
          this.setState({ chainedNLMessageDone: true, text: this.state.text + "\nNo Chained Message with newlines returned", errCount: this.state.errCount +1 });
          this.forceUpdate();
        }else{
          this.setState({ chainedNLMessageDone: true, chainedMessage: response.message, text: this.state.text + "\nChained Message with newlines: "+ response.message +"\n"});
          this.forceUpdate();
        }
    })
    .catch(err => {
        console.log("getChainedMessage with newlines returned with error...");
        this.setState({ chainedNLMessageDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount+1 });
        this.forceUpdate();
    });
  }

  tick() {
    if( !(this.state.chainedMessageKeysRun === true) ) { this.testChainedMessageKeys(); }
    if( !(this.state.chainedMessageRun === true) )  { this.testChainedMessage(); }
    if( !(this.state.chainedNLMessageRun === true) )  { this.testChainedNLMessage(); }
    this.setState({testComplete: (this.state.chainedMessageDone === true && this.state.chainedMessageKeysDone === true && this.state.chainedNLMessageDone === true )})
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
      <div className="ChainedMessageMapTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default ChainedMessageMapTest;