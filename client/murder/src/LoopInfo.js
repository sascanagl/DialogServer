
class LoopInfo {

    constructor(props){
        this.trigger   = props.trigger   ?? "";
        this.nxtrigger = props.nxtrigger ?? "";
        this.delay     = props.delay     ?? 2;
    }
    static getStartLoop(){
        return new LoopInfo({trigger: "start", nxtrigger: "", delay: 2 });
    }
}
export default LoopInfo;
