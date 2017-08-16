/*
author: Ivan Rocha



 */

document.addEventListener("DOMContentLoaded", function() {
  
    // Selectors
    var wrapper = document.getElementById('wrapper');
    var alarmHours = document.getElementById('alarm_hours');
    var alarmMinutes = document.getElementById('alarm_minutes');

    // Create array to store alarm times in
    var alarms = [];

    // Create alarm elements
    createAlarmElements();

    // Render initial time, then update every second after
    renderTime();
    setInterval(renderTime, 1000);


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
        if ( alarms.indexOf(time) >= 0){
            console.log('ALARM!');
        }

    }


    // Set alarm
    function setAlarm(){
        var time = new Date();
        alarms.push(time);
    }

    // Show animations


    // Play sound


});