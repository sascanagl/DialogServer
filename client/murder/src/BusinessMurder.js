import https_fetch from "./https_fetch";

class BusinessMurder {
    constructor(){
      this.name = "Business of Murder";
      this.logic = [];
      this.loaded = false;
      this.loadGame = this.loadGame.bind(this);
      this.isLoaded = this.isLoaded.bind(this);
      this.getLogic = this.getLogic.bind(this);
      this.getName = this.getName.bind(this);

      this.loadGame();
    }

    isLoaded(){
      return this.loaded;
    }
    getLogic(){
      return this.logic;
    }
    getName(){
      return this.name;
    }

    loadGame = async() => {
      this.loaded = false;
      await https_fetch.getApplicationJson("/logic")
      .then( res => {
          console.log("BusinessMurder async loading complete...");
          this.logic = res.logic;
          this.loaded = true;
      })
      .catch(err => {
          console.log("BusinessMurder async loading returned with error...");
          throw new Error(err.message);
      });
    }
}
export default BusinessMurder;
