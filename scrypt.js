let field = document.getElementsByClassName('field');
let stone = document.getElementsByClassName('stone');
let game = document.getElementById('game');
let xf = 1,
    yf = 10,
    xs = 1,
    xy = 10

for(let i = 0; i < 100; i++) {
    document.getElementById('game').innerHTML += '<div class="field"></div>';
    if(xf > 10){
        xf = 1;
        yf--;
    }
    field[i].setAttribute("posX", xf);
    field[i].setAttribute("posY", yf);
    xf++;
}


//create player
let getout = [1, 10];
let generatePlayer = [2, 2];
let playerBody = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
let inventory = [0, 0, 0, 0];
let invSwitcher = true;
let invDiv = document.createElement('div');
    invDiv.classList.add('inventwrapper');
    invDiv.id = 'invDiv';
    invDiv.style.display = 'none';
    document.body.appendChild(invDiv);
    for(let i = 0; i < inventory.length; i++) {
        document.getElementById('invDiv').innerHTML += '<div class="invent"></div>';
    }
let posPlayer = 0;

playerBody[0].classList.add('playerUp');


function removePlayers() {
    playerBody[0].classList.remove('playerUp');
    playerBody[0].classList.remove('playerLeft');
    playerBody[0].classList.remove('playerDown');
    playerBody[0].classList.remove('playerRight');
}

//create ores
let oreArr = [];

let obgOres = {
    coal: 0,
    iron: 1
}

function oreRandom() {
    let oreRandomPosX = Math.floor(Math.random() * (9 - 7) + 7);
    let oreRandomPosY = Math.floor(Math.random() * (9 - 7) + 7);
    return [oreRandomPosX, oreRandomPosY];
}

let coalOreSpawn = () => {
    let coalOre;
    let coordinatesOre = oreRandom();
    coalOre = [document.querySelector('[posx = "'+ coordinatesOre[0] +'"][posy = "'+ coordinatesOre[1] +'"]')];
    coalOre[0].classList.add('coal');
    while(coalOre[0].className == 'field iron') {
        console.log('coal');
        coalOre[0].classList.remove('coal');
        let coordinatesOre = oreRandom();
        coalOre = [document.querySelector('[posx = "'+ coordinatesOre[0] +'"][posy = "'+ coordinatesOre[1] +'"]')];
        coalOre[0].classList.add('coal');
        return;
    } 

    return oreArr[obgOres.coal] = (coordinatesOre);
}
coalOreSpawn();
function ironOreSpawn() {
    let ironOre;
    let coordinatesOre = oreRandom();
    ironOre = [document.querySelector('[posx = "'+ coordinatesOre[0] +'"][posy = "'+ coordinatesOre[1] +'"]')];
    ironOre[0].classList.add('iron');
    while(ironOre[0].className == 'field coal') {
        ironOre[0].classList.remove('iron');
        let coordinatesOre = oreRandom();
        ironOre = [document.querySelector('[posx = "'+ coordinatesOre[0] +'"][posy = "'+ coordinatesOre[1] +'"]')];
        ironOre[0].classList.add('iron');
        return;
    } 
    return oreArr[obgOres.iron] = (coordinatesOre);
}
ironOreSpawn();

//control
var kinput = document.getElementById('kinput');
kinput.onkeydown = handle;
function handle(e) {
  
  moving(e);
}

function moving(e){
  switch (e.keyCode) {
    case 37: 
    if(generatePlayer[0] == 1) {
        break;
    } else{
        moveLeft();
    }
    break;
    case 38: 
    if(generatePlayer[1] == 10) {
        break;
    } else{
        moveUp();
    }
    break;
    case 39:
    if(generatePlayer[0] == 10) {
        break;
    } else{
        moveRight();
    }
    break;
    case 40: 
    if(generatePlayer[1] == 1) {
        break;
    } else {
        moveDown();
    }
    break;
    case 32: //backspace
    crashOre();
    break;
    case 73: //i
    
    if(invSwitcher){
        invDiv.style.display = 'block';
        invSwitcher = false;
    } else {
        invDiv.style.display = 'none';
        invSwitcher = true;
    }
    break;
    default: break;
  }
  console.log(e.keyCode);
}
let moveRight = () => {
    for(let i = 0; i < oreArr.length; i++) {
        if(generatePlayer[0] == oreArr[i][0] - 1 && generatePlayer[1] == oreArr[i][1]) {
            removePlayers();
            playerBody[0].classList.add('playerRight');
            posPlayer = 1;
            return;
        }
    }
    removePlayers();
    generatePlayer[0]++;
    playerBody = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
    playerBody[0].classList.add('playerRight');
    posPlayer = 1;
}

