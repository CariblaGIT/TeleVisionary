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

// Getting the buttons from the controller for the TV settings
const homeButton = document.getElementById("homeButton");
const muteButton = document.getElementById("muteButton");
const guideButton = document.getElementById("guideButton");

// Flag to reset the timeout of clicking repeated buttons of volume and channels
let controlVolumeButtonsTimeout;
let controlChannelButtonsTimeout;
let controlGuideButtonTimeout;

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
const guideListContainer = document.getElementById("guideMenu");

// === SETTING GLOBAL VARIABLES FOR THE INTERACTIONS ===

// Global variable to know the actual state of the screen and the last watched channel
let idLastChannel = "channel1";
let statusTV = false;

// Global variables for the volume bar and the unit of volume inside the ba
let volume = 50;
const volumeUnit = 0.3;
let isMutedTV = false;

// Data from channels
const channels = [
    channel1 = {
        "name": "La 1",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "actualContentName": "The Big Buck Bunny",
        "id" : "channel1"
    },
    channel2 = {
        "name": "La 2",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "actualContentName": "The Elephants Dream",
        "id" : "channel2"
    },
    channel3 = {
        "name": "Antena 3",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "actualContentName": "For Bigger Blazes",
        "id" : "channel3"
    },
    channel4 = {
        "name": "Cuatro",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        "actualContentName": "For Bigger Escapes",
        "id" : "channel4"
    },
    channel5 = {
        "name": "Telecinco",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        "actualContentName": "For Bigger Fun",
        "id" : "channel5"
    },
    channel6 = {
        "name": "LaSexta",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        "actualContentName": "For Bigger Joyrides",
        "id" : "channel6"
    },
    channel7 = {
        "name": "Teledeporte",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        "actualContentName": "For Bigger Meltdowns",
        "id" : "channel7"
    },
    channel8 = {
        "name": "24H",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        "actualContentName": "Sintel",
        "id" : "channel8"
    },
    channel9 = {
        "name": "Neox",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        "actualContentName": "Need for Speed",
        "id" : "channel9"
    }
];

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
        fillGuideList();
        setActualChannelIntoScreen();
        setVideoOnScreen(channelClass);
    } else {
        hideTelevisionGUI();
        removeMenuFromTV();
        removeContentOnScreen();
    }
})

// Up channel button OnClickListener function and the info interactions around it
arrowUpChannelButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        removeMenuFromTV();
        let channelClass = SwapUpChannel(screen.classList[screen.classList.length - 1]);
        screen.classList.remove(screen.classList[screen.classList.length - 1]);
        screen.classList.add(channelClass);
        showInfoInScreen();
        setDateIntoScreen();
        setHourIntoScreen();
        setActualChannelIntoScreen();
        setVideoOnScreen(channelClass);
    }
})

// Down channel button OnClickListener function and the info interactions around it
arrowDownChannelButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        removeMenuFromTV();
        let channelClass = SwapDownChannel(screen.classList[screen.classList.length - 1]);
        screen.classList.remove(screen.classList[screen.classList.length - 1]);
        screen.classList.add(channelClass);
        showInfoInScreen();
        setDateIntoScreen();
        setHourIntoScreen();
        setActualChannelIntoScreen();
        setVideoOnScreen(channelClass);
    }
})

// Up channel button OnClickListener function and the info interactions around it
arrowUpVolumeButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        showVolumeInScreen();
        GoUpVolume();
    }
})

// Down channel button OnClickListener function and the info interactions around it
arrowDownVolumeButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        showVolumeInScreen();
        GoDownVolume();
    }
})

// Home button OnClickListener function to show the TV menu
homeButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        homeButtonInteraction();
    }
})

// Mute button OnClickListener function to remove the volume to the player
muteButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        showVolumeInScreen();
        muteVolumePlayer(isMutedTV);
    }
})

// Guide button OnClickListener function to show a list of channels with their content
guideButton.addEventListener("click", () => {
    if(statusTV){
        hideTelevisionGUI();
        showGuideInScreen();
    }
})

