document.addEventListener('DOMContentLoaded', () =>{

    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0

    //create playing field
    function createBoard() {

        for (let i = 0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()
   

    //generate a number in random position
    function generate() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver()
        } else generate()
        
    }
    
    //swipe right
    function moveRight() {
        for (let i = 0; i < width*width; i++ ) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]


                let filteredRow = row.filter(num => num)
                let missing = width - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

     //swipe left
     function moveLeft() {
        for (let i = 0; i < width*width; i++ ) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]


                let filteredRow = row.filter(num => num)
                let missing = width - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    //swipe down
    function moveDown() {
        for (let i = 0; i < width; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+(width)].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = width - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]
        }
    }

     //swipe up
     function moveUp() {
        for (let i = 0; i < width; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+(width)].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = width - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]
        }
    }

    function combineRow() {
        for (let i = 0; i < (width*width)-1; i++) {
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combineTotal = parseInt(squares[i].innerHTML)  + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+1].innerHTML = 0    
                score += combineTotal
                scoreDisplay.innerHTML = score  
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < width*(width-1); i++) {
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combineTotal = parseInt(squares[i].innerHTML)  + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+width].innerHTML = 0      
                score += combineTotal
                scoreDisplay.innerHTML = score  
            }
        }
        checkForWin()
    }

    //assign KeyCodes
    function control(e) {
        if(e.keyCode === 39){
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyDown()
        } else if (e.keyCode === 40) {
            keyUp()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }
    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function checkForWin(){
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You WIN! 🥳"
                document.removeEventListener('keyup', control)
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
           
            if (squares[i].innerHTML == 0){
                zeros++;
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = "You LOOSE! 😓"
            document.removeEventListener('keyup', control)
        }
    }
})