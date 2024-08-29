
// console.log(time)

function page1() {
    // initializing an array  
    const months = [
        "January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October",
        "November", "December"
    ];


    // dateDiv.innerHTML = "The current month is " + ;

    var timeDiv = document.querySelector('.time')
    var dateDiv = document.querySelector('.date')
    var time = new Date();
    var currentTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    var currentDay = time.toLocaleString('en-us', {  weekday: 'long' })
    var currentDate = currentDay + '<br>' + months[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear() 

    timeDiv.innerText += ` ` + currentTime;
    dateDiv.innerHTML += ` ` + currentDate
}
page1();