// MET 0.5


let find_btn2 = document.getElementById('find_btn2');
// let resultcalories1 = document.getElementById('resultcalories1');

function calculateCalories2(){
    let Weight2 =  document.getElementById('wgt_value2').value;
    var tot_cal2 = Math.ceil((Weight2*0.5)*1/60);
    document.getElementById('resultcalories2').innerHTML = tot_cal2 + " ";
}


find_btn2.addEventListener('click', calculateCalories2);



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

