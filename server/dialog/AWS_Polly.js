
const config = require("../../config");
const http_serve = require("../http_serve");

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
const voices = new Map([
    ["Aditi"   , undefined],
    ["Amy"     , undefined],
    ["Brian"   , undefined],
    ["Emma"    , undefined],
    ["Geraint" , undefined],
    ["Ivy"     , undefined],
    ["Joanna"  , undefined],
    ["Joey"    , undefined],
    ["Justin"  , undefined],
    ["Kendra"  , undefined],
    ["Kimberly", undefined],
    ["Matthew" , undefined],
    ["Nicole"  , undefined],
    ["Raveena" , undefined],
    ["Russell" , undefined],
    ["Salli"   , undefined]
]);

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

    /**
     * Get the voice instance for the voice id specified.
     * @param string voice 
     * @return AWS_Polly client for the voice requested
     * @throws Error if invalid voice id specified
     */
    static getVoice(voice){
        var voicelc = voice.toLowerCase();
        var keylc;
        for(var key of voices.keys()){
            keylc = key.toLowerCase();
            if (voicelc === keylc){
                var polly = voices.get(key);
                if(polly) return polly;
                console.log(`We are reviving ${key}...`);
                polly = new AWS_Polly({VoiceId: key});
                voices.set(key, polly);
                return polly;
            }
        }
        throw new Error("We never met "+ voice);
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
        // \n in text seems to be OK. treated as a pause! :)  I love it!
        this.voice_parms.Text = text;
        return await getSynthesizeSpeechUrl({
            client: this.polly,
            params: this.voice_parms
        }, config.AWS_POLLY_TIMEOUT);
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
        if(! AWS_Polly.isEnabled() ){
            jsonObj.speechError = `${this.voice_parms.VoiceId} currently has no larynx`;
            http_serve.respondApplicationJson(200, jsonObj, response, request);
            return;
        }
        var text;
        if (jsonObj.message){
            text = jsonObj.message;
        }else if (jsonObj.synonym){
            text = jsonObj.synonym;
        }else if (jsonObj.synonyms){
            text = jsonObj.synonyms.join(',');
        }else{
            console.log("${this.voice_parms.VoiceId} doesn't know what to say");
            jsonObj.speechError = "${this.voice_parms.VoiceId} don't know what to say";
            http_serve.respondApplicationJson(200, jsonObj, response, request);
            return;
        }
        this.getSpeechUrl(text)
        .then ((speechUrl) => {
            jsonObj.speechUrl = speechUrl;
            http_serve.respondApplicationJson(200, jsonObj, response, request);
        })
        .catch(err => {
            console.log(err);
            // polly error, but our original text message is still valid
            jsonObj.speechError = err.message;
            http_serve.respondApplicationJson(200, jsonObj, response, request);
        })
    }
}

module.exports = AWS_Polly;
