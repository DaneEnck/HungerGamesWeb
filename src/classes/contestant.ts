import { weapon } from "./weapon";
import { item } from "./item";

export const enum Condition{
    DEAD, //todo
    WOUND_HIGH,
    WOUND_MEDIUM,
    WOUND_LOW,
    HEALTHY
}

export default class Contestant{
    name: string;
    cond: Condition;
    kills: number;
    pronoun: string;
    objpronoun: string; //objective
    pospronoun: string; //possesive
    wep: weapon;
    items: Array<item>;
    isInGroup: boolean;
    image: string;
    pronounCustomToggle: boolean;

    constructor(theName: string, thePronoun: string, theObjpronoun:string, thePospronoun: string, theImage: string){
        this.name = theName;
        this.cond = Condition.HEALTHY;//todo
        this.kills = 0;
        this.pronoun = thePronoun;
        this.objpronoun = theObjpronoun; 
        this.pospronoun = thePospronoun;
        this.wep = new weapon("fists",0,0,"hits",2)
        this.items = [];
        this.isInGroup = false;
        this.image = theImage;
        this.pronounCustomToggle = false;
    }

    getName(): string{
        return this.name;
    }

    getCond(): Condition{
        return this.cond;
    }

    getKills(): number{
        return this.kills;
    }

    getPronoun(): string{
        return this.pronoun;
    }

    getObjpronoun(): string{
        return this.objpronoun;
    }

    getPospronoun(): string{
        return this.pospronoun;
    }

    isGroup(): boolean{
        return false;
    }

    setName(the: string):void{
        this.name = the;
    }

    setPronoun(the: string):void{
        this.pronoun = the;
    }

    setObjPronoun(the: string):void{
        this.objpronoun = the;
    }

    setPosPronoun(the:string):void{
        this.pospronoun = the;
    }

    setCond(newCond: Condition): void{
        this.cond = newCond;
    }

    upCond(up: number):void{
        if(this.cond + up > 4){
            this.cond = 4;
        }
        else{
            this.cond += up;
        }
    }

    downCond(down: number):void{
        if (this.cond - down < 0){
            this.cond = 0;
        }
        else{
            this.cond -= down;
        }
    }

    setKills(newKills: number): void{
        this.kills = newKills;
    }

    upKills(up: number):void{
        this.kills += up;
    }

    getCondName(): string{
        switch(this.cond){
            case Condition.DEAD:
                return "dead";
            case Condition.WOUND_HIGH:
                return "heavily wounded";
            case Condition.WOUND_MEDIUM:
                return "wounded";
            case Condition.WOUND_LOW:
                return "lightly wounded";
            case Condition.HEALTHY:
                return "healthy";
            default:
                return "error";
        }
    }

    getWeapon():weapon{
        return this.wep;
    }

    newWeapon(x: weapon):boolean{
        if (x.getHitAdd() > this.wep.getHitAdd()){
            this.wep = x;
            return true;
        }
        return false;
    }

    loseWeapon(){
        this.wep = new weapon("fists",0,0,"hits",2);
    }

    getItems():Array<item>{
        return this.items;
    }

    addItem(x: item):void{
        this.items.push(x);
    }

    loseItem(x: number):boolean{
        if(this.items.length > 0){
            this.items.splice(x,1);
            return true;
        }
        return false;
    }

    setIsInGroup(x: boolean):void{
        this.isInGroup = x;
    }

    getIsInGroup():boolean{
        return this.isInGroup;
    }

    verbSwitchPro(x:string,y:string):string{
        if(this.pronoun == "they"){
            return y;
        }
        else{
            return x;
        }
    }

    verbSwitchName(x:string,y:string):string{
        return x;
    }

    getString():string{
        return "Error: getString called on a solo contestant";
    }

    setImage(x: string):void{
        this.image = x;
    }

    getImage():string[]{
        return [this.image];
    }

    getPronounCustomToggle():boolean{
        return this.pronounCustomToggle;
    }

    setPronounCustomToggle(x:boolean):void{
        this.pronounCustomToggle = x;
    }
}