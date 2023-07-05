// Calories calculator
// CAT COW POSE  MET 2-3

let find_btn = document.getElementById('find_btn');
// let resultcalories = document.getElementById('resultcalories');

function calculateCalories(){
    let Weight =  document.getElementById('wgt_value').value;
    var tot_cal = Math.ceil((Weight*3)*1/60);
    document.getElementById('resultcalories').innerHTML = tot_cal + " ";
}

find_btn.addEventListener('click', calculateCalories);


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
