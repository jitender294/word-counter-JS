const typingText = document.querySelector(".typing-text p")
inpfield = document.querySelector(".wrapper .input-field")
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span")
wpmTag = document.querySelector(".wpm span")
cpmTag = document.querySelector(".cpm span")
tryAgainBtn = document.querySelector("button")

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistake = isTyping = 0;

function randomParagraph() {
    //getting random number and it'll always less than the paragraph lenght 
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
        //getting random items from the paragraph array, splitting all characters 
        // or it, adding each character inside span and then adding this span inside p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active")
        // focusing input field on keydown or click event
    document.addEventListener("click", () => inpfield.focus())
    document.addEventListener("keydown", () => inpfield.focus())
    typingText.addEventListener("click", () => inpfield.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpfield.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) { // once timer is start, it won't restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true
        }
        // if user hasn't entered any character or pressed backspace
        if (typedChar == null) {
            charIndex-- // decrement charIndex
            // decrement mistake only if the charIndex span contains incorrect class 
            if (characters[charIndex].classList.contains("incorrect")) {
                mistake--
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        } else {

            if (characters[charIndex].innerText === typedChar) {
                // if user typed character and shown character matched then add the 
                // correct class else increment the mistake add the incorrect class
                characters[charIndex].classList.add("correct")
            } else {
                mistake++
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++ // increment charIndex either user typed correct or incorrect character
        }

        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")

        let wpm = Math.round((((charIndex - mistake) / 5) / (maxTime - timeLeft)) * 60)
            // if wpm value is 0 , empty , or infinity then setting it's vlaue to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        mistakeTag.innerText = mistake
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistake // cpm will not count mistakes
    } else {
        inpfield.value = ""
        clearInterval(timer)
    }

}

function initTimer() {
    // if timeLeft is greater than 0 then decrement the timeleft else clear the timer 
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft
    } else {
        clearInterval(timer)
    }
}

function resetGame() {
    // calling loadParagraph function and 
    // resetting each variables and elements value to default
    randomParagraph();
    inpfield.value = ""
    clearInterval(timer)
    timeLeft = maxTime
    charIndex = mistake = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistake
    wpmTag.innerText = 0
    cpmTag.innerText = 0
}

randomParagraph()
inpfield.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)