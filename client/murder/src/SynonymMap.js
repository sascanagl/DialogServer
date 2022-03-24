// SynonymMap.js
// ./client/SynonymMap.js -- part of the React client
import https_fetch from "./https_fetch";

class SynonymMap{

    /**
     * @param string key -- the {key} for /synonym/{key}.
     * @return Promise<Body.json()> Returns the response.json() Promise from /synonym/{key}.
     * @throws Error if the key param is null or empty, or if the server provides a status other than 200. 
     */
    static getSynonym = async(key) => {
        if(key == null || key.length === 0) throw new Error("Invalid Synonyms Key");
        return await https_fetch.getApplicationJson(`/synonym/${key}`);
    }

    /**
     * @param string key -- the {key} for /synonym/{key}.
     * @return Promise<Body.json()> Returns the response.json() Promise from /synonym/{key}.
     * @throws Error if the key param is null or empty, or if the server provides a status other than 200. 
     */
     static getSynonyms = async(key) => {
        if(key == null || key.length === 0) throw new Error("Invalid Synonyms Key");
        return await https_fetch.getApplicationJson(`/synonyms/${key}`);
    }

    /**
     * @return Promise<Body.json()>
     * @throws error
     */
    static getSynonymKeys = async() => {
       return await https_fetch.getApplicationJson("/synonyms");
    }
}
export default SynonymMap;