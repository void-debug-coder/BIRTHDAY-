// CONFIG - MR VOID (EZEKIAH MWAMWACHA) BIRTHDAY 💀
const BIRTHDAY = '2026-05-05T00:00:00'
const BIRTH_YEAR = 2006
const BOT_NUMBER = '254112843071'
const GITHUB = 'yourusername' // CHANGE THIS TO YOUR GITHUB USERNAME

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA3ubu0toy8_Ot4aiVrBI4QM3WBbpn5Bjs",
  authDomain: "void-birthday.firebaseapp.com",
  databaseURL: "https://void-birthday-default-rtdb.firebaseio.com",
  projectId: "void-birthday",
  storageBucket: "void-birthday.firebasestorage.app",
  messagingSenderId: "45651869948",
  appId: "1:45651869948:web:f7428bf4f0dad35f4e9779"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Age calc
const currentYear = new Date().getFullYear()
document.getElementById('age').textContent = currentYear - BIRTH_YEAR

// Countdown + Auto Flip + After Birthday
const bday = new Date(BIRTHDAY).getTime()
let flipped = false

function updateCountdown() {
    const now = new Date().getTime()
    const diff = bday - now
    
    // Birthday day only - May 5th 2026
    if (diff <= 0 && diff > -86400000 && !flipped) {
        flipped = true
        document.getElementById('countdown').innerHTML = '<h2 style="font-size:3rem;text-shadow:0 0 20px #0f0">🎉 TODAY IS THE DAY 💀🎉</h2>'
        document.querySelector('.date').textContent = 'HAPPY BIRTHDAY MR VOID (EZEKIAH MWAMWACHA)!'
        startConfetti()
        autoPlayMusic()
        document.title = '🎂 HAPPY BIRTHDAY MR VOID 🎂'
        return
    }
    
    // After May 6th - show "Birthday was X days ago"
    if (diff <= -86400000) {
        const daysAgo = Math.floor(Math.abs(diff)/86400000)
        document.getElementById('countdown').innerHTML = `<h2 style="font-size:2rem">VOID TURNED 20<br>${daysAgo} DAYS AGO 💀</h2>`
        document.querySelector('.date').textContent = 'THANKS FOR THE WISHES!'
        document.title = 'MR VOID TURNED 20 💀'
        return
    }
    
    // Before birthday - normal countdown
    if (diff > 0) {
        document.getElementById('days').textContent = String(Math.floor(diff/86400000)).padStart(2,'0')
        document.getElementById('hours').textContent = String(Math.floor(diff%86400000/3600000)).padStart(2,'0')
        document.getElementById('mins').textContent = String(Math.floor(diff%3600000/60000)).padStart(2,'0')
        document.getElementById('secs').textContent = String(Math.floor(diff%60000/1000)).padStart(2,'0')
    }
}
setInterval(updateCountdown, 1000)
updateCountdown()

// Music
const music = document.getElementById('bgMusic')
let musicOn = false
function toggleMusic() {
    musicOn =!musicOn
    if(musicOn) {
        music.play().catch(e => console.log('Music blocked:', e))
        document.querySelector('.music-toggle').textContent = '🔊'
    } else {
        music.pause()
        document.querySelector('.music-toggle').textContent = '🔇'
    }
}
function autoPlayMusic() {
    music.play().catch(()=>{})
    musicOn = true
    document.querySelector('.music-toggle').textContent = '🔊'
}

// Confetti
function startConfetti() {
    const confettiContainer = document.getElementById('confetti')
    setInterval(() => {
        for(let i=0;i<3;i++){
            const c = document.createElement('div')
            c.className = 'confetti'
            c.style.left = Math.random()*100+'vw'
            c.style.background = ['#0f0','#f00','#0ff','#ff0','#f0f'][Math.floor(Math.random()*5)]
            c.style.animationDuration = (Math.random()*2+2)+'s'
            c.style.width = c.style.height = (Math.random()*8+5)+'px'
            confettiContainer.appendChild(c)
            setTimeout(()=>c.remove(),4000)
        }
    }, 300)
}

// GLOBAL WISHES COUNTER
db.ref('wishCount').on('value', (snapshot) => {
    const count = snapshot.val() || 0
    document.getElementById('wishCount').textContent = `WISHES: ${count}`
})

function dropWish() {
    db.ref('wishCount').transaction((current) => {
        return (current || 0) + 1
    })
    startConfetti()
    if(!musicOn) toggleMusic()
}

// GLOBAL GUESTBOOK
function addWish() {
    const name = document.getElementById('guestName').value.trim() || 'Anonymous'
    const msg = document.getElementById('guestMsg').value.trim()
    if(!msg) return alert('Write a message first 💀')
    
    const wish = {
        name: name.substring(0,20), 
        msg: msg.substring(0,100), 
        time: new Date().toLocaleString(),
        timestamp: Date.now()
    }
    
    db.ref('guestbook').push(wish)
    document.getElementById('guestName').value = ''
    document.getElementById('guestMsg').value = ''
    dropWish()
}

// Load wishes realtime - shows ALL wishes from ALL people
db.ref('guestbook').orderByChild('timestamp').on('value', (snapshot) => {
    const list = document.getElementById('wishesList')
    const data = snapshot.val()
    if(!data) {
        list.innerHTML = '<p style="text-align:center;opacity:0.5">No wishes yet. Be the first 💀</p>'
        return
    }
    
    const wishes = Object.values(data).sort((a,b) => b.timestamp - a.timestamp)
    list.innerHTML = wishes.map(w=>`
        <div class="wish-item">
            <strong>${w.name}</strong>
            ${w.msg}
            <span>${w.time}</span>
        </div>
    `).join('')
})

// WhatsApp share
function shareWhatsApp() {
    const url = window.location.href
    const age = currentYear - BIRTH_YEAR
    const text = `🎂💀 MR VOID (EZEKIAH MWAMWACHA) TURNS ${age} 💀🎂%0A%0AMay 5th 2026%0A%0ACheck out his birthday site:%0A${url}%0A%0ADrop a wish for the GOAT 🔥`
    window.open(`https://wa.me/?text=${text}`, '_blank')
    startConfetti()
}

// Update GitHub link
document.getElementById('githubLink').href = `https://github.com/${GITHUB}`
