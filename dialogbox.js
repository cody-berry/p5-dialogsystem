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
        // our current passage index
        this.currentIndex = 0
    }

    // loads the saved box texture with transparency
    renderTextFrame(cam) {
        cam.beginHUD(p5._renderer, width, height)
        image(this.textFrame, 0, 0, width, height)
        cam.endHUD()
    }

    // right now, this function only shows a single line
    renderText(cam) {
        cam.beginHUD(p5._renderer, width, height)
        // our margins
        let leftMargin = 70
        let topMargin = 260
        stroke(50, 50, 50)
        // draws a 50-by-50 cross where our text bottom-left is supposed to go.
        // line(leftMargin, topMargin-50, leftMargin, topMargin+50)
        // line(leftMargin-50, topMargin, leftMargin+50, topMargin)
        // our positions
        let x = leftMargin
        let y = topMargin
        fill(0, 0, 100)
        for (let i = 0; i < this.passages[this.currentIndex].length; i++) {
            let c = this.passages[this.currentIndex][i]
            text(c, x, y)
            x += textWidth(c)
        }
        cam.endHUD()
    }
}