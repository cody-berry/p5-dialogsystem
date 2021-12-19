class DialogBox {
    constructor(passages, highlightIndices, msPerPassage, textFrame) {
        // let's assign the passages we have, the highlight indices given in
        // a tuple, and the milliseconds per passage!
        colorMode(HSB, 360, 100, 100, 100)
        this.passages = passages
        this.highlightIndices = highlightIndices
        this.msPerPassage = msPerPassage
        // we can also load the text frame
        this.textFrame = textFrame
        this.textFrame.resize(640, 360)
        // our current passage index
        this.currentIndex = 0
        // our current character index
        this.characterIndex = 0
        // the last advanced millisecond
        this.lastAdvance = millis()
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
        for (let i = 0; i < this.characterIndex; i++) {
            let c = currentPassage[i]
            // now we're checking if we should start highlighting or not, so
            // if i is the starting index of one of the tuples...
            for (let highlight of this.highlightIndices[this.currentIndex]) {
                if (i === highlight[0]) {
                    // ...we fill with yellow...
                    fill(63, 60, 75)
                    // console.log("yellow!")
                }
                // ...and if i is the ending index...
                if (i === highlight[1]) {
                    // ...we reset our fill to white.
                    fill(0, 0, 100)
                }
            }

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
                wrap = false
            }
        }
        cam.endHUD()
    }

    // update our status
    update() {
        // if our characters aren't already done skipping, we should
        // increment our character index
        let currentPassage = this.passages[this.currentIndex]
        if (this.characterIndex < currentPassage.length) {
            // the reciprocal of this increase number is actually the number
            // of frames per increase. In this case, it's 5/4.
            this.characterIndex += 4/5
        }
        // because we don't want to go a fraction over
        // currentPassage.length, we have to do a non-separate check
        if (this.characterIndex > currentPassage.length) {
            this.characterIndex = currentPassage.length
        }
        text(this.lastAdvance, 0, height)
        // if the milliseconds passed since the last advance is greater, we
        // advance the current index
        if (millis() - this.lastAdvance > this.msPerPassage[this.currentIndex]) {
            this.currentIndex++
            this.lastAdvance = millis()
            this.characterIndex = 0
        }
    }
}