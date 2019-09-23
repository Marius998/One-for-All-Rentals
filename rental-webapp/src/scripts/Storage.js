module.export = class Storage{

    constructor(){

        this.storage = window.localStorage;
    }

    setzeFilter(provider,boolean){

        this.storage.setItem(provider,boolean);
    }

     getFilter(provider){
        return this.storage.getItem(provider);
    }

}