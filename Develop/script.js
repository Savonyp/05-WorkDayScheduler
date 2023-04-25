// stores the current date
let currentDate = dayjs().format('dddd MMMM D, YYYY');

// stores the current hour
let currentHour = dayjs().hour();

// displays the current date and time in the header
$('#currentDay').text('Today is: ' + currentDate);
setInterval(function() {
  const dayjsNow = dayjs();
  /* need to make the current hour show on the red sht */
  currentHour = dayjsNow.hour();
  $('#currentDay').html('Today is: ' + currentDate + ' ' + dayjsNow.format('hh:mm:ss A'));
}, 1000);

const saveBtn = document.querySelectorAll('.saveBtn')

// hours (using 24-hour format for consistency)
/* before i had const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm']; */
var oneAm = document.querySelector('#h1t');
var twoAm = document.querySelector('#h2t');
var threeAm = document.querySelector('#h3t');
var fourAm = document.querySelector('#h4t');
var fiveAm = document.querySelector('#h5t');
var sixAm = document.querySelector('#h6t');
var sevenAm = document.querySelector('#h7t');
var eightAm = document.querySelector('#h8t');
var nineAm = document.querySelector('#h9t');
var tenAm = document.querySelector('#h10t');
var elevenAm = document.querySelector('#h11t');
var twelvePm = document.querySelector('#h12t');
var onePm = document.querySelector('#h13t');
var twoPm = document.querySelector('#h14t');
var threePm = document.querySelector('#h15t');
var fourPm = document.querySelector('#h16t');
var fivePm = document.querySelector('#h17t');
var sixPm = document.querySelector('#h18t');
var sevenPm = document.querySelector('#h19t');
var eightPm = document.querySelector('#h20t');
var ninePm = document.querySelector('#h21t');
var tenPm = document.querySelector('#h22t');
var elevenPm = document.querySelector('#h23t');
var twelveAm= document.querySelector('#h00t');

// saves the textarea in each timeblock to a variable
for (var i = 9; i < 18; i++) {
  saveBtn[i-9].addEventListener('click', function() {
    var textarea = document.querySelector('#textarea' + (i-8));
    localStorage.setItem('textarea' + (i-8), textarea.value);
  });
}
/* local storage button doesnt work when i refresh page like where is it saving to.. */

// LocalStorage save button
$(".saveBtn").on("click", function(){
  userInput = $(this).siblings(".form-control").val().trim();
  console.log(userInput);
  hourSpan = $(this).siblings(".input-group-prepend").text().trim();
  console.log(hourSpan);
  localStorage.setItem(hourSpan, JSON.stringify(userInput));

})

// updates the timeblocks to reflect whether they are in the past, present, or future
function updateBlocks() {
  const now = dayjs();
  for (let i = 9; i < 18; i++) {
    const hour = dayjs().hour(i);
    const block = $('#h' + (i-8) + 't');
    if (now.isBefore(hour, 'hour')) {
      block.removeClass('past present').addClass('future');
    } else if (now.isSame(hour, 'hour')) {
      block.removeClass('past future').addClass('present');
    } else {
      block.removeClass('present future').addClass('past');
    }
  }
}

// displays the saved events from local storage
function displayEvents() {
  for (let i = 1; i < 10; i++) {
    const event = localStorage.getItem('textarea' + i);
    if (event) {
      $('#textarea' + i).val(event);
    }
  }
}

// calling the updateBlocks for when user loads page 
$(document).ready(function() {
  updateBlocks();
  displayEvents();
});

// calling the updateBlocks 
setInterval(function() {
  updateBlocks();
}, 900000);

// Clear All button
$("#clearAll").on("click", function(){
  localStorage.clear();
  initPage()
});