let moveLeft = () => {
    for(let i = 0; i < oreArr.length; i++) {
        if(generatePlayer[0] == oreArr[i][0] + 1 && generatePlayer[1] == oreArr[i][1]){
            removePlayers();
            playerBody[0].classList.add('playerLeft');
            posPlayer = 3;
            return;
        }
    }
    removePlayers();
    generatePlayer[0]--;
    playerBody = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
    playerBody[0].classList.add('playerLeft');
    posPlayer = 3;
}

let moveUp = () => {
    for(let i = 0; i < oreArr.length; i++) {
        if(generatePlayer[0] == oreArr[i][0] && generatePlayer[1] == oreArr[i][1] - 1) {
            removePlayers();
            playerBody[0].classList.add('playerUp');
            posPlayer = 0;
            return;
        }
    }
    removePlayers();
    generatePlayer[1]++;
    playerBody = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
    playerBody[0].classList.add('playerUp');
    posPlayer = 0;
}

let moveDown = () => {
    for(let i = 0; i < oreArr.length; i++) {
        if(generatePlayer[0] == oreArr[i][0] && generatePlayer[1] == oreArr[i][1] + 1) {
            removePlayers();
            playerBody[0].classList.add('playerDown');
            posPlayer = 2;
            return;
        }
    }
    removePlayers();
    generatePlayer[1]--;
    playerBody = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
    playerBody[0].classList.add('playerDown');
    posPlayer = 2;
}
let inventoryFunc = () => {
    let inventArr = document.getElementsByClassName('invent');

    for(let i = 0; i < inventory.length; i++) {
        switch(i) {
            case 0: if(inventory[0] != 0) {
                inventArr[0].style.backgroundImage = 'url(/img/coalOreItem1.png)';
                inventArr[0].innerHTML = inventory[0];
            }
            case 1: if(inventory[1] != 0) {
                inventArr[1].style.backgroundImage = 'url(/img/ironOreIconNew.png)';
                inventArr[1].innerHTML = inventory[1];
            }
        }
    }
}
inventoryFunc();
let crashOre = () => {
    switch(posPlayer) {
        case 1: if(generatePlayer[0] + 1) {
            ore = [document.querySelector('[posx = "'+ (generatePlayer[0] + 1) +'"][posy = "'+ generatePlayer[1] +'"]')];
            switch(ore[0].className){
                case 'field coal':
                ore[0].classList.remove('coal');
                oreArr[obgOres.coal]--;
                inventory[0]++;
                break;
                case 'field iron':
                ore[0].classList.remove('iron');
                oreArr[obgOres.iron]--;
                inventory[1]++;
                break;
            }
        }
        case 3: if(generatePlayer[0] - 1) {
            ore = [document.querySelector('[posx = "'+ (generatePlayer[0] - 1) +'"][posy = "'+ generatePlayer[1] +'"]')];
            switch(ore[0].className){
                case 'field coal':
                ore[0].classList.remove('coal');
                oreArr[obgOres.coal]--;
                inventory[0]++;
                break;
                case 'field iron':
                ore[0].classList.remove('iron');
                oreArr[obgOres.iron]--;
                inventory[1]++;
                break;
            }
        }
        case 0: if(generatePlayer[1] + 1) {
            ore = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ (generatePlayer[1] + 1) +'"]')];
            switch(ore[0].className){
                case 'field coal':
                ore[0].classList.remove('coal');
                oreArr[obgOres.coal]--;
                inventory[0]++;
                break;
                case 'field iron':
                ore[0].classList.remove('iron');
                oreArr[obgOres.iron]--;
                inventory[1]++;
                break;
            }
        }
        case 2: if(generatePlayer[1] - 1) {
            ore = [document.querySelector('[posx = "'+ generatePlayer[0] +'"][posy = "'+ (generatePlayer[1] - 1) +'"]')];
            switch(ore[0].className){
                case 'field coal':
                ore[0].classList.remove('coal');
                oreArr[obgOres.coal]--;
                inventory[0]++;
                break;
                case 'field iron':
                ore[0].classList.remove('iron');
                oreArr[obgOres.iron]--;
                inventory[1]++;
                break;
            }
        }
    }
    inventoryFunc();
}
    

