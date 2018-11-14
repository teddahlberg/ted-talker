window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;

const micButton = document.querySelector('.mic');
const words = document.querySelector('.speech-result');
const interim = document.querySelector('.interim-result');
let p = document.createElement('p');
words.appendChild(p)
p.classList.add('grey');


micButton.addEventListener('click', e => {
  micButton.style.color = "red";
  recognition.start();
  recognition.addEventListener('end', e => { micButton.style.color = "white"; });
})

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('');

  const confidence = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.confidence)
  .join('');

  console.log(confidence);
  console.log(transcript);

  if(e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }

  // Output in different divs depending on if result is final
  // Text gets grey color while recognising and white color when finished
  for ( let i = e.resultIndex; i < e.results.length; ++i) {
    if (e.results[i].isFinal) {
      p.textContent = transcript;
      p = document.createElement('p');
      words.appendChild(p);
      interim.innerHTML = '';
    } else {
      p.textContent = transcript;
      interim.appendChild(p);
    }
  }

  // Some special triggers
  if(transcript.includes('change language to Swedish')) {
    recognition.lang = "sv-SE";
  }

  if(transcript.includes('Byt språk till engelska')) {
    recognition.lang = "en-US";
  }

  if(transcript.includes('delete message')) {
    interim.innerHTML = '';
    words.innerHTML = '';
    words.appendChild(p);
  }

  if(transcript.includes('Radera meddelande')) {
    interim.innerHTML = '';
    words.innerHTML = '';
    words.appendChild(p);
  }
});
