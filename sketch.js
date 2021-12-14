/*

@author Cody
@date 2021-12-6

version comments
    ... text list, highlight list, milliseconds per passage
    .   display frame
    ..  WEBGL and display it in the same place but with beginHUD() and endHUD()
    *** blender axis
    *   p5.easyCam()
    *   display a single line inside the text frame
    *   word wrap
    *   advancing characters
    *   advancing passages using some time delay system
    *   SQUIRREL!!!
*/

let font
let passages // our json file input
let dialogBox // our dialog box

function preload() {
    font = loadFont('data/notjustgroovy.ttf')
    passages = loadJSON("passages.json")

}

/* populate an array of passage text */
let textList = []
/* grab other information: ms spent on each passage, highlights */
let highlightList = [] // a list of tuples specifying highlights and indexes
let msPerPassage = [] // how long to wait before advancing a passage
let textFrame // our text frame
let cam // our camera

function setup() {
    createCanvas(640, 360, WEBGL)
    cam = new Dw.EasyCam(this._renderer, {distance: 240});
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)
    for (let p in passages) {
        textList.push(passages[p]["text"])
        // console.log(p.text)
        // console.log(p)
        for (let h of passages[p]["highlightIndices"]) {
            highlightList.push([h["start"], h["end"]])
        }
        msPerPassage.push(passages[p]["ms"])
        // console.log(msPerPassage)
    }

    // console.log(highlightList)
    // console.log(passages.length)
    // console.log(textList)
    textFrame = loadImage("data/textFrame.png")
    // textFrame.resize(640, 360)
    console.log(textFrame)
    dialogBox = new DialogBox(passages, highlightList, msPerPassage, textFrame)
    console.log(textFrame)
}

function draw() {
    background(234, 34, 24)
    dialogBox.renderTextFrame(cam)
    console.log(textFrame)

}
// prevent the context menu from showing up :3 nya~
document.oncontextmenu = function () {
    return false;
}