
const config = require("../../config");

const AWS_IdentityPool = config.AWS_IDENTITY_POOL;
const AWS_REGION       = config.AWS_REGION;

const { PollyClient } = require("@aws-sdk/client-polly");
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool, } = require("@aws-sdk/credential-provider-cognito-identity");
const { getSynthesizeSpeechUrl } = require("@aws-sdk/polly-request-presigner");

// https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
// EN-GB: Amy, Emma, Brian
// EN-FB-WLS: Geraint
// EN-AU: Nicole, Russel
// EN-IN: Aditi, Raveena
// EN-US: Ivy, Joanna, Kendra, Kimberly, Salli, Joey, Justin, Matthew

class AWS_Polly {

    /**
    Initialize a particular voice instance
    @param {*} props for initialization of the voice
        Engine: "standard",
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text:  (usually filled in at speak function call time),
        TextType: "text",
        VoiceId: "Joanna"
    */
    constructor(props){
        console.log("CREATING "+ props.VoiceId);
        this.voice_parms = {
            Engine:       props.Engine       ?? "standard",
            OutputFormat: props.OutputFormat ?? "mp3",
            SampleRate:   props.SampleRate   ?? "16000",
            Text:         props.Text         ?? "",
            TextType:     props.TextType     ?? "text",
            VoiceId:      props.VoiceId      ?? ""
        };
        this.polly = new PollyClient({
            region: AWS_REGION,
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: AWS_REGION }),
                identityPoolId: AWS_IdentityPool
            })
        });
        this.getSpeechUrl = this.getSpeechUrl.bind(this);
        this.addSpeechUrlResponse = this.addSpeechUrlResponse.bind(this);
    }

    static isEnabled(){
        // console.log("AWS_POLLY_ENABLED typeof "+ (typeof config.AWS_POLLY_ENABLED));
        // console.log("AWS_Polly.isEnabled = "+ config.AWS_POLLY_ENABLED);
        return config.AWS_POLLY_ENABLED === "true" ||
               config.AWS_POLLY_ENABLED === true;
    }

    /**
     * Get a Url to dynamically generated audio file (mp3).
     * @param {*} text to synthesize.
     * @return Promise - string Url
     */
    async getSpeechUrl(text){
        // future: may have to redact the text of \n and other non-speech text
        this.voice_parms.Text = text;
        // console.log(this.voice_parms) //;
        // console.log(this.voice_parms.VoiceId +" speech requested at "+ new Date().toLocaleTimeString());
        return await getSynthesizeSpeechUrl({
            client: this.polly,
            params: this.voice_parms
        }, 4);  // 4 second timeout?  Default is normally 3600 (1 hour)
    }

    /**
     * Extend an existing a 200 http json response with a Polly speechUrl: property. \
     * Sends a 200 HTTP response even if speech fails since the text message is assumed still
     * valid.
     * @param {*} jsonObj containing message: to convert to speech.
     * @param {*} response HTTP Response object.
     * @param {*} request HTTP Request object.
     * @return JSON: { "key": string, "message": string, "speechUrl": string }
     * OR { "key": string, "message": string, "speechError": string }
     */
    addSpeechUrlResponse(jsonObj, response, request){
        this.getSpeechUrl(jsonObj.message)
        .then ((speechUrl) => {
            // console.log("speechUrl is "+ speechUrl);
            jsonObj.speechUrl = speechUrl;
            var json = JSON.stringify(jsonObj);
            response.writeHead(200, {
                'Content-Length': Buffer.byteLength(json),
                'Content-Type' : 'application/json'
            }).end(json);
        })
        .catch(err => {
            console.log(err);
            // polly error, but our original text message is still valid
            jsonObj.speechError = err.message;
            var json = JSON.stringify(jsonObj);
            response.writeHead(200, {
                'Content-Length': Buffer.byteLength(json),
                'Content-Type' : 'application/json'
            }).end(json);
        })
    }
}

module.exports = AWS_Polly;
