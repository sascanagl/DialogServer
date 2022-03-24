
const APP_ROOT = "/murder";

class https_fetch {

    /**
     * Async GET call to the server for a complete application/json response body.
     * @param string urlPath -- the relative urlPath to perform async ajax request. Do NOT include the app root. \
     * Examples: "/synonyms", "/synonym/{key}", etc..
     * @return Promise<Body.json()> Returns the response.json() Promise from the fetch.
     * @throws Error if the server provides a status other than 200.
     */
     static getApplicationJson = async( url ) => {
        const response = await fetch(APP_ROOT + url, {
            method: 'GET',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            headers:{
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        const body = await response.json();
        if(response.status !== 200){
            throw new Error("HttpError: "+ response.status +":"+ body.message);
        }
        return body; //still a Promise requiring .then and .catch handling
    }

    /**
     * Async POST to the server with gameState json data expecting a complete application/json response body.
     * @param string urlPath -- the relative urlPath to perform async ajax request. Do NOT include the app root. \
     * Examples: "/synonyms", "/synonym/{key}", etc..
     * @param json body -- usually the complete gameState json.  But whatever is appropriate for the url.
     * @return Promise<Body.json()> Returns the response.json() Promise from the fetch.
     * @throws Error if the server provides a status other than 200.
     */
     static postApplicationJson = async( url, json ) => {
        const strJson = JSON.stringify(json);
        const lenJson = strJson.length;
        const response = await fetch(APP_ROOT + url, {
            method: 'POST',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            headers:{
                'Content-Type': 'application/json',
                'Content-Length': lenJson,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: strJson
        });
        const jsbody = await response.json();
        if(response.status !== 200){
            throw new Error("HttpError: "+ response.status +":"+ jsbody.message);
        }
        return jsbody; //still a Promise requiring .then and .catch handling
    }
}
export default https_fetch;