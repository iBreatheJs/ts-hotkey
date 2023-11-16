import hotkeys from "hotkeys-js"
import { Hotkey } from "."

let hk = new Hotkey

export class Scope {
    static active: Set<String> = new Set("all")
    constructor() {
        hotkeys.filter = function(event){
            return true;
          }
    }
    add(scope: string) {
        Scope.active.add(scope)
        // hk.addListeners(scope)
        hotkeys.setScope(scope)
        this.hasChanged("add", scope)
    }
    
    remove(scope: string) {
        Scope.active.delete(scope)
        hotkeys.setScope("all")
        this.hasChanged("remove", scope)
    }
    hasChanged(op: string, scope: string) {
        console.log("scope: " + op + " " + scope)
        console.log(hotkeys.getScope())
        console.log(hotkeys.getAllKeyCodes())
    }

}