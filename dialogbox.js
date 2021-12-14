class DialogBox {
    constructor(passages, highlightIndices, msPerPassage, textFrame) {
        // let's assign the passages we have, the highlight indices given in
        // a tuple, and the milliseconds per passage!
        this.passages = passages
        this.highlightIndices = highlightIndices
        this.msPerPassage = msPerPassage
        // we can also load the text frame
        this.textFrame = textFrame
        this.textFrame.resize(640, 360)
    }

    // loads the saved box texture with transparency
    renderTextFrame(cam) {
        cam.beginHUD(p5._renderer, width, height)
        image(this.textFrame, 0, 0, width, height)
        cam.endHUD()
    }
}