const stars = document.getElementById("stars");

for(let i=0;i<150;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"vw";
    star.style.top=Math.random()*100+"vh";

    const size=Math.random()*3+1;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.animationDuration=(Math.random()*3+2)+"s";

    stars.appendChild(star);

}
const startBtn = document.getElementById("startBtn");
const hero = document.querySelector(".hero");
const story = document.getElementById("story");

startBtn.addEventListener("click", function(){
    const bgMusic = document.getElementById("bgMusic");


      bgMusic.play().catch(() => {});
      bgMusic.volume = 0.5;

    hero.style.opacity="0";

    setTimeout(function(){

    hero.style.display = "none";
    story.classList.remove("hidden");

    // Sayfayı en üste al
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    typeWriter();

},800);
    
});;
const text = 
"Tanıştığımız zaman geçirdiğim kazadan dolayı kötü günler geçiriyordum.\n\n" +
"Seninle tanıştığım günler, bu kötü günlerin en güzel anları oldu.\n\n" +
"Seninle birlikte olduğumda, hayatın ne kadar güzel olduğunu hatırladım.\n\n" +
"Her şey için teşekkür ederim ve seni çok seviyorum ❤️\n\n"



const storyText = document.getElementById("storyText");

let index = 0;


function typeWriter() {

    if (index < text.length) {

        storyText.innerHTML += text.charAt(index);
        index++;

        setTimeout(typeWriter, 50);

    } else {

        // Yazı bittikten 3 saniye sonra fotoğrafı göster
       setTimeout(() => {

    // Önce yazı ekranını tamamen kapat
    story.style.display = "none";

    // Sonra fotoğraf ekranını aç
    memory.classList.remove("hidden");

    window.scrollTo(0, 0);

},5000);



    }

}

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*100 + "vw";

    heart.style.fontSize = (20 + Math.random()*25) + "px";

    heart.style.animationDuration = (5 + Math.random()*4) + "s";

    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

}

setInterval(createHeart,700);

const photo = document.querySelector(".memory img");

photo.addEventListener("click", () => {

    for(let i = 0; i < 15; i++){

        const heart = document.createElement("div");

        heart.innerHTML = "💖";

        heart.className = "heart";

        heart.style.left =
            (photo.getBoundingClientRect().left +
            photo.offsetWidth / 2) + "px";

        heart.style.bottom = "40%";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 5000);

    }

});

const memories = [

    {
        img:"ilk-an.jpg",
        title:"İlk Anımız ❤️",
        text:"Hayatıma girdiğin ilk anlarda benim için bu kadar özel birisi olacağını düşünmezdim ama sen benim için zamanla en güzel hikâyeye dönüştün."
    },

    {
        img:"foto2.jpg",
        title:"Birlikte ❤️",
        text:"Seninle geçen her gün, bir öncekinden daha güzel olmaya başladı."
    },

    {
        img:"foto3.jpg",
        title:"En Güzel Gülüş ❤️",
        text:"Gülüşünü görmek, bütün yorgunluğumu unutturuyor."
    },

    {
        img:"foto4.jpg",
        title:"İyi ki Varsın ❤️",
        text:"Hayatıma geldiğin için her gün şükrediyorum."
    }

];

let currentMemory = 0;

const memoryImg = document.getElementById("memoryImg");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const nextMemory = document.getElementById("nextMemory");

nextMemory.addEventListener("click",()=>{

    currentMemory++;

    if (currentMemory >= memories.length) {

    nextMemory.style.display = "none";
    surpriseBtn.style.display = "block";

    return;

    }

    memoryImg.src = memories[currentMemory].img;
    memoryTitle.textContent = memories[currentMemory].title;
    memoryText.textContent = memories[currentMemory].text;

});

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseBtn.addEventListener("click",()=>{

    surpriseMessage.classList.remove("hidden");

    surpriseBtn.style.display="none";

});

if(currentMemory === memories.length - 1){

    document.getElementById("nextMemory").style.display = "none";
    document.getElementById("surpriseBtn").style.display = "block";

}else{

    document.getElementById("nextMemory").style.display = "block";
    document.getElementById("surpriseBtn").style.display = "none";

}
