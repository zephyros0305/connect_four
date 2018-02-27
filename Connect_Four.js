var player1 = prompt("Play1: Enter your name, your will be Blue.")
var player1color = 'rgb(30, 144, 255)'

var player2 = prompt("Play2: Enter your name, your will be Red.")
var player2color = 'rgb(240, 128, 128)'

var currentPlayer = 0
var currentPlayerName = player1
var currentColor = player1color
var table = $('table tr')

$('h3').text(currentPlayerName+": it is your turn, please pick a column to drop your blue chip.")

function changePlayer(){
	currentPlayer = (currentPlayer+1)%2
	if (currentPlayer === 0) {
		currentPlayerName = player1
		currentColor = player1color
	} else{
		currentPlayerName = player2
		currentColor = player2color
	}
	$('h3').text(currentPlayerName+": it is your turn, please pick a column to drop your blue chip.")
}
function returnColor(rowIndex, colIndex){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}
function checkBottom(colIndex){
	var colorReport = returnColor(5, colIndex%7)
	for (var row = 5; row >= 0; row--){
		colorReport = returnColor(row, colIndex%7)
		if (colorReport === 'rgb(128, 128, 128)') {
			return row
		}
	}
	return -1
}
function markChip(rowIndex, colIndex){
	table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', currentColor)
}
function checkColorMatch(one, two, three, four){
	return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
}
function checkHorizontalWin(){
	for (var row=0; row<6; row++){
		for (var col=0; col<4; col++){
			if (checkColorMatch(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))) {
				console.log('horiWin')
				return true
			}
		}
	}
	return false
}
function checkVerticalWin(){
	for (var col=0; col<7; col++){
		for (var row=0; row<3; row++){
			if (checkColorMatch(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
				console.log('vertWin')
				return true
			}
		}
	}
	return false
}
function checkDiagonalWin(){
	for (var row=0; row<3; row++){
		for (var col=0; col<7; col++){
			if (checkColorMatch(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
				console.log('diagWin')
				return true
			} else if (checkColorMatch(returnColor(row, col), returnColor(row+1, col-1), returnColor(row+2, col-2), returnColor(row+3, col-3))){
				console.log('diagWin')
				return true
			}
		}
	}
	return false
}
function restartGame(){
	$('h1').text("Welcome to Connect Four!")
	$('h3').fadeIn('fast');
	$('h2').fadeIn('fast');
	currentPlayer = 0
	currentPlayerName = player1
	currentColor = player1color
	$('h3').text(currentPlayerName+": it is your turn, please pick a column to drop your blue chip.")
	$('button').attr('disabled', false).css('background-color', 'rgb(128, 128, 128)')
}
function reportWin(){
	$('h3').fadeOut('fast');
	$('h2').fadeOut('fast');
	$('h1').text(currentPlayerName+" has won!")
	$('button').attr('disabled', true)
}
$('#restart').on('click', restartGame)
$('button').on('click', function(){
	colIndex = $('button').index(this) % 7
	if (checkBottom(colIndex) > -1){
		markChip(checkBottom(colIndex), colIndex)
		if(checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()){
			reportWin()
			console.log('game over')
		}
		changePlayer()
	}
})