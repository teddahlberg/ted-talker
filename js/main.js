const synth = window.speechSynthesis;

const inputForm = document.querySelector('form');
const inputText = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  if(synth.speaking) {
    console.error('Already speaking...');
    return;
  }

  if(inputText.value !== '') {
    const talkText = new SpeechSynthesisUtterance(inputText.value);

    talkText.onend = e => {
      console.log('Done talking...');
    }

    talkText.onerror = e => {
      console.error('Somehing went wrong...');
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice => {
      if(voice.name == selectedVoice) {
        talkText.voice = voice;
      }
    });

    talkText.rate = rate.value;
    talkText.pitch = pitch.value;

    synth.speak(talkText);
  }
}

inputForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  inputText.blur();
});

// LOLS
document.querySelector('.lol').addEventListener('click', e => {

  const lol = "oh shit... you should not have done that. This was the destroy button. Termination in T-minus 3 seconds.. . Three.. . two.. . one.. . just kidding, have a nice weekend"
  const lolText = new SpeechSynthesisUtterance(lol);
  const selectedVoice2 = voiceSelect.selectedOptions[0].getAttribute('data-name');

  const doom = document.querySelector('.container');
  doom.style.transition = '10s';
  doom.style.opacity = '0';

  const smiley = document.querySelector('#smiley');
  setTimeout(() => {
    smiley.style.transition = '5s';
    smiley.style.display = 'block';
    smiley.style.opacity = 1;
  }, 14000);


  voices.forEach(voice => {
    if(voice.name == selectedVoice2) {
      lolText.voice = voice;
    }
  });


  lolText.rate = rate.value;
  lolText.pitch = pitch.value;
  synth.speak(lolText);

  e.preventDefault();
  //speak();
  inputText.blur();
});



rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

voiceSelect.addEventListener('change', e => speak());

