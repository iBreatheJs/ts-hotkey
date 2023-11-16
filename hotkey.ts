import hotkeys from 'hotkeys-js';

export function testHk() {

    hotkeys('a+s+f+d, ctrl+r, alt+f4, alt+f5, ctrl+c', function (event, handler) {
        // Prevent the default refresh event under WINDOWS system
        // event.preventDefault()
        console.log('you pressed F5!')
        return false
    });

}

// local imports
import { BrowserNames, browser } from "./defaultKeys"
import { KEYCODES, KeyCode } from './keyCodes';

type HotkeyDefs = any

// todo: import from somewhere
export type Dict<T> = { [k: string]: T }

interface HotkeyOptions {
    scope: string
}

type Listener = (this: Document, ev: KeyboardEvent) => any
export class Hotkey {
    static hks: Dict<any> = {}
    static hksInst: Dict<any> = {
        browser
    }
    hks
    constructor() {
        Hotkey.hksInst.browser = browser[this.getBrowser()]
        this.hks = Hotkey.hksInst
    }
    // Overload signatures
    add(key: string, cb: (e?:Event) => void): void;
    add(key: string, scope: string, cb: (e?:Event) => void): void;
    add(key: string, scope: string, opt: HotkeyOptions, cb: (e?:Event) => void): void;
    // Implementation
    add(key: KeyCode, arg1: string | Function, arg2?: HotkeyOptions | Function, arg3?: Function) {
        let scope: string = 'all';
        let cb: Listener

        let options: HotkeyOptions = {
            scope: scope
        };

        if (typeof arg1 === 'string') {
            scope = arg1;
            options.scope = scope
            if (typeof arg2 === 'object') {
                options = arg2;
                if (typeof arg3 === 'function') {
                    cb = arg3; // handle the case when only the callback is provided without options
                }
                else throw new Error("asdf")
                cb = () => { }

            } else {
                // if (typeof arg2 === 'function') {
                cb = arg2 as Function; // handle the case when only the callback is provided without options
            }
        }
        else {
            // if (typeof arg1 === 'function') {
            cb = arg1; // handle the case when only the callback is provided without scope and options
        }






        // const callback = arg3 || arg2 || arg1;

        console.log(Hotkey.hks)
        if (!Hotkey.hks[scope]) {
            Hotkey.hks[scope] = {}
        }
        Hotkey.hks[scope][key] = cb

        // register with hotkeys lib
        hotkeys(key, scope, cb)
        console.log(`Registered hotkey '${key}' in scope '${scope}' with options:`, options);
    }


    addListeners(scope: string) {
        // console.log(scope)
        // console.log("Hotkey.hksInst[scope]")
        // console.log(Hotkey.hks[scope])
        // for (let k in Object.keys(Hotkey.hks[scope])) {
        //     this.addListener(k, Hotkey.hks[scope][k])
        // }
    }
    addListener(k: KeyCode, cb: Listener) {
        let code = KEYCODES[k]
        // hotkeys(k,cb)
        // just add one keydown and keyup listener with a cb which checks for all the combinations and calls the cbs.
        // thats how it should be done if i impl it myself
        // document.addEventListener("keydown", cb)
    }
    removeListeners(scope: string) {
        // for (var k in Object.keys(Hotkey.hks[scope])) {
        //     k as unknown as Listener 
        //     this.removeListener(k, Hotkey.hks[scope][k])
        // }
    }
    removeListener(k: KeyCode, cb: Listener) {
        hotkeys
        hotkeys(k, cb)
    }
    getBrowser(): BrowserNames {
        // todo: not implemented
        return "brave"
    }
    /**
     * should be checked and resolved when new cmds are added then consider valid.
     * 
     * appropriate scope:
     *      alert if eg. copy is about to be added to browser but its already in all
     * 
     * duplicate name.
     * 
     * merge scopes same key. 
     *      if same comb then the higher lvl scope should not contain it
     */
    checkIntegrity() {

    }
}
