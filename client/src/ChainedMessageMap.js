// ChainedMessageMap.js
// ./client/ChainedMessageMap.js -- part of the React client
import https_fetch from "./https_fetch";

class ChainedMessageMap{

    // this is who we call externally
    // linefeeds = true | false
    /**
     * 
     * @param string - msgKey
     * @param gameState - gameState
     * @param boolean - optional true/false to separate chained messages with newlines
     */
    static getChainedMessage = async(key, gameState, newlines) => {
        if(key == null || key.length === 0) throw new Error("Invalid ChainedMessage Key");
        if(gameState == null || !((typeof gameState) === 'object' )) throw new Error("Invalid GameState");
        if( newlines && (newlines === true)){
            return await https_fetch.postApplicationJson(`/chainedMessage/${key}?newlines`, gameState);
        }else{
            return await https_fetch.postApplicationJson(`/chainedMessage/${key}`, gameState);
        }
    }

    static getChainedMessageKeys = async() => {
        return await https_fetch.getApplicationJson("/chainedMessages");
    }
}
export default ChainedMessageMap;
