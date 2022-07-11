const main= document.querySelector('main');
const voiceSelect=document.getElementById('voices')
const textarea=document.getElementById('text')
const readBtn=document.getElementById('read')
const toggleBtn=document.getElementById('toggle')
const closeBtn=document.getElementById('close')

//Maybe I can get this data from an API instead of hardcoding it
const data = [
  {
    image:'./img/help.jpg',
    text: "I need help",
    spanish: "Necesito ayuda"

  },
    {
      image:'./img/beautiful.jpg',
      text: "You are Beautiful",
      spanish: "Eres Bonita"

    },
    {
      image:'./img/bathroom.jpg',
      text: "I need to go to the bathroom",
      spanish: "Necesito ir al bano"
    },
    {
      image:'./img/coffee.jpg',
      text: "I need some coffee",
      spanish: "Necesito cafe"

    },
    {
      image:'./img/dance.jpg',
      text: "I like to dance",
      spanish: "Me gusta bailar"

    },

    {
      image: './img/drink.jpg',
      text: "I'm Thirsty",
      spanish: "Tengo sed"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry",
      spanish: "Tengo ambre"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired",
      spanish: "Estoy cansada"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt",
      spanish: "Estoy dolida"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy",
      spanish:"Estoy feliz"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry", 
      spanish: "Estoy enojada"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad",
      spanish: "Estoy triste"

    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared",
      spanish:"Tengo miedo"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside',
     spanish: "Quiero ir afuera"
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home',
      spanish: "Quiero ir a la casa"
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School',
      spanish: "Quiero ir a la escuela"
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas',
      spanish: "Quiero ir a la casa de abuela"
    }
  ];

//create the box for the images and the text

  data.forEach(createBox)
  
  function createBox(item){
    const box = document.createElement('div')
    const {image, text, spanish} = item;

    box.classList.add('box');
    box.innerHTML =`
    <img src="${image}" alt="${text}" />
    <p class = "info"> ${text} </p>
     <p class="spanish"> ${spanish}`;
    box.addEventListener('click', ()=>{
      setTextMessage(text)
      speakText()
      box.classList.add('active')
      setTimeout(()=>box.classList.remove('active'), 800)
    })
    main.appendChild(box)
  }


// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voiceSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voiceSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
