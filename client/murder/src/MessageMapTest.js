import React, {Component} from "react";
import MessageMap from "./MessageMap";

class MessageMapTest extends Component{

  constructor(props) {
    super(props);
    this.gameState = { player: {}, location:{}, loop:{} };
    this.tick = this.tick.bind(this);
    this.testMessage = this.testMessage.bind(this);
    this.testMessageKeys = this.testMessageKeys.bind(this);
    this.state = {
      loopCount: 0,
      loopMax: 15,
      text: "Loading...\n",
      loopDelay: 25,
      error: null,
      errCount: 0,
      messageKeysRun: false,
      synonymsRun: false,
      messageRun: false,
      messageKeysDone: false,
      synonymsDone: false,
      messageDone: false,
      testComplete: false
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

  testMessageKeys(){
    this.setState({ messageKeysRun: true });
    console.log("Testing getMessageKeys...");
    MessageMap.getMessageKeys()
    .then( response => {
      console.log("getMessageKeys returned...");
      if( (!response.count) || (response.count < 1)){
        this.setState({ messageKeysDone: true, text: this.state.text + "No Message Keys returned", errCount: this.state.errCount +1 });
        this.forceUpdate();
      }else{
        this.setState({ messageKeysDone: true, messageKeys: response.keys, text: this.state.text + "\nMessage Keys:\n"+ response.keys +"\n"});
        this.forceUpdate();
      }
    })
    .catch(err => {
      console.log("getMessageKeys returned with error...");
      this.setState({ messageKeysDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount +1 });
      this.forceUpdate();
    });
  }

  testMessage(){
    this.setState({ messageRun: true });
    console.log("Testing getMessage...");
    MessageMap.getMessage("unknown", this.gameState)
    .then( response => {
        console.log("getMessage returned...");
        if(!response.key){
          this.setState({ messageDone: true, text: this.state.text + "\nNo Message returned", errCount: this.state.errCount +1 });
          this.forceUpdate();
        }else{
          this.setState({ messageDone: true, message: response.message, text: this.state.text + "\nMessage: "+ response.message +"\n"});
          this.forceUpdate();
        }
    })
    .catch(err => {
        console.log("getMessage returned with error...");
        this.setState({ messageDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount+1 });
        this.forceUpdate();
    });
  }

  tick() {
    if( !(this.state.messageKeysRun === true) ) { this.testMessageKeys(); }
    if( !(this.state.messageRun === true) )  { this.testMessage(); }
    this.setState({testComplete: (this.state.messageDone === true && this.state.messageKeysDone )})
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
      <div className="MessageMapTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default MessageMapTest;
