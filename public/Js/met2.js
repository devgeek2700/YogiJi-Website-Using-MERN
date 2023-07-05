//MET 1-2

let find_btn1 = document.getElementById('find_btn1');
// let resultcalories1 = document.getElementById('resultcalories1');

function calculateCalories1(){
    let Weight1 =  document.getElementById('wgt_value1').value;
    var tot_cal1 = Math.ceil((Weight1*2)*1/60);
    document.getElementById('resultcalories1').innerHTML = tot_cal1 + " ";
}


find_btn1.addEventListener('click', calculateCalories1);


// pose_Countdown
let start_btn = document.getElementById('start');
let restart_btn = document.getElementById('rest');

let timer;
let time_pose = document.getElementById('num_p');

 function start_pose(){
    let sec = 59;
    timer = setInterval(() =>{
        time_pose.innerHTML = '00 : ' + sec;
        sec--;
        if(sec == '0'){
            restart_pose();
        }
    },1000);
}

function restart_pose(){
    location.reload();
}

start_btn.addEventListener('click', start_pose);
// restart_pose

restart_btn.addEventListener('click', restart_pose);
