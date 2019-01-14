let order = [];
let playerOrder = [];
let flash = [];
let turn = [];
let good = [];
let computerTurn = [];
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
    if(strictButton.checked == true){
        strict = true;
    }else{
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "ON";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalID);
    }
});

startButton.addEventListener('click', (event) => {
    if(on || win){
        play();
    }
});

play = () =>  {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalID = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++){
        order.push(Math.floor(Math.random() * 4 ) + 1 );
    }
    computerTurn = true;
    intervalID = setInterval(gameTurn,800)
        
};

gameTurn = () =>{
    on = false;
    if(flash == turn){
        clearInterval(intervalID);
        computerTurn=false;
        clearColor();
        on=true;
    }
    if(computerTurn) {
        clearColor();
        setTimeout(()=>{
            if(order[flash] == 1 ) one();
            if(order[flash] == 2 ) two();
            if(order[flash] == 3 ) three();
            if(order[flash] == 4 ) four();
            flash++;
        }, 200);
    }
};

one = () =>{
    if (noise){
        let audio = document.querySelector("#clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen"
};

two = () =>{
    if (noise){
        let audio = document.querySelector("#clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
};

three = () =>{
    if (noise){
        let audio = document.querySelector("#clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow"
};

four = () =>{
    if (noise){
        let audio = document.querySelector("#clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
};

clearColor = () =>{
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
};
flashColor = () =>{
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
};

topLeft.addEventListener('click', (event) =>{
    if(on){
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});
topRight.addEventListener('click', (event) =>{
    if(on){
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});
bottomLeft.addEventListener('click', (event) =>{
    if(on){
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});
bottomRight.addEventListener('click', (event) =>{
    if(on){
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});

function check(){
    if (playerOrder[playerOrder.length -1] !== order[playerOrder.length -1]) good=false;

    if(playerOrder.length == 20 && good){
        winGame();
    }
    if(good == false){
        flashColor();
        turnCounter.innerHTML = "NO";
        setTimeout(()=>{
            turnCounter.innerHTML = turn;
            clearColor();

            if(strict){
                play();
            }else{
                computerTurn = true;
                flash = 0;
                playerOrder=[];
                good=true;
                intervalID=setInterval(gameTurn,800);
            }
        },800);

        noise=false;
    }
    if(turn == playerOrder.length  && good && !win){
        turn++;
        playerOrder = [];
        computerTurn = true;
        flash=0;
        turnCounter.innerHTML = turn;
        intervalID = setInterval(gameTurn,800);
    }
}

function winGame(){
    flashColor();
    turnCounter.innerHTML = "WIN";
    on = false;
    win=true;
}
//end of game code...

window.onload = function () {
    if (document.cookie.length != 0 ){
        var nameValueArray = document.cookie.split("=");
        documemnt.track = nameValueArray[1];
        document.getElementById("redAlert").value = nameValueArray[1];
    }
}
//function setIpAddressCookie(){
    //let 
//}