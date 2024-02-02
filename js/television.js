// === GETTING ELEMENTS FROM HTML ===

// Getting the buttons from the controller, first the channelButtons and after that the power button
const channelButtons = document.getElementsByClassName("channelButtons");
const onOffButton = document.getElementById("powerButton");

// Getting the buttons from the controller, for swapping channels
const arrowUpChannelButton = document.getElementById("arrowUpChannel");
const arrowDownChannelButton = document.getElementById("arrowDownChannel");

// The buttonChannel HTMLCollection, converted into array
let arraychannelButtons = Array.from(channelButtons);

// Saving screen HTML element on a variable
const screen = document.getElementById("televisionScreen");

// Global variable to know the actual state of the screen and the last watched channel
let lastChannel = "channel1";
let statusTV = false;

// Power button OnClickListener function 
onOffButton.addEventListener("click", () => {
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    let channelClass = switchOnOffTV(statusTV);
    screen.classList.add(channelClass);
})

// Up channel button OnClickListener function 
arrowUpChannelButton.addEventListener("click", () => {
    let channelClass = SwapUpChannel(screen.classList[screen.classList.length - 1]);
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    screen.classList.add(channelClass);
})

// Down channel button OnClickListener function 
arrowDownChannelButton.addEventListener("click", () => {
    let channelClass = SwapDownChannel(screen.classList[screen.classList.length - 1]);
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    screen.classList.add(channelClass);
})

// Mapping all the channel buttons and setting OnClickListener to change between channels
arraychannelButtons.map(
    item => {
        item.addEventListener("click", (e) => {
            screen.classList.remove(screen.classList[screen.classList.length - 1]);
            let channelClass = "channel"+e.target.id;
            saveActualChannel(channelClass);
            screen.classList.add(channelClass);
        })
    }
);

// Function to swap Up the channel
function SwapUpChannel(screenState){
    if(statusTV){
        let number = parseInt(screenState.slice(-1));
        let channelToSwap;
        number == 9
            ? channelToSwap = "channel1"
            : channelToSwap = "channel"+(number+1);
        lastChannel = channelToSwap;
        return channelToSwap;
    } else {
        return "screenOff";
    }
}

// Function to swap Down the channel
function SwapDownChannel(screenState){
    if(statusTV){
        let number = parseInt(screenState.slice(-1));
        let channelToSwap;
        number == 1
            ? channelToSwap = "channel9"
            : channelToSwap = "channel"+(number-1);
        lastChannel = channelToSwap;
        return channelToSwap;
    } else {
        return "screenOff";
    } 
}

// Function to check the boolean to control the TV to switch between On or Off
function switchOnOffTV(isOnOffTV){
    let stateToGive;
    if (isOnOffTV){
        stateToGive = "screenOff";
        statusTV = false;
    } else {
        stateToGive = lastChannel;
        statusTV = true;
    }
    return stateToGive;
}

// Function called to save the channel, to restore the last channel when you switch off the TV
function saveActualChannel(channel){
    lastChannel = channel;
}