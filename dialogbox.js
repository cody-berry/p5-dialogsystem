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
        this.currentIndex = 5
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
        // our current passage
        let currentPassage = this.passages[this.currentIndex]
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
        let wrap = false
        fill(0, 0, 100)
        for (let i = 0; i < currentPassage.length; i++) {
            let c = currentPassage[i]
            text(c, x, y)
            x += textWidth(c)

            // now, we can do word wrap.
            // if our current character is a space...
            if (c === ' ') {
                // ...we should find the rest of the passage...
                let restOfPassage = currentPassage.substring(i+1)
                // ...the next delimiter index...
                let nextDelimiterIndex = restOfPassage.indexOf(' ') + i+1
                // ...our current word...
                let currentWord = currentPassage.substring(i, nextDelimiterIndex)
                // ...the text width of the current word...
                let textWidthCurrentWord = textWidth(currentWord)
                // ...and finally, if x plus the text width of the current
                // word is equal to an x wrap defined below, set wrap to true...
                let x_wrap = width - leftMargin
                if (x + textWidthCurrentWord > x_wrap) {
                    wrap = true
                }
            }
            // ...and, if our wrap is true, we reset x, increment y, and
            // reset wrap to false.
            if (wrap) {
                x = leftMargin
                y += textAscent() + textDescent() + 6
                wrap=false
            }
        }
        cam.endHUD()
    }
}