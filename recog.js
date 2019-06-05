const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const content = document.querySelector('.content');
content.appendChild(p);

recognition.addEventListener('result', event => {

    //console.log(event.results);

    const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');

    p.textContent = transcript;
    if(event.results[0].isFinal){
        p = document.createElement('p');
        content.appendChild(p);
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
