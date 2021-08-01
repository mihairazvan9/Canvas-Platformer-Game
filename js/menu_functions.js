let sec = 00
let mil = 0
let cron


/**
 * TIMER START
 */
function start_t(){
    cron = setInterval(() =>{time()}, 10)
}

/**
 * TIMER PAUSE
 */
function pause_t(){
    clearInterval(cron)
}

/**
 * TIMER RESET
 */
 function reset_t(){
    sec = 0
    mil = 0
}

/**
 * LOCAL STORAGE TIME&NAME
 */
function save_score(){
    clearInterval(cron)
    document.getElementById('sec').innerText = return_data(sec) 
}

/**
 * TIMER
 */
function time(){
    if((mil += 10) == 1000){
        mil = 0
        sec++
    }
    // if(sec == 60){
    //     sec = 0
    //     min++
    // }
}

function return_data(input) {
    return input > 10 ? input : '0' + input
}

/**
 * 
 * RESTART MENU
 * 
 */
 function restart(){
    let game_over = document.getElementById('game_over')
    game_over.style.display = 'block'
    game_over.style.width = 350 + 'px'
    game_over.style.height = 400 + 'px'
    game_over.style.marginLeft = window.innerWidth / 2 - 175 + 'px'
    game_over.style.marginTop = window.innerHeight / 2 - 200 + 'px'  
}

/**
 * 
 * WIN MENU
 * 
 */
 function win(){
    let game_over = document.getElementById('win')
    game_over.style.display = 'block'
    game_over.style.width = 350 + 'px'
    game_over.style.height = 400 + 'px'
    game_over.style.marginLeft = window.innerWidth / 2 - 175 + 'px'
    game_over.style.marginTop = window.innerHeight / 2 - 200 + 'px'  
}

function game_over_click(){
    let gm = game_over_temp()
    reset_t()
    return window.__GAME__ = new Game()

    function game_over_temp() {
        start_t()
        return document.getElementById('game_over').style.display = 'none'
    }
}

function go_to_menu_click(){
    menu()
    reset_t()
    document.getElementById('game_over').style.display = 'none'
    document.getElementById('win').style.display = 'none'
    document.getElementById('background_help').style.display = 'none'
}

/**
 * 
 * MAIN MENU
 * 
 */
function menu(){
    let background_menu = document.getElementById('background_menu')
    let menu = document.getElementById('menu')

    background_menu.style.display = 'block'
    background_menu.style.width = 800 + 'px'
    background_menu.style.height = 600 + 'px'
    background_menu.style.background = '#0A043C'
    background_menu.style.marginLeft = window.innerWidth / 2 - 400 + 'px'
    background_menu.style.marginTop = window.innerHeight / 2 - 300 + 'px'

    menu.style.width = 350 + 'px'
    menu.style.height = 400 + 'px'
    menu.style.marginLeft = 225 + 'px'
    menu.style.marginTop = 100 + 'px'
}

/**
 * 
 * HELP MENU
 * 
 */
function help(){
    let background_menu = document.getElementById('background_help')
    let menu = document.getElementById('help_menu')
    document.getElementById('background_menu').style.display = 'none'

    background_menu.style.display = 'block'
    background_menu.style.width = 800 + 'px'
    background_menu.style.height = 600 + 'px'
    background_menu.style.background = '#0A043C'
    background_menu.style.marginLeft = window.innerWidth / 2 - 400 + 'px'
    background_menu.style.marginTop = window.innerHeight / 2 - 300 + 'px'

    menu.style.width = 350 + 'px'
    menu.style.height = 400 + 'px'
    menu.style.marginLeft = 225 + 'px'
    menu.style.marginTop = 100 + 'px'
}


function start_game_click(){
    let gm = start_game_temp()
    return window.__GAME__ = new Game()

    function start_game_temp() {
        start_t()
        return document.getElementById('background_menu').style.display = 'none'
    }
}



