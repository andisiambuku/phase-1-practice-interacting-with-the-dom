// event listeners for the various buttons on the site
document.addEventListener("DOMContentLoaded", function(){
    initialize();
    setTimer();
    buttons.pause.addEventListener("click",pauseButtonHandler);
    buttons.plus.addEventListener("click",plusButtonHandler);
    buttons.minus.addEventListener("click",minusButtonHandler);
    buttons.heart.addEventListener("click",heartButtonHandler);
    buttons.submitButton.addEventListener("click",commentHandler);
});

// function initialize to initialize buttons on the site
function initialize(){
    running = true;
    count = 0;
    counter = document.getElementById("counter");
    likes = document.querySelector("ul");
    buttons={
        pause:document.getElementById("pause"),
        heart:document.getElementById("heart"),
        plus:document.getElementById("plus"),
        minus:document.getElementById("minus"),
        comment:document.getElementById("submit"),
    }
    comment={
        list: document.getElementById("list"),
        submitButton:document.getElementById("submit"),
        submission:document.getElementById("comment-input"),
    }
}

//counter function to update the counter when clicked
let updateCounter=(n= ++count)=>{
    count=(n<0) ? 0:n;
    counter.innerHTML=count;
}

//timer function to update counter whether or not it is running
let setTimer=()=>setTimeout(e=>{
    if(running){
        updateCounter();
        setTimer();
    }
},1000);

//pausebuttonhandler function to handle pauses
let pauseButtonHandler = event=>{
    running=!running;
    if(running){
        setTimer();
        buttons.pause.innerHTML="pause";
    }else{
        buttons.pause.innerHTML="resume";
    }
}

//plusbuttonhandler function to handle events on the plus button
let plusButtonHandler=event=>{
    updateCounter();
}

//minusbuttonhandler function to handle events on the minus button
let minusButtonHandler=event=>{
    updateCounter(--count);
}

//heartbuttonhandler function to handle events when the heart button is clicked
let heartButtonHandler=event=>{
    let like=likes.querySelector(`[num="${count}"]`)
    if(!like){
        like=document.createElement("li");
        like.setAttribute("num",count);
        like.innerHTML=`${count} has been liked<span>0</span> times.`;
        likes.appendChild(like);
    }
    let innerCount = like.querySelector("span");
    innerCount.innerHTML = parseInt(innerCount.innerHTML) +1;
}

//commenthandler to handle events when the submit button is clicked
let commentHandler=event=>{
    event.preventDefault();
    if(comment.submission.value !== ""){
        let newComment = document.createElement("p");
        newComment.innerHTML = comment.submission.value;
        comment.submission.value = "";
        comment.list.appendChild(newComment);
    }
}