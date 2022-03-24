// RandomMessageMap.js
// ./client/RandomMessageMap.js -- part of the React client
import https_fetch from "./https_fetch";

class RandomMessageMap{

    // this is who we call externally
    static getRandomMessage = async(key, gameState) => {
      if(key == null || key.length === 0) throw new Error("Invalid RandomMessage Key");
      if(gameState == null || !((typeof gameState) === 'object' )) throw new Error("Invalid GameState");
      return await https_fetch.postApplicationJson(`/randomMessage/${key}`, gameState);
  }

    static getRandomMessageKeys = async() => {
      return await https_fetch.getApplicationJson("/randomMessages");
   }
}
export default RandomMessageMap;
