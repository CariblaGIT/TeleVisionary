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

// Saving channel, date, volume, guide and leds of HTML elements into variables
const channelText = document.getElementById("channelText");
const hourText = document.getElementById("actualTime");
const dateText = document.getElementById("actualDate");
const infoContainer = document.getElementById("info");
const volumeContainer = document.getElementById("volumeContainer");
const volumeNumber = document.getElementById("volumeNumber");
const volumeBar = document.getElementById("barUpDown");
const guideListContainer = document.getElementById("guideMenu");
const ledSwitchOnOff = document.getElementById("ledOnOffTV");

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
        "url": "./img/tvContent/GrandPrix.mp4",
        "actualContentName": "Grand Prix",
        "id" : "channel1"
    },
    channel2 = {
        "name": "La 2",
        "url": "./img/tvContent/SaberYGanar.mp4",
        "actualContentName": "Saber Y Ganar",
        "id" : "channel2"
    },
    channel3 = {
        "name": "Antena 3",
        "url": "./img/tvContent/LaRuleta.mp4",
        "actualContentName": "La Ruleta de la Suerte",
        "id" : "channel3"
    },
    channel4 = {
        "name": "Cuatro",
        "url": "./img/tvContent/Supernanny.mp4",
        "actualContentName": "SupperNanny",
        "id" : "channel4"
    },
    channel5 = {
        "name": "Telecinco",
        "url": "./img/tvContent/Pasapalabra.mp4",
        "actualContentName": "Pasapalabra",
        "id" : "channel5"
    },
    channel6 = {
        "name": "LaSexta",
        "url": "./img/tvContent/ElIntermedio.mp4",
        "actualContentName": "El Intermedio",
        "id" : "channel6"
    },
    channel7 = {
        "name": "Teledeporte",
        "url": "./img/tvContent/Quebrantahuesos.mp4",
        "actualContentName": "Quebrantahuesos",
        "id" : "channel7"
    },
    channel8 = {
        "name": "Neox",
        "url": "./img/tvContent/NEXT.mp4",
        "actualContentName": "NEXT",
        "id" : "channel8"
    },
    channel9 = {
        "name": "Canal 9",
        "url": "./img/tvContent/Babaclub.mp4",
        "actualContentName": "BabaClub",
        "id" : "channel9"
    }
];

// === ONCLICK LISTENERS FOR ALL THE BUTTONS ===

// Power button OnClickListener function and the info interactions around it
onOffButton.addEventListener("click", () => {
    screen.classList.remove(screen.classList[screen.classList.length - 1]);
    let channelClass = SwitchOnOffTV(statusTV);
    screen.classList.add(channelClass);
    if(channelClass != "screenOff"){
        ShowInfoInScreen();
        SetDateIntoScreen();
        SetHourIntoScreen();
        FillGuideList();
        SetActualChannelIntoScreen();
        SetVideoOnScreen(channelClass);
        SwitchLedTV();
    } else {
        HideTelevisionGUI();
        RemoveMenuFromTV();
        RemoveContentOnScreen();
        UnfillGuideList();
        SwitchLedTV();
    }
})

// Up channel button OnClickListener function and the info interactions around it
arrowUpChannelButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        RemoveMenuFromTV();
        let channelClass = SwapUpChannel(screen.classList[screen.classList.length - 1]);
        screen.classList.remove(screen.classList[screen.classList.length - 1]);
        screen.classList.add(channelClass);
        ShowInfoInScreen();
        SetDateIntoScreen();
        SetHourIntoScreen();
        SetActualChannelIntoScreen();
        SetVideoOnScreen(channelClass);
    }
})

// Down channel button OnClickListener function and the info interactions around it
arrowDownChannelButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        RemoveMenuFromTV();
        let channelClass = SwapDownChannel(screen.classList[screen.classList.length - 1]);
        screen.classList.remove(screen.classList[screen.classList.length - 1]);
        screen.classList.add(channelClass);
        ShowInfoInScreen();
        SetDateIntoScreen();
        SetHourIntoScreen();
        SetActualChannelIntoScreen();
        SetVideoOnScreen(channelClass);
    }
})

// Up channel button OnClickListener function and the info interactions around it
arrowUpVolumeButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        ShowVolumeInScreen();
        GoUpVolume();
    }
})

// Down channel button OnClickListener function and the info interactions around it
arrowDownVolumeButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        ShowVolumeInScreen();
        GoDownVolume();
    }
})

// Home button OnClickListener function to show the TV menu
homeButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        HomeButtonInteraction();
    }
})

// Mute button OnClickListener function to remove the volume to the player
muteButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        ShowVolumeInScreen();
        MuteVolumePlayer(isMutedTV);
    }
})

// Guide button OnClickListener function to show a list of channels with their content
guideButton.addEventListener("click", () => {
    if(statusTV){
        HideTelevisionGUI();
        ShowGuideInScreen();
    }
})

// Mapping all the channel buttons and setting OnClickListener to change between channels and the info interactions around it
arraychannelButtons.map(
    item => {
        item.addEventListener("click", (e) => {
            if(statusTV){
                HideTelevisionGUI();
                RemoveMenuFromTV();
                screen.classList.remove(screen.classList[screen.classList.length - 1]);
                let channelClass = "channel"+e.target.id;
                SaveActualChannel(channelClass);
                screen.classList.add(channelClass);
                ShowInfoInScreen();
                SetDateIntoScreen();
                SetHourIntoScreen();
                SetActualChannelIntoScreen();
                SetVideoOnScreen(channelClass);
            }
        })
    }
);

// === FUNCTIONS FOR THE LISTENERS TO ACCESS GLOBAL VARIABLES ===

