const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {                   /*event listener gets called anytime something inside input gets changed */
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')                  /*Retrieves all spans (characters) */
    const arrayValue = quoteInputElement.value.split('')                 /*converts the string (quote) into an array of each character in the string */
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })

    if (correct) renderNewQuote()
    
})



function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote () {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span') /* gets each individual character in quote creating a span for it */
        characterSpan.innerText = character                     /*and then setting the text to that span */
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime

function startTimer () {
    startTime  = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
        if (timer.innerText == 60){
            renderNewQuote()
        }
    }, 1000)
}

function getTimerTime () {
    return Math.floor((new Date() - startTime) / 1000)
}
 
renderNewQuote() 