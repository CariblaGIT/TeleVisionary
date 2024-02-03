// === GETTING ELEMENTS FROM HTML ===

// Getting the buttons from the controller, first the channelButtons and after that the power button
const channelButtons = document.getElementsByClassName("channelButtons");
const onOffButton = document.getElementById("powerButton");

// Getting the buttons from the controller, for swapping channels
const arrowUpChannelButton = document.getElementById("arrowUpChannel");
const arrowDownChannelButton = document.getElementById("arrowDownChannel");

// Getting the buttons from the controller, for changing volume
const arrowUpVolumeButton = document.getElementById("arrowUpVolume");
const arrowDownVolumeButton = document.getElementById("arrowDownVolume");
let controlVolumeButtonsTimeout;
let controlChannelButtonsTimeout;

// The buttonChannel HTMLCollection, converted into array
let arraychannelButtons = Array.from(channelButtons);

// Saving screen HTML element on a variable
const screen = document.getElementById("televisionScreen");

// Saving channel, date and hour on screen HTML elements on variables
const channelText = document.getElementById("channelText");
const hourText = document.getElementById("actualTime");
const dateText = document.getElementById("actualDate");
const infoContainer = document.getElementById("info");
const volumeContainer = document.getElementById("volumeContainer");
const volumeNumber = document.getElementById("volumeNumber");
const volumeBar = document.getElementById("barUpDown");

// === SETTING GLOBAL VARIABLES FOR THE INTERACTIONS ===

// Global variable to know the actual state of the screen and the last watched channel
let lastChannel = "channel1";
let statusTV = false;

// Global variables for the volume bar and the unit of volume inside the ba
let volume = 50;
const volumeUnit = 0.3;

// === ONCLICK LISTENERS FOR ALL THE BUTTONS ===

// Power button OnClickListener function and the info interactions around it
onOffButton.addEventListener("click", () => {
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    let channelClass = switchOnOffTV(statusTV);
    screen.classList.add(channelClass);
    if(channelClass != "screenOff"){
        showInfoInScreen();
        setDateIntoScreen();
        setHourIntoScreen();
        setActualChannelIntoScreen();
    } else {
        hideTelevisionGUI();
    }
})

// Up channel button OnClickListener function and the info interactions around it
arrowUpChannelButton.addEventListener("click", () => {
    if(statusTV){
        let channelClass = SwapUpChannel(screen.classList[screen.classList.length - 1]);
        screen.classList.remove(screen.classList[screen.classList.length - 1]);
        screen.classList.add(channelClass);
        showInfoInScreen();
        setDateIntoScreen();
        setHourIntoScreen();
        setActualChannelIntoScreen();
    }
})

// Down channel button OnClickListener function and the info interactions around it
arrowDownChannelButton.addEventListener("click", () => {
    if(statusTV){
        let channelClass = SwapDownChannel(screen.classList[screen.classList.length - 1]);
        screen.classList.remove(screen.classList[screen.classList.length - 1]);
        screen.classList.add(channelClass);
        showInfoInScreen();
        setDateIntoScreen();
        setHourIntoScreen();
        setActualChannelIntoScreen();
    }
})

// Up channel button OnClickListener function and the info interactions around it
arrowUpVolumeButton.addEventListener("click", () => {
    if(statusTV){
        showVolumeInScreen();
        GoUpVolume();
    }
})

// Down channel button OnClickListener function and the info interactions around it
arrowDownVolumeButton.addEventListener("click", () => {
    if(statusTV){
        showVolumeInScreen();
        GoDownVolume();
    }
})

// Mapping all the channel buttons and setting OnClickListener to change between channels and the info interactions around it
arraychannelButtons.map(
    item => {
        item.addEventListener("click", (e) => {
            if(statusTV){
                screen.classList.remove(screen.classList[screen.classList.length - 1]);
                let channelClass = "channel"+e.target.id;
                saveActualChannel(channelClass);
                screen.classList.add(channelClass);
                showInfoInScreen();
                setDateIntoScreen();
                setHourIntoScreen();
                setActualChannelIntoScreen();
            }
        })
    }
);

// === FUNCTIONS FOR THE LISTENERS TO ACCESS GLOBAL VARIABLES ===

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

// Function to increase the volume
function GoUpVolume(){
    let increasedVolume;
    volume == 100
        ? increasedVolume = 100
        : increasedVolume = volume + 1
    let barHeight = (increasedVolume * volumeUnit).toString()+"vh";
    volume = increasedVolume;
    volumeBar.style.height = barHeight;
    volumeNumber.innerHTML = volume;
}

// Function to decrease the volume
function GoDownVolume(){
    let decreasedVolume;
    volume == 0
        ? decreasedVolume = 0
        : decreasedVolume = volume - 1
    let barHeight = (decreasedVolume * volumeUnit).toString()+"vh";
    volume = decreasedVolume;
    volumeBar.style.height = barHeight;
    volumeNumber.innerHTML = volume;
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

// === UTILITY FUNCTIONS ===

// Function to get the actual hour in format HH:MM
function getTimeInHoursMins(){
    const now = new Date();
    let mins = now.getMinutes().toString();
    let hours = now.getHours().toString();
    if (mins.length == 1){
        mins = "0"+mins;
    }
    if (hours.length == 1){
        mins = "0"+mins;
    }
    return (hours+":"+mins);
}

// Function to get the actual date in format DD/MM/YYYY
function getDate(){
    const now = new Date();
    let day = now.getDate().toString();
    let year = now.getFullYear().toString();
    let month = (now.getMonth() + 1).toString();
    if (day.length == 1){
        day = "0"+day;
    }
    if (month.length == 1){
        month = "0"+month;
    }
    return day+"/"+month+"/"+year;
}

// Function to set the date info into his container refresing the data
function setDateIntoScreen(){
    let date = getDate();
    dateText.innerHTML = date;
}

// Function to set the hour info into his container refresing the data
function setHourIntoScreen(){
    let time = getTimeInHoursMins();
    hourText.innerHTML = time;
}

function setActualChannelIntoScreen(){
    channelText.innerHTML = lastChannel;
}

// Function to show the info container to show info and make it dissapear 3 secs after is shown
function showInfoInScreen(){
    clearTimeout(controlChannelButtonsTimeout);
    infoContainer.style.visibility = "visible";
    controlChannelButtonsTimeout = setTimeout(function() {
        infoContainer.style.visibility = "hidden";
      }, 3000);
}

// Function to show the volume container to show info and make it dissapear 5 secs after is shown
function showVolumeInScreen(){
    clearTimeout(controlVolumeButtonsTimeout);
    volumeContainer.style.visibility = "visible";
    controlVolumeButtonsTimeout = setTimeout(function() {
        volumeContainer.style.visibility = "hidden";
      }, 3000);
}

function hideTelevisionGUI(){
    clearTimeout(controlVolumeButtonsTimeout);
    clearTimeout(controlChannelButtonsTimeout);
    volumeContainer.style.visibility = "hidden";
    infoContainer.style.visibility = "hidden";
}