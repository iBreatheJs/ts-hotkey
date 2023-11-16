let all = {
    "copy": ["ctrl", "c"],
    "paste": ["ctrl", "v"],
    "exit": ["alt", "f4"], // idk if browser can react to this from keyboard lib...

}

let brave = {
    "reload": [
        ["f5"],
        ["ctrl", "r"]
    ],
    "hard reload": [
        ["ctrl", "shift", "r"]
    ]
}
export type BrowserNames = "brave" | "internet explorer" | "firefox"
let asdf: BrowserNames = "brave"
// export let browser = {
export let browser: { [k in BrowserNames]?: any } = {
    brave: brave
    // brave: brave,
    // firefox: firefox
}