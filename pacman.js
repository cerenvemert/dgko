// ===========================
// LOVE PACMAN ❤️
// Bölüm 1
// ===========================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const restartBtn = document.getElementById("restartBtn");
const gameOver = document.getElementById("gameOver");

const meImg = new Image();
meImg.src = "me.png";

const cerenImg = new Image();
cerenImg.src = "ceren.png";

let gameRunning = true;

// Oyuncu
const player = {
    x:100,
    y:100,
    width:70,
    height:70,
    speed:5
};

// Ceren
const enemy = {
    x:650,
    y:450,
    width:70,
    height:70,
    speed:2
};

// Kalpler
const hearts=[];

for(let i=0;i<25;i++){

    hearts.push({

        x:Math.random()*740,
        y:Math.random()*540,
        size:10,
        taken:false

    });

}

let score=0;

// Tuşlar
const keys={};

document.addEventListener("keydown",(e)=>{

    keys[e.key.toLowerCase()]=true;

});

document.addEventListener("keyup",(e)=>{

    keys[e.key.toLowerCase()]=false;

});

// Oyuncu hareketi
function movePlayer(){

    if(keys["w"]) player.y-=player.speed;

    if(keys["s"]) player.y+=player.speed;

    if(keys["a"]) player.x-=player.speed;

    if(keys["d"]) player.x+=player.speed;

    // Ekran sınırları
    if(player.x<0) player.x=0;
    if(player.y<0) player.y=0;

    if(player.x>canvas.width-player.width)
        player.x=canvas.width-player.width;

    if(player.y>canvas.height-player.height)
        player.y=canvas.height-player.height;

}

// ===========================
// LOVE PACMAN ❤️
// Bölüm 2
// ===========================

// Ceren seni takip ediyor
function moveEnemy(){

    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if(distance > 1){

        enemy.x += dx / distance * enemy.speed;
        enemy.y += dy / distance * enemy.speed;

    }

}

// Kalpleri çiz
function drawHearts(){

    hearts.forEach(heart=>{

        if(!heart.taken){

            ctx.font="22px Arial";
            ctx.fillText("❤️",heart.x,heart.y);

        }

    });

}

// Kalp toplama
function collectHearts() {

    hearts.forEach(heart => {

        let dx = player.x + player.width / 2 - heart.x;
        let dy = player.y + player.height / 2 - heart.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 35) {

            score++;

            // Yeni rastgele konum
            heart.x = Math.random() * (canvas.width - 40);
            heart.y = Math.random() * (canvas.height - 40);

            if (score >= 100) {
                winGame();
            }
        }

    });

}



// Oyuncuyu çiz
function drawPlayer(){

    ctx.drawImage(
        meImg,
        player.x,
        player.y,
        player.width,
        player.height
    );

}

// Ceren'i çiz
function drawEnemy(){

    ctx.drawImage(
        cerenImg,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
    );

}

// Skor
function drawScore(){

    ctx.fillStyle="white";
    ctx.font="24px Arial";
    ctx.fillText("❤️ Kalpler: " + score,20,35);

}

// ===========================
// LOVE PACMAN ❤️
// Bölüm 3
// ===========================

// Çarpışma kontrolü
function checkCollision(){

    let dx = (player.x + player.width/2) - (enemy.x + enemy.width/2);
    let dy = (player.y + player.height/2) - (enemy.y + enemy.height/2);

    let distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < 50){

        gameRunning = false;

        canvas.classList.add("shake");

        gameOver.classList.remove("hidden");

    }

}

// Oyunu sıfırla
restartBtn.addEventListener("click",()=>{

    player.x = 100;
    player.y = 100;

    enemy.x = 650;
    enemy.y = 450;

    score = 0;

    hearts.forEach(heart=>{
        heart.taken = false;
        heart.x = Math.random() * 740;
        heart.y = Math.random() * 540;
    });

    gameRunning = true;

    gameOver.classList.add("hidden");

    canvas.classList.remove("shake");

    requestAnimationFrame(gameLoop);

});

// Ana oyun döngüsü
function gameLoop(){

    if(!gameRunning) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    movePlayer();

    moveEnemy();

    collectHearts();

    drawHearts();

    drawPlayer();

    drawEnemy();

    drawScore();

    checkCollision();

    requestAnimationFrame(gameLoop);

}

// Resimler yüklendikten sonra başlat
let loaded = 0;

function startIfReady(){

    loaded++;

    if(loaded === 2){

        requestAnimationFrame(gameLoop);

    }

}

function winGame(){

    gameRunning = false;

    gameOver.classList.remove("hidden");

    gameOver.innerHTML = `
        <h1>❤️ TEBRİKLER ❤️</h1>
        <h2>Ceren'in kalbini kazandın! 🥰</h2>
        <p>100 kalp topladın.</p>

        <button id="rewardBtn">
            🎁 ÖDÜLÜ ALMAK İÇİN TIKLA
        </button>

        <br><br>

        <button id="restartGameBtn">
            🔄 Tekrar Oyna
        </button>
    `;

    document.getElementById("rewardBtn").onclick = () => {

        window.location.href = "index.html";

    };

    document.getElementById("restartGameBtn").onclick = () => {

        location.reload();

    };

}

meImg.onload = startIfReady;
cerenImg.onload = startIfReady;

