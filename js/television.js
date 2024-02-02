// Getting the buttons from the controller, first the channelButtons and after that the power button
const channelButtons = document.getElementsByClassName("channelButtons");
const onOffButton = document.getElementById("powerButton");

// The buttonChannel HTMLCollection, converted into array
let arraychannelButtons = Array.from(channelButtons);

// Saving screen HTML element on a variable
const screen = document.getElementById("televisionScreen");

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