// Mapping all the channel buttons and setting OnClickListener to change between channels and the info interactions around it
arraychannelButtons.map(
    item => {
        item.addEventListener("click", (e) => {
            if(statusTV){
                hideTelevisionGUI();
                removeMenuFromTV();
                screen.classList.remove(screen.classList[screen.classList.length - 1]);
                let channelClass = "channel"+e.target.id;
                saveActualChannel(channelClass);
                screen.classList.add(channelClass);
                showInfoInScreen();
                setDateIntoScreen();
                setHourIntoScreen();
                setActualChannelIntoScreen();
                setVideoOnScreen(channelClass);
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
        idLastChannel = channelToSwap;
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
        idLastChannel = channelToSwap;
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
    volumeNumber.innerHTML = "";
    volumeNumber.innerHTML = volume;
    setVolumeIntoPlayer(volume);
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
    volumeNumber.innerHTML = "";
    volumeNumber.innerHTML = volume;
    setVolumeIntoPlayer(volume);
}

// Function to mute the volume into the player
function muteVolumePlayer(isMuted){
    if(!isMuted){
        screen.volume = 0;
        volumeNumber.innerHTML = "";
        volumeBar.style.height = "0vh";
        volumeNumber.innerHTML = "<i class='bi bi-volume-mute'></i>";
        isMutedTV = true;
    } else {
        setVolumeIntoPlayer(volume);
        volumeNumber.innerHTML = "";
        volumeBar.style.height = (volume * volumeUnit).toString()+"vh";
        volumeNumber.innerHTML = volume;
        isMutedTV = false;
    }
}

// Function to check the boolean to control the TV to switch between On or Off
function switchOnOffTV(isOnOffTV){
    let stateToGive;
    if (isOnOffTV){
        stateToGive = "screenOff";
        statusTV = false;
    } else {
        stateToGive = idLastChannel;
        statusTV = true;
    }
    return stateToGive;
}

// Function called to save the channel, to restore the last channel when you switch off the TV
function saveActualChannel(channel){
    idLastChannel = channel;
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

// Function to set the actual channel into his container refresing the data
function setActualChannelIntoScreen(){
    for (let channel in channels){
        if(channels[channel].id == idLastChannel){
            channelText.innerHTML = channels[channel].name.toUpperCase();
        }
    }
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

function showGuideInScreen(){
    clearTimeout(controlGuideButtonTimeout);
    guideListContainer.style.visibility = "visible";
    controlGuideButtonTimeout = setTimeout(function() {
        guideListContainer.style.visibility = "hidden";
      }, 3000);
}

// Function to hide all interface elements on screen and removing the timeouts of the buttons
function hideTelevisionGUI(){
    clearTimeout(controlVolumeButtonsTimeout);
    clearTimeout(controlChannelButtonsTimeout);
    clearTimeout(controlGuideButtonTimeout);
    volumeContainer.style.visibility = "hidden";
    infoContainer.style.visibility = "hidden";
    guideListContainer.style.visibility = "hidden"
}

// Function to change the url in the video player element
function setVideoOnScreen(channelInput){
    for (let channel in channels){
        if(channels[channel].id == channelInput){
            let url = channels[channel].url;
            screen.src = url;
        }
    }
}

// Function to remove the content inside the TV
function removeContentOnScreen(){
    screen.src = "";
}

// Function to set the variable volume into the player
function setVolumeIntoPlayer(volume){
    screen.volume = (volume/100);
}

// Function to set the TV menu on the screen 
function homeButtonInteraction(){
    screen.src = "";
    screen.poster = "./img/menu.jpg";
}

// Function to remove the TV menu off the screen
function removeMenuFromTV(){
    screen.removeAttribute("poster");
}

// Function to fill guide list with channel list info
function fillGuideList(){
    for (let channel in channels){
        guideListContainer.innerHTML += "<div class='rowGuide col-12'><div id='channelName' class='col-6'>"+channels[channel].name.toUpperCase()+"</div><div id='channelActualContent' class='col-6'>"+channels[channel].actualContentName+"</div></div>";
    }
}

// Clean the guide list
function unfillGuideList(){
    guideListContainer.innerHTML = "";
}