// getoutfunc();
let lvl2 = () => {
    for(let i = 0; i < 100; i++) {
        field[i].style.display = 'none';
        document.getElementById('game').innerHTML += '<div class="stone"></div>';
        if(xs > 10){
            xs = 1;
            xy--;
        }
        stone[i].setAttribute("posX", xs);
        stone[i].setAttribute("posY", xy);
        xs++;
    }
    exit = [document.querySelector('div.stone[posx = "'+ getout[0] +'"][posy = "'+ getout[1] +'"]')];
    exit[0].classList.add('exit');
    playerBody = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
    playerBody[0].classList.add('playerUp');

    moveRight = () => {
        for(let i = 0; i < oreArr.length; i++) {
            if(generatePlayer[0] == oreArr[i][0] - 1 && generatePlayer[1] == oreArr[i][1]) {
                removePlayers();
                playerBody[0].classList.add('playerRight');
                posPlayer = 1;
                return;
            }
        }
        removePlayers();
        generatePlayer[0]++;
        playerBody = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
        playerBody[0].classList.add('playerRight');
        posPlayer = 1;
    }
    moveLeft = () => {
        
        for(let i = 0; i < oreArr.length; i++) {
            if(generatePlayer[0] == oreArr[i][0] + 1 && generatePlayer[1] == oreArr[i][1]){
                removePlayers();
                playerBody[0].classList.add('playerLeft');
                posPlayer = 3;
                return;
            }
        }
        removePlayers();
        generatePlayer[0]--;
        playerBody = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
        playerBody[0].classList.add('playerLeft');
        posPlayer = 3;
        if(generatePlayer[0] == getout[0] && generatePlayer[1] == getout[1]) return;
    }
    moveUp = () => {
        for(let i = 0; i < oreArr.length; i++) {
            if(generatePlayer[0] == oreArr[i][0] && generatePlayer[1] == oreArr[i][1] - 1) {
                removePlayers();
                playerBody[0].classList.add('playerUp');
                posPlayer = 0;
                return;
            }
        }
        removePlayers();
        generatePlayer[1]++;
        playerBody = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
        playerBody[0].classList.add('playerUp');
        posPlayer = 0;
    }
    moveDown = () => {
        for(let i = 0; i < oreArr.length; i++) {
            if(generatePlayer[0] == oreArr[i][0] && generatePlayer[1] == oreArr[i][1] + 1) {
                removePlayers();
                playerBody[0].classList.add('playerDown');
                posPlayer = 2;
                return;
            }
        }
        removePlayers();
        generatePlayer[1]--;
        playerBody = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ generatePlayer[1] +'"]')];
        playerBody[0].classList.add('playerDown');
        posPlayer = 2;
    }

    coalOreSpawn = () => {
        let coalOre;
        let coordinatesOre = oreRandom();
        coalOre = [document.querySelector('div.stone[posx = "'+ coordinatesOre[0] +'"][posy = "'+ coordinatesOre[1] +'"]')];
        coalOre[0].classList.add('coal');
        while(coalOre[0].className == 'iron') {
            console.log('coal');
            coalOre[0].classList.remove('coal');
            let coordinatesOre = oreRandom();
            coalOre = [document.querySelector('div.stone[posx = "'+ coordinatesOre[0] +'"][posy = "'+ coordinatesOre[1] +'"]')];
            coalOre[0].classList.add('coal');
            return;
        } 
        return oreArr[obgOres.coal] = (coordinatesOre);
    }
    coalOreSpawn();
    crashOre = () => {
        switch(posPlayer) {
            case 1: if(generatePlayer[0] + 1) {
                ore = [document.querySelector('div.stone[posx = "'+ (generatePlayer[0] + 1) +'"][posy = "'+ generatePlayer[1] +'"]')];
                switch(ore[0].className){
                    case 'coal':
                    ore[0].classList.remove('coal');
                    oreArr[obgOres.coal]--;
                    inventory[0]++;
                    break;
                    case 'iron':
                    ore[0].classList.remove('iron');
                    oreArr[obgOres.iron]--;
                    inventory[1]++;
                    break;
                }
            }
            case 3: if(generatePlayer[0] - 1) {
                ore = [document.querySelector('div.stone[posx = "'+ (generatePlayer[0] - 1) +'"][posy = "'+ generatePlayer[1] +'"]')];
                switch(ore[0].className){
                    case 'coal':
                    ore[0].classList.remove('coal');
                    oreArr[obgOres.coal]--;
                    inventory[0]++;
                    break;
                    case 'iron':
                    ore[0].classList.remove('iron');
                    oreArr[obgOres.iron]--;
                    inventory[1]++;
                    break;
                }
            }
            case 0: if(generatePlayer[1] + 1) {
                ore = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ (generatePlayer[1] + 1) +'"]')];
                switch(ore[0].className){
                    case 'coal':
                    ore[0].classList.remove('coal');
                    oreArr[obgOres.coal]--;
                    inventory[0]++;
                    break;
                    case 'iron':
                    ore[0].classList.remove('iron');
                    oreArr[obgOres.iron]--;
                    inventory[1]++;
                    break;
                }
            }
            case 2: if(generatePlayer[1] - 1) {
                ore = [document.querySelector('div.stone[posx = "'+ generatePlayer[0] +'"][posy = "'+ (generatePlayer[1] - 1) +'"]')];
                switch(ore[0].className){
                    case 'field coal':
                    ore[0].classList.remove('coal');
                    oreArr[obgOres.coal]--;
                    inventory[0]++;
                    break;
                    case 'field iron':
                    ore[0].classList.remove('iron');
                    oreArr[obgOres.iron]--;
                    inventory[1]++;
                    break;
                }
            }
        }
        inventoryFunc();
    }
}

// lvl2();
alert( 0.1 + 0.2      );