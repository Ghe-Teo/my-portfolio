const switchToogle = document.querySelector(".switch");
const switchButton = document.querySelector(".btn");
const audio = document.getElementById("switch-click");
const bulb = document.getElementById("bulb");
const light = document.querySelector(".light");


// when the user click the swtich:
switchButton.addEventListener("click", function () {
    if (bulb.src.includes("bulb-off.png")) { //if the bulb is off:
        bulb.src = "bulb-on.png"; //replaces img src with bulb turned on
        light.classList.add("light-on"); //adds the radiating light 
        switchToogle.classList.add("on"); //shifts switch into on position
        audio.currentTime = 0; //resets audio so the user can hear the switch clicking on every click, not only after it finished playing
        audio.play(); //the switch click is played
    } else {
        bulb.src = "bulb-off.png";
        light.classList.remove("light-on");
        switchToogle.classList.remove("on");
        audio.currentTime = 0;
        audio.play();
    }
});
