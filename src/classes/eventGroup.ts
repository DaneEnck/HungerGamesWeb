import Contestant from "./contestant";
import { Condition } from "./contestant";
import wepList, { craftWeaponList } from "./weapon";
import { weapon } from "./weapon";
import itemList, { itemClone } from "./item";
import { item } from "./item";
import Group from "./group";
import { craftItemList } from "./item";
import type EventStruct from './eventStruct';

//events used for individual groups
let groupList: Array<Function> = [
    function(x: Group):EventStruct{
        let thewep:weapon = wepList[Math.floor(Math.random() * wepList.length)];
        for(let i = 0; i < x.getConts().length; i++){
            if(x.getConts()[i].newWeapon(thewep)){
                return {images:x.getImage(),main: x.getName() + " recieve a " + thewep.getName() + " from a sponsor. " + x.getConts()[i].getName() + " keeps it",combat:[]};
            }
        }
        return {images:x.getImage(),main:x.getName() + " recieve a " + thewep.getName() + " from a sponsor, but they all keep their current weapons",combat:[]};
    },
    function(x: Group):EventStruct{
        let theitem:item = itemList[Math.floor(Math.random() * itemList.length)]
        x.addItem(itemClone(theitem));
        return {images:x.getImage(),main:x.getName() + " recieve a " + theitem.getName() + " from a sponsor",combat:[]};
    },
    function(x: Group):EventStruct{
        let randnum = Math.random();
        let build = x.getName() + " go hunting"
        if(randnum < 0.33){
            build += ", but do not find anything"
        }
        else if (randnum < 0.66){
            build += ". They spot a squirrel, but it runs off before anyone can get close";
        }
        else{
            build += ". They spot a squirrel and catch it successfully!";
            x.addItem(itemClone(craftItemList[0]));
        }
        return {images:x.getImage(),main:build,combat:[]};
    },
    function(x:Group):EventStruct{
        let randnum = Math.random();
        let build = x.getName() + " try to catch fish";
        if (randnum < 0.75){
            build += ", but fail"
        }
        else{
            let randcont = x.getConts()[Math.floor(Math.random() * x.getConts().length)];
            if (randcont.getWeapon().getName() == "fists"){
                build += ". Amazingly, " + randcont.getPronoun() + randcont.verbSwitchPro(" grabs "," grab ") + "one with " + randcont.getPospronoun() + " bare hands!";
            }
            else{
                build += ". Amazingly, " + randcont.getPronoun() + " " + randcont.getWeapon().getHitVerb() + " one with " + randcont.getPospronoun() + " " + randcont.getWeapon().getName() + "!";
            }
            x.addItem(itemClone(craftItemList[1]));
        }
        return {images:x.getImage(),main:build,combat:[]};
    },
    function(x:Group):EventStruct{
        x.addItem(itemClone(craftItemList[2]));
        return {images:x.getImage(),main:x.getName() + " find a fruit tree and collect some fruit",combat:[]};
    },
    function(x:Group):EventStruct{
        let tempnum = -1;
        let randcont:number;
        for(let i = 0; i < x.getConts().length; i++){
            if(x.getConts()[i].newWeapon(craftWeaponList[0])){
                tempnum = i;
                break;
            }
        }
        if(tempnum != -1){
            do{
                randcont = Math.floor(Math.random() * x.getConts().length);
            }while(tempnum == randcont)
            return {images:x.getImage(),main: x.getConts()[randcont].getName() + " crafts a wooden spear for " + x.getConts()[tempnum].getName(),combat:[]};
        }
        else{
            return groupList[Math.floor(Math.random() * groupList.length)](x);
        }
    },
    function(x:Group):EventStruct{
        return {images:x.getImage(),main: x.getName() + " build a fire",combat:[]};
    },
    function(x:Group):EventStruct{
        let randnum = Math.random();
        let randcont = Math.floor(Math.random() * x.getConts().length);
        let str:string;
        if(randnum < 0.5){
            str = x.getConts()[randcont].getName() + " climbs a tree to get a vantage point for " + x.getConts()[randcont].getPospronoun() + " group";
        }
        else if(randnum < 0.8){
            x.getConts()[randcont].downCond(2);
            str = x.getConts()[randcont].getName() + " climbs a tree to get a vantage point, but slips and falls, injuring " + x.getConts()[randcont].getObjpronoun() + "self";
        }
        else{
            let randcont2:number;
            x.getConts()[randcont].downCond(2);
            do{
                randcont2 = Math.floor(Math.random() * x.getConts().length);
            }while(randcont == randcont2)
            x.getConts()[randcont2].downCond(2);
            str = x.getConts()[randcont].getName() + " climbs a tree to get a vantage point, but slips and falls onto " + x.getConts()[randcont2].getName() + ", injuring them both";
        }
        return {images:x.getImage(),main:str,combat:[]};
    },
    function(x:Group):EventStruct{
        x.addItem(itemClone(craftItemList[3]));
        return {images:x.getImage(),main:x.getName() + " pick berries",combat:[]};
    }
]

export default groupList;