
// MessageMap.js
// ./client/MessageMap.js -- part of the React client
import https_fetch from "./https_fetch";

class MessageMap{

    // this is who we call externally
    static getMessage = async(key, gameState) => {
        if(key == null || key.length === 0) throw new Error("Invalid Message Key");
        if(gameState == null || !((typeof gameState) === 'object' )) throw new Error("Invalid GameState");
        return await https_fetch.postApplicationJson(`/message/${key}`, gameState);
    }

    static getMessageKeys = async() =>{
       return await https_fetch.getApplicationJson("/messages");
    }
}
export default MessageMap;
