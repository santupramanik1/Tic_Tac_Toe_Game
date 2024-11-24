import confetti from 'https://cdn.skypack.dev/canvas-confetti';
//  To Get Reffernce
const gridBtn = document.querySelectorAll('.gridBtn')
const resetBtn = document.getElementById('resetBtn')
const msgContainer = document.getElementById('msg-container')
const winnerPlace = document.getElementById('winner-place')
const newGameBtn = document.getElementById('new-game')
// Zero icon
const zero = 'O'
const cross = 'X'

// All the Wining Place
const winingPlace = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]
// To Get all the Box
let playerX = false;
// let playerO = true;

// To Track the which player turn
let cnt = -1;
gridBtn.forEach((Element, index) => {
    Element.addEventListener('click', () => {

        if (playerX) {
            playerOFunc(Element)
            playerX = false
        }
        else {
            playerXFunc(Element)
            playerX = true
        }
        // Disabled the Button after insert the symbol into the box otherwise it override the symbol 
        Element.disabled = true
        checkWinner()

        if (cnt == 8) {
            drawMatch()
        }

    })

})

// For Player1
const playerXFunc = (Element) => {
    cnt++
    let box = Element
    box.innerText = cross
    box.classList.add('text-red-700')
}
// For Player2
const playerOFunc = (Element) => {
    cnt++
    let box = Element
    box.innerText = zero
    box.classList.add('text-green-600')
}

// After  one winner win the Game then disabled all button  to prevent the continue of the game
const disabledBtn = () => {
    gridBtn.forEach((Element) => {
        Element.disabled = true
    })
}
// To show the Winner
const showWinner = (win) => {
    disabledBtn()
    confetti()
    msgContainer.classList.remove('hidden')
    msgContainer.classList.add('flex')
    winnerPlace.innerHTML = `Congratualtion Winner is  ${win}`
}
// To show the Match is draw
let flag = 0
const drawMatch = () => {
    disabledBtn()
    msgContainer.classList.remove('hidden')
    msgContainer.classList.add('flex')
    winnerPlace.innerHTML = `Sorry the Match is Tie`
}
// To check Who is the Winner
const checkWinner = () => {
    for (let pattern of winingPlace) {
        console.log(pattern)
        console.log("-----")
        let pos1Value = gridBtn[pattern[0]]
        let pos2Value = gridBtn[pattern[1]]
        let pos3Value = gridBtn[pattern[2]]
        if (pos1Value.innerText != '' && pos2Value.innerText != '' && pos3Value.innerText != '') {
            if ((pos1Value.innerText == pos2Value.innerText) && (pos2Value.innerText == pos3Value.innerText)) {
                pos1Value.style.backgroundColor = "green"
                pos2Value.style.backgroundColor = "green"
                pos3Value.style.backgroundColor = "green"
                showWinner(pos1Value.innerText)
            }
        }

    }
}
// To restart the Game
resetBtn.addEventListener('click', () => {
    gridBtn.forEach((Element) => {
        msgContainer.classList.add('hidden')
        msgContainer.classList.remove('flex')
        Element.innerText = ''
        Element.disabled = false
        Element.style.backgroundColor = ""
        playerX = false
        Element.classList.remove('text-red-700')
        Element.classList.remove('text-green-600')
        cnt = -1
    })
})

