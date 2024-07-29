let form = document.getElementById("form");
let container = document.querySelector(".container");
let submitBtn = document.getElementById("submit-btn");
let username='new force member';
let password='NewForceMember';
let first_name=document.getElementById("first-name");
let last_name=document.getElementById("last-name");
let department=document.getElementById("department");
let level=document.getElementById("level");
let hall=document.getElementById("hall");
let email=document.getElementById("email");
let phone=document.getElementById("phone");

let confirmRegistration = document.getElementById("confirm-registration");
let invite = document.getElementById("invite");

let okBtn=document.getElementById("ok-btn");
let copyBtn=document.getElementById("copy-btn");
let linkText=document.getElementById("link-txt");

function registerUser(userData){
    fetch("http://127.0.0.1:8000/core/members/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('network not ok');
        }
        else{
            submitBtn.disabled=true;
            if(submitBtn.disabled){
                submitBtn.style.background='gray';
            }
            container.style.display='none';
            confirmRegistration.style.display='block';
        }
        return response.json();
    })
    .catch(error => {
        console.log(error)
    })
}

// function loadHall(){
//     const hall = [
//        {name: "Ghartey A"},
//        {name: "Ghartey B"},
//        {name: "Ghartey C"},
//        {name: "Aggrey Hall A"},
//        {name: "Aggrey Hall B"},
//     ];
//     hall.sort((a, b) => (a.name > b.name)? 1 : -1);
 
//     const selectHall=document.getElementById("hall");;
 
//     hall.forEach(hall =>{
//        const option=document.createElement("option");
//        option.text=hall.name;
//        selectHall.appendChild(option);
//     });
//  }
//  loadHall();

form.addEventListener('submit', function(e){
    e.preventDefault()

    let hallOrNot='';
    if(hall.value===''){
        hallOrNot='No hall';
    }
    else{
        hallOrNot=hall.value;
    }

    const formData=new FormData(this);

    const userData={
        first_name: formData.get('first-name').charAt(0).toUpperCase() + formData.get('first-name').slice(1).toLowerCase(),
        last_name: formData.get('last-name').charAt(0).toUpperCase() + formData.get('last-name').slice(1).toLowerCase(),
        department: formData.get('department').charAt(0).toUpperCase() + formData.get('department').slice(1).toLowerCase(),
        level: formData.get('level'),
        hall: hallOrNot,
        email: formData.get('email'),
        phone: formData.get('phone'),
        };

        registerUser(userData);
})

okBtn.onclick=function(){
    confirmRegistration.style.display='none';
    invite.style.display='block';
}

copyBtn.onclick=function(){
    navigator.clipboard.writeText(linkText.textContent)
    copyBtn.textContent='✔';
    copyBtn.style.border='none';
}