const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const content = document.querySelector(".content");
const transcriptionsContainer = document.querySelector(".transcriptions");
const popup = document.getElementById("popup");

let p = document.createElement("p");
content.appendChild(p);

recognition.addEventListener("result", (event) => {
  const transcript = Array.from(event.results)
    .map((result) => result[0].transcript)
    .join("");

  const isFinal = event.results[0].isFinal;
  const transcriptList = document.querySelectorAll(".transcription-item");
  const transcriptionItem = createTranscriptionItem(transcript);

  if (isFinal) {
    console.log(transcript);
    if (transcriptList.length > 0) {
      const latestTranscript = transcriptList[transcriptList.length - 1];
      latestTranscript.textContent = transcript;
    }
    transcriptionsContainer.appendChild(createTranscriptionItem(""));
  } else {
    console.log(transcript);
    if (transcriptList.length === 0) {
      console.log("is empty?");
      transcriptionsContainer.appendChild(transcriptionItem);
    } else {
      const latestTranscript = transcriptList[transcriptList.length - 1];
      latestTranscript.textContent = transcript;
    }
  }
});
function createTranscriptionItem(text) {
  const item = document.createElement("p");
  item.classList.add("transcription-item");
  item.textContent = text;

  // Make the item editable on click
  item.addEventListener("click", () => {
    item.setAttribute("contenteditable", "true");
    item.focus();
  });

  // Remove contenteditable attribute on blur (when focus is lost)
  item.addEventListener("blur", () => {
    item.removeAttribute("contenteditable");
  });

  return item;
}

recognition.addEventListener("end", recognition.start);

const btn = document.querySelector(".talk");
const btn2 = document.querySelector(".shutup");

btn.addEventListener("click", function () {
  recognition.start();
});

btn2.addEventListener("click", function () {
  popup.classList.add("pop");
  setTimeout(() => {
    popup.classList.remove("pop");
  }, 1500);
});
