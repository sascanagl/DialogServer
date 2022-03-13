import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import OutTriggerActions from "./OutTriggerActions";

class DialogOptions extends Component{
    
    constructor(props){
      super(props);
      this.composeOptions = this.composeOptions.bind(this);
    }

    composeOptions(arrList){
        let i=0;
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return arrList.map((item) =><div key={"option" + i++}><a className="nounderline"
                                                                onClick = {(evt) => { this.props.gameState.outHandler(
                                                                                      new OutTriggerActions({trigger:item.trigger,
                                                                                                             actions:item.actions}))}}
                                                                nofollow="true" > {item.message} </a></div>);
    }

    render(){
      console.log("DialogOptions rendering...");
      let linkOptions  = this.composeOptions(this.props.gameState.outOptions);
      return(
        <section className="DialogOptions">
            {linkOptions}
        </section>
      );
    }
  }
  export default DialogOptions;