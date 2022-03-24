import React, {Component} from "react";
import SynonymMap from "./SynonymMap.js";

class SynonymMapTest extends Component{

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.testSynonymKeys = this.testSynonymKeys.bind(this);
    this.testSynonym = this.testSynonym.bind(this);
    this.state = {
      loopCount: 0,
      loopMax: 15,
      text: "Loading...\n",
      loopDelay: 25,
      error: null,
      errCount: 0,
      synonymKeysRun: false,
      synonymsRun: false,
      synonymRun: false,
      synonymKeysDone: false,
      synonymsDone: false,
      synonymDone: false,
      testComplete: false,
      synonymKeys: [],
      synonyms: [],
      synonym: ""
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

  testSynonymKeys(){
    this.setState({ synonymKeysRun: true });
    console.log("Testing getSynonymKeys...");
    SynonymMap.getSynonymKeys()
    .then( response => {
      console.log("getSynonymKeys returned...");
      if( (!response.count) || (response.count < 1)){
        this.setState({ synonymKeysDone: true, text: this.state.text + "No Synonym Keys returned", errCount: this.state.errCount +1 });
        this.forceUpdate();
      }else{
        this.setState({ synonymKeysDone: true, synonymKeys: response.keys, text: this.state.text + "\nSynonym Keys:\n"+ response.keys +"\n"});
        this.forceUpdate();
      }
    })
    .catch(err => {
      console.log("getSynonymKeys returned with error...");
      this.setState({ synonymKeysDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount +1 });
      this.forceUpdate();
    });
  }

  testSynonym(){
    this.setState({ synonymRun: true });
    console.log("Testing getSynonym...");
    SynonymMap.getSynonym("wow")
    .then( response => {
        console.log("getSynonym returned...");
        if(!response.key){
          this.setState({ synonymDone: true, text: this.state.text + "\nNo Synonym returned", errCount: this.state.errCount +1 });
          this.forceUpdate();
        }else{
          this.setState({ synonymDone: true, synonym: response.synonym, text: this.state.text + "\nSynonym: "+ response.synonym +"\n"});
          this.forceUpdate();
        }
    })
    .catch(err => {
        console.log("getSynonym returned with error...");
        this.setState({ synonymDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount+1 });
        this.forceUpdate();
    });
  }

  testSynonyms(){
    this.setState({ synonymsRun: true });
    console.log("Testing getSynonyms...");
    SynonymMap.getSynonyms("wow")
    .then( response => {
        console.log("getSynonyms returned...");
        if(!response.key){
          this.setState({ synonymsDone: true, text: this.state.text + "\nNo Synonyms returned", errCount: this.state.errCount +1 });
          this.forceUpdate();
        }else{
          this.setState({ synonymsDone: true, 
                          synonyms: response.synonyms, text: this.state.text + "\nSynonyms Count: "+ response.count +": "+ response.synonyms +"\n"});
          this.forceUpdate();
        }
    })
    .catch(err => {
        console.log("getSynonym returned with error...");
        this.setState({ synonymsDone: true, text: this.state.text +"\n"+ err.message, errCount: this.state.errCount+1 });
        this.forceUpdate();
    });
  }

  tick() {
    if( !(this.state.synonymKeysRun === true) ) { this.testSynonymKeys(); }
    if( !(this.state.synonymRun === true) )  { this.testSynonym(); }// might be there, might not. Should still get a 200 response.
    if( !(this.state.synonymsRun === true) )  { this.testSynonyms(); } 
    this.setState({testComplete: (this.state.synonymDone === true && this.state.synonymKeysDone === true && this.state.synonymsDone )})
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
      <div className="SynonymMapTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default SynonymMapTest;