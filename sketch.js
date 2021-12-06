/*

@author 
@date 2021-12-
*/

let font
let passages // our json file input

function preload() {
    font = loadFont('data/notjustgroovy.ttf')
    passages = loadJSON("passages.json")

}

/* populate an array of passage text */
let textList = []
/* grab other information: ms spent on each passage, highlights */
let highlightList = [] // a list of tuples specifying highlights and indexes
let msPerPassage = 0 // how long to wait before advancing a passage

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)
}

function draw() {
    background(234, 34, 24)


}
// prevent the context menu from showing up :3 nya~
document.oncontextmenu = function () {
    return false;
}