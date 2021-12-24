
class http_serve {

    /**
     * Send status and JSON.stringify jsonObj into application/json
     * @param {*} jsonObj
     * @param {*} HTTP response
     * @param {*} HTTP request
     */
    static respondApplicationJson(status, jsonObj, response, request){
        var json = JSON.stringify(jsonObj);
        response.writeHead(status, {
            'Content-Length': Buffer.byteLength(json),
            'Content-Type' : 'application/json'
        })
        .end(json);
    };

    /**
     * Send status and text/plain response
     * @param string text
     * @param {*} HTTP response
     * @param {*} HTTP request
     */
    static respondTextPlain(status, text, response, request){
        response.writeHead(status, {
            'Content-Length': Buffer.byteLength(text),
            'Content-Type' : 'text/plain'
        })
        .end(text);
    };
}
module.exports = http_serve;