// Function to swap Up the channel
let SwapUpChannel = (screenState) => {
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
let SwapDownChannel = (screenState) => {
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
const GoUpVolume = () => {
    let increasedVolume;
    volume == 100
        ? increasedVolume = 100
        : increasedVolume = volume + 1
    let barHeight = (increasedVolume * volumeUnit).toString()+"vh";
    volume = increasedVolume;
    volumeBar.style.height = barHeight;
    volumeNumber.innerHTML = "";
    volumeNumber.innerHTML = volume;
    SetVolumeIntoPlayer(volume);
}

// Function to decrease the volume
const GoDownVolume = () => {
    let decreasedVolume;
    volume == 0
        ? decreasedVolume = 0
        : decreasedVolume = volume - 1
    let barHeight = (decreasedVolume * volumeUnit).toString()+"vh";
    volume = decreasedVolume;
    volumeBar.style.height = barHeight;
    volumeNumber.innerHTML = "";
    volumeNumber.innerHTML = volume;
    SetVolumeIntoPlayer(volume);
}

// Function to mute the volume into the player
const MuteVolumePlayer = (isMuted) => {
    if(!isMuted){
        screen.volume = 0;
        volumeNumber.innerHTML = "";
        volumeBar.style.height = "0vh";
        volumeNumber.innerHTML = "<i class='bi bi-volume-mute'></i>";
        isMutedTV = true;
    } else {
        SetVolumeIntoPlayer(volume);
        volumeNumber.innerHTML = "";
        volumeBar.style.height = (volume * volumeUnit).toString()+"vh";
        volumeNumber.innerHTML = volume;
        isMutedTV = false;
    }
}

// Function to check the boolean to control the TV to switch between On or Off
let SwitchOnOffTV = (isOnOffTV) => {
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
const SaveActualChannel = (channel) => {
    idLastChannel = channel;
}

// === UTILITY FUNCTIONS ===

// Function to get the actual hour in format HH:MM
let GetTimeInHoursMins = () => {
    const now = new Date();
    let mins = now.getMinutes().toString();
    let hours = now.getHours().toString();
    if (mins.length == 1){
        mins = "0"+mins;
    }
    if (hours.length == 1){
        hours = "0"+hours;
    }
    return (hours+":"+mins);
}

// Function to get the actual date in format DD/MM/YYYY
let GetDate = () => {
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
const SetDateIntoScreen = () => {
    let date = GetDate();
    dateText.innerHTML = date;
}

// Function to set the hour info into his container refresing the data
const SetHourIntoScreen = () => {
    let time = GetTimeInHoursMins();
    hourText.innerHTML = time;
}

// Function to set the actual channel into his container refresing the data
const SetActualChannelIntoScreen = () => {
    for (let channel in channels){
        if(channels[channel].id == idLastChannel){
            channelText.innerHTML = channels[channel].name.toUpperCase();
        }
    }
}

// Function to show the info container to show info and make it dissapear 3 secs after is shown
const ShowInfoInScreen = () => {
    clearTimeout(controlChannelButtonsTimeout);
    infoContainer.style.visibility = "visible";
    controlChannelButtonsTimeout = setTimeout(function() {
        infoContainer.style.visibility = "hidden";
      }, 3000);
}

// Function to show the volume container to show info and make it dissapear 5 secs after is shown
const ShowVolumeInScreen = () => {
    clearTimeout(controlVolumeButtonsTimeout);
    volumeContainer.style.visibility = "visible";
    controlVolumeButtonsTimeout = setTimeout(function() {
        volumeContainer.style.visibility = "hidden";
      }, 3000);
}

const ShowGuideInScreen = () => {
    clearTimeout(controlGuideButtonTimeout);
    guideListContainer.style.visibility = "visible";
    controlGuideButtonTimeout = setTimeout(function() {
        guideListContainer.style.visibility = "hidden";
      }, 3000);
}

// Function to hide all interface elements on screen and removing the timeouts of the buttons
const HideTelevisionGUI = () => {
    clearTimeout(controlVolumeButtonsTimeout);
    clearTimeout(controlChannelButtonsTimeout);
    clearTimeout(controlGuideButtonTimeout);
    volumeContainer.style.visibility = "hidden";
    infoContainer.style.visibility = "hidden";
    guideListContainer.style.visibility = "hidden"
}

// Function to change the url in the video player element
const SetVideoOnScreen = (channelInput) => {
    for (let channel in channels){
        if(channels[channel].id == channelInput){
            let url = channels[channel].url;
            screen.src = url;
        }
    }
}

// Function to remove the content inside the TV
const RemoveContentOnScreen = () => {
    screen.src = "";
}

// Function to set the variable volume into the player
const SetVolumeIntoPlayer = (volume) => {
    screen.volume = (volume/100);
}

// Function to set the TV menu on the screen 
const HomeButtonInteraction = () => {
    screen.src = "";
    screen.poster = "./img/menu.jpg";
}

// Function to remove the TV menu off the screen
const RemoveMenuFromTV = () => {
    screen.removeAttribute("poster");
}

// Function to fill guide list with channel list info
const FillGuideList = () => {
    for (let channel in channels){
        guideListContainer.innerHTML += "<div class='rowGuide col-12'><div id='channelName' class='col-6'>"+channels[channel].name.toUpperCase()+"</div><div id='channelActualContent' class='col-6'>"+channels[channel].actualContentName+"</div></div>";
    }
}

// Clean the guide list
const UnfillGuideList = () => {
    guideListContainer.innerHTML = "";
}

// Switch the led if the TV is on or off
const SwitchLedTV = () => {
    (statusTV)
        ? ledSwitchOnOff.style.backgroundColor = "white"
        : ledSwitchOnOff.style.backgroundColor = "red"
}