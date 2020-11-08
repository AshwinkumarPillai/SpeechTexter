const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
// let br = document.createElement('br');
const content = document.querySelector('.content');
content.appendChild(p);
// content.appendChild(br);

recognition.addEventListener('result', event => {

    //console.log(event.results);

    const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');

    p.textContent = transcript;

    if(event.results[0].isFinal){
        p = document.createElement('p');
        br = document.createElement('br');
        content.appendChild(p);
        // content.appendChild(br);
    }

   // console.log(transcript);

});

recognition.addEventListener('end',recognition.start);


const btn = document.querySelector('.talk');
const btn2 = document.querySelector('.shutup');

btn.addEventListener('click',function(){
    recognition.start();
});

$(".shutup").click(function(){
    $(".popup").toggleClass("pop");
});
