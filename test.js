const timediff = require('timediff');

date = new Date();

console.log("Starting date: ", date);

let daysLeft = timediff(date.now, new Date(date.getFullYear(),4,1), 'YDHms');

console.log("Wappu: ", new Date(date.getFullYear(),4,1))
console.log("Initial days left:", daysLeft);
if (daysLeft.days == 0 && daysLeft.seconds <= 0){
  console.log(1)
    daysLeft = 0
  }
if (daysLeft < 0){
      console.log(2)
    daysLeft = timediff(date.now, new Date(date.getFullYear() + 1,4,1), 'YDHms').days + 1;
  }
else {
    console.log(3)
  daysLeft = daysLeft.days + 1;
}

console.log("Final days left: ", daysLeft);
return daysLeft;
