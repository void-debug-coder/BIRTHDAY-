// CONFIG - MAY 5TH 2026 BIRTHDAY 💀
const BIRTHDAY = '2026-05-05T00:00:00'
const BIRTH_YEAR = 2006 // Turns 20 🎂
const BOT_NUMBER = '254112843071' // Your WhatsApp
const GITHUB = 'yourusername' // CHANGE THIS to your GitHub
const BOT_URL = 'https://your-bot.onrender.com' // CHANGE THIS to your bot URL

// Age calc
document.getElementById('age').textContent = new Date().getFullYear() - BIRTH_YEAR

// Countdown
const bday = new Date(BIRTHDAY).getTime()
const updateCountdown = () => {
    const now = new Date().getTime()
    const diff = bday - now
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<h2 style="font-size:3rem">🎉 TODAY IS THE DAY 💀🎉</h2>'
        startConfetti()
        autoPlayMusic()
        return
    }
    document.getElementById('days').textContent = String(Math.floor(diff/86400000)).padStart(2,'0')
    document.getElementById('hours').textContent = String(Math.floor(diff%86400000/3600000)).padStart(2,'0')
    document.getElementById('mins').textContent = String(Math.floor(diff%3600000/60000)).padStart(2,'0')
    document.getElementById('secs').textContent = String(Math.floor(diff%60000/1000)).padStart(2,'0')
}
setInterval(updateCountdown, 1000)
updateCountdown()

// Music
const music = document.getElementById('bgMusic')
let musicOn = false
function toggleMusic() {
    musicOn =!musicOn
    if(musicOn) {
        music.play()
        document.querySelector('.music-toggle').textContent = '🔊'
    } else {
        music.pause()
        document.querySelector('.music-toggle').textContent = '🔇'
    }
}
function autoPlayMusic() {
    if(new Date().toISOString().slice(5,10) === '05-05') {
        music.play().catch(()=>{})
        musicOn = true
        document.querySelector('.music-toggle').textContent = '🔊'
    }
}

// Confetti
function startConfetti() {
    setInterval(() => {
        for(let i=0;i<5;i++){
            const c = document.createElement('div')
            c.className = 'confetti'
            c.style.left = Math.random()*100+'vw'
            c.style.background = ['#0f0','#f00','#0ff','#ff0','#f0f'][Math.floor(Math.random()*5)]
            c.style.animationDuration = (Math.random()*2+2)+'s'
            document.body.appendChild(c)
            setTimeout(()=>c.remove(),3000)
        }
    }, 200)
}

// Wishes counter
let wishes = parseInt(localStorage.getItem('voidWishes') || 0)
document.getElementById('wishCount').textContent = `WISHES: ${wishes}`
function dropWish() {
    wishes++
    localStorage.setItem('voidWishes', wishes)
    document.getElementById('wishCount').textContent = `WISHES: ${wishes}`
    startConfetti()
    if(!musicOn) toggleMusic()
    setTimeout(()=>alert('Wish sent to the void 💀🎂'),100)
}

// Profile pic upload
document.getElementById('picUpload').addEventListener('change', function(e) {
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = function(event) {
        const imgData = event.target.result
        localStorage.setItem('voidProfilePic', imgData)
        document.getElementById('picPreview').innerHTML = `<img src="${imgData}">`
        startConfetti()
        alert('Pic saved to the void 💀')
    }
    reader.readAsDataURL(file)
})

// Load saved pic on page load
window.addEventListener('load', () => {
    const savedPic = localStorage.getItem('voidProfilePic')
    if(savedPic) {
        document.getElementById('picPreview').innerHTML = `<img src="${savedPic}">`
    }
})

// Guestbook
let guestbook = JSON.parse(localStorage.getItem('voidGuestbook') || '[]')
function loadWishes() {
    const list = document.getElementById('wishesList')
    list.innerHTML = guestbook.map(w=>`
        <div class="wish-item">
            <strong>${w.name}</strong>
            ${w.msg}
            <span>${w.time}</span>
        </div>
    `).reverse().join('')
}
function addWish() {
    const name = document.getElementById('guestName').value.trim() || 'Anonymous'
    const msg = document.getElementById('guestMsg').value.trim()
    if(!msg) return alert('Write a message first 💀')
    const wish = {name: name, msg: msg, time: new Date().toLocaleString()}
    guestbook.push(wish)
    localStorage.setItem('voidGuestbook', JSON.stringify(guestbook))
    document.getElementById('guestName').value = ''
    document.getElementById('guestMsg').value = ''
    loadWishes()
    startConfetti()
}
loadWishes()

// WhatsApp share
function shareWhatsApp() {
    const url = window.location.href
    const age = new Date().getFullYear() - BIRTH_YEAR
    const text = `🎂💀 MR VOID TURNS ${age} TODAY 💀🎂%0A%0ACheck out his birthday site:%0A${url}%0A%0ADrop a wish for the GOAT 🔥`
    window.open(`https://wa.me/?text=${text}`, '_blank')
    startConfetti()
}

// Bot status check
fetch(BOT_URL).then(r=>{
    document.querySelector('#status span').textContent = 'ONLINE 💀'
    document.querySelector('#status span').style.color = '#0f0'
}).catch(()=>{
    document.querySelector('#status span').textContent = 'OFFLINE'
    document.querySelector('#status span').style.color = '#f00'
})

// Update GitHub link
document.querySelector('.links a[href*="github"]').href = `https://github.com/${GITHUB}`
