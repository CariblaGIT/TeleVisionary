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

// Global variable to know the actual state of the screen
let screenState = screen.classList;

// Power button OnClickListener function 
onOffButton.addEventListener("click", () => {
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    let channelClass = "screenOff";
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

// Power button OnClickListener function 
onOffButton.addEventListener("click", () => {
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    let channelClass = "screenOff";
    screen.classList.add(channelClass);
})

// Mapping all the channel buttons and setting OnClickListener to change between channels
arraychannelButtons.map(
    item => {
        item.addEventListener("click", (e) => {
            screen.classList.remove(screen.classList[screen.classList.length - 1]);
            let channelClass = "channel"+e.target.id;
            screen.classList.add(channelClass);
        })
    }
);

// Function to swap Up the channel
function SwapUpChannel(screenState){
    let number = parseInt(screenState.slice(-1));
    let channelToSwap;
    number == 9
        ? channelToSwap = "channel1"
        : channelToSwap = "channel"+(number+1);
    console.log(channelToSwap);
    return channelToSwap;
}

// Function to swap Down the channel
function SwapDownChannel(screenState){
    let number = parseInt(screenState.slice(-1));
    let channelToSwap;
    number == 1
        ? channelToSwap = "channel9"
        : channelToSwap = "channel"+(number-1);
    console.log(channelToSwap);
    return channelToSwap;
}