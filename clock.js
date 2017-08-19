/*
Author: Ivan Rocha
Date: 08/18/2017
Notes:
    - Color palette adapted from color.adobe.com project "The Clock Strikes Nine" by user nicolagilroy ( https://color.adobe.com/The-Clock-Strikes-Nine-color-theme-1294130/ )
    - "Alarm Clock" font from dafont.com, created by David J. Patterson ( http://www.dafont.com/alarm-clock.font )
 */

document.addEventListener("DOMContentLoaded", function() {
  
    // Selectors
    var wrapper = document.getElementById('wrapper');
    var alarmHours = document.getElementById('alarm_hours');
    var alarmMinutes = document.getElementById('alarm_minutes');
    var alarmName = document.getElementById('alarm_name');
    var alarmAMPM = document.getElementById('alarm_ampm');
    var submit = document.getElementById('submit');
    var alarmMessage = document.getElementById('alarm_message');
    var alarmList = document.getElementById('alarm_list');

    // Create array to store alarm times in
    var alarms = [];

    // Create alarm elements
    createAlarmElements();

    // Render initial time, then update every second after
    renderTime();
    setInterval(renderTime, 1000);

    // Set event listener for adding alarms
    addListenerForInput();

    // Alarm constructor
    function Alarm(timeArg, nameArg){
        this.time = timeArg;
        this.name = nameArg;

        this.getTime = function(){
            return this.time;
        }

        this.getName = function(){
            return this.name;
        }
    }

    // Functions
    function createAlarmElements(){

        for (i=1; i <= 12; i++){
            var hourOption = document.createElement('option');
            hourOption.innerHTML = '<option value="' + i + '">' + i + '</option>';
            alarmHours.appendChild(hourOption);
        }

        for (i=0; i < 60; i++){

            // Pad minutes
            var output;
            if (i < 10){
                output = '0' + i;
            }
            else{
                output = i;
            }

            var minuteOption = document.createElement('option');
            minuteOption.innerHTML = '<option value="' + output + '">' + output + '</option>';
            alarmMinutes.appendChild(minuteOption);
        }
    }

    // Render time
    function renderTime(){

        // create new date object
        var time = new Date();
        var ampm = 'AM';

        // Get values
        var timeSeconds = time.getSeconds();
        var timeMinutes = time.getMinutes();
        var timeHours = time.getHours();


        // Format values
        if (timeHours > 12){
            timeHours -= 12;
            ampm = 'PM'
        }

        if (timeMinutes < 10){
            timeMinutes = '0' + timeMinutes;
        }

        if (timeSeconds < 10){
            timeSeconds = '0' + timeSeconds;
        }

        // Display time
        wrapper.innerHTML = timeHours + ':' + timeMinutes + ':' + timeSeconds + ' ' + ampm;

        // Check if time matches alarm time

        if (alarms.length > 0){
            for (var i = 0; i < alarms.length; i++){
                var checkAlarm = alarms[i].getTime();

                if (checkAlarm.getHours() == timeHours && checkAlarm.getMinutes() == timeMinutes){
                    ringAlarm(alarms[i].getName());
                }
            }
        }


    }


    // Add a listener to the alarm input
    function addListenerForInput(){
        submit.addEventListener('click', setAlarm);
    }

    // Set alarm
    function setAlarm(){

        if (alarmName.value && alarmHours.value && alarmMinutes.value && alarmAMPM.value){

            var time = new Date();

            if (alarmAMPM.value == "PM"){
                time.setHours(alarmHours.value + 12);
            }
            else {
                time.setHours(alarmHours.value);
            }

            time.setMinutes(alarmMinutes.value);

            time.setSeconds(0);


            // Create new alarm object and store it in alarms[]
            var newAlarm = new Alarm(time, alarmName.value);
            alarms.push(newAlarm);

            // Update alarm message text
            alarmMessage.innerHTML = "Your alarms";

            // Append date to list of dates in DOM
            var newListItem = document.createElement('li');
            newListItem.innerHTML = alarmName.value + " - " + time.toLocaleTimeString();
            alarmList.appendChild(newListItem);

            //TODO: Display the alarms in chronological order
        }
        else{
            alert('ERROR: valid time and name needed to set an alarm');
        }
    }

    // Do something when the alarm goes off
    function ringAlarm(alarmInput){
        // TODO: Add animations and possibly sound
        alert(alarmInput);
    }

});