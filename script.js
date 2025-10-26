(async () => {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var progresses = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    var progressSpeeds = [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003, 0.0003, 0.00028, 0.00027]
    var unlocks = [true, false, false, false, false, false, false, false, false]
    var upgradeCosts = [75, 250, 5000, 25000, 1000000, 25000000, 250000000, 1000000000, 100000000000]
    var spinMoney = [10, 100, 500, 2500, 10000, 1000000, 5000000, 10000000, 50000000]
    var upgradePerks = [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007, 0.0007, 0.00068, 0.00067]
    var priceMult = [1.05, 1.015, 1.004, 1.005, 1.003, 1.0035, 1.0025, 1.0028, 1.003]

    var dprogresses = [0, 0, 0, 0, 0, 0,0,0,0]
    var dprogressSpeeds = [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003, 0.0003, 0.00028, 0.00027]
    var dunlocks = unlocks = [true, false, false, false, false, false, true, true, true]
    var dupgradeCosts = [75, 250, 5000, 25000, 1000000, 25000000, 250000000, 1000000000, 100000000000]
    var dspinMoney = [10, 100, 500, 2500, 10000, 1000000, 5000000, 10000000, 50000000]
    var dupgradePerks = [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007, 0.0007, 0.00068, 0.00067]
    var dpriceMult = [1.05, 1.015, 1.004, 1.005, 1.003, 1.0035, 1.0025, 1.0028, 1.003]

    let oldTime
    let afkTime = 0
    let moneyPerSecond = 0
    var money = 0
    var moneyBackup = 0
    var pPoint = 0
    var prestigePoints = 0
    const music = ["music/1.mp3","music/2.mp3","music/3.mp3","music/4.mp3","music/5.mp3"]
    var audio = new Audio(music[0])

    loadGame()
    requestAnimationFrame(render)


    function render() {
        height = window.innerHeight
        width = window.innerWidth
        canvas.height = height
        canvas.width = width /100 *99.9

        //circles themselves
        ctx.lineWidth = width / 103
        ctx.lineCap = 'round'

        drawCircle('#f02472ff', 6.78, 8)

        drawCircle('#af24f0ff', 7.4, 7)

        drawCircle('#3524f0ff', 8.15, 6)

        drawCircle('#24d1f0ff', 9.1, 5)

        drawCircle('#24f076ff', 10.3, 4)

        drawCircle('#83f024ff', 11.85, 3)

        drawCircle('#f0ea24ff', 14, 2)

        drawCircle('#e7922aff', 17, 1)

        drawCircle('rgba(222, 34, 34, 1)', 22, 0)

        progress()
        requestAnimationFrame(render) // keep on bottom!
    }

    function drawCircle(color, size, id){

        if (unlocks[id]) {
            ctx.beginPath()
            ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / size, -Math.PI / 2, (-Math.PI / 2) + progresses[id] * Math.PI * 2)
            ctx.strokeStyle = color
            ctx.stroke()
        }
    }

    function getCenter(size, axis) {
        if (axis == "x") return width / 2 - size / 2
        else if (axis == "y") return height / 2 - size / 2
    }

    function progress() {
        var index = 0
        moneyPerSecond = 0
        progresses.forEach(function () {
            if (progressSpeeds[index] >= 1) {
                progresses[index] = 1
            }
            moneyPerSecond += Math.round((spinMoney[index] * progressSpeeds[index]) * (1+(prestigePoints/50)))
            if (unlocks[index]) progresses[index] += progressSpeeds[index]
            if (progresses[index] >= 1) {
                if (progressSpeeds[index] < 1) {
                    progresses[index] = 0
                }
                money += Math.round(spinMoney[index] * (1+(prestigePoints / 50)))
                document.getElementById("moneyDisplay").innerText = "Money: " + money
            }
            index++
        })
    }

    function upgrade(id) {
        if (unlocks[id]) {
            if (money > upgradeCosts[id]) {
                money -= upgradeCosts[id]
                progressSpeeds[id] += upgradePerks[id]
                unlocks[id + 1] = true
                upgradeCosts[id] = Math.round(upgradeCosts[id] * priceMult[id])
                document.getElementById("upg" + (id + 1)).innerText = (id+1)+". +" + upgradePerks[id] + " Speed\nPrice: " + upgradeCosts[id] + "$"
            }
        }
    }

    function saveGame() {
        let shitCrypt = (v) => btoa(JSON.stringify(v)).split("").reverse().join("");
        let data = (shitCrypt({ m: money, p: progresses, ps: progressSpeeds, u: unlocks, uc: upgradeCosts, s: spinMoney, pe: upgradePerks, mu: priceMult, pp: prestigePoints }))
        localStorage.setItem("ZjkfJsakjbfUWoasdOIawho", data)
    }

    function loadGame() {
        let unShit = (v) => JSON.parse(atob(v.split("").reverse().join("")));
        let save = localStorage.getItem("ZjkfJsakjbfUWoasdOIawho")
        if (!save) return console.warn("No save found!");
        let data = (unShit(save))
        progresses = data.p ?? dprogresses
        money = data.m ?? 0
        progressSpeeds = data.ps ?? [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003]
        unlocks = data.u ?? [true, false, false, false,false,false]
        upgradeCosts = data.uc ?? [75, 250, 5000, 25000, 1000000, 25000000]
        spinMoney = data.s ?? [10, 100, 500, 2500, 10000, 1000000]
        upgradePerks = data.pe ?? [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007]
        priceMult = data.mu ?? [1.05, 1.015, 1.004, 1.005, 1.003, 1.0035]
        prestigePoints = data.pp ?? 0
        if (progresses.length < dprogresses.length){
            for (let i = progresses.length; i < dprogresses.length; i++) {
                progresses.push(dprogresses[i])
                progressSpeeds.push(dprogressSpeeds[i])
                unlocks.push(dunlocks[i])
                upgradeCosts.push(dupgradeCosts[i])
                spinMoney.push(dspinMoney[i])
                upgradePerks.push(dupgradePerks[i])
                priceMult.push(dpriceMult[i])
            }
        }
        updateTexts()
    }

    setInterval(saveGame, 10000)

    function updateTexts(){
        document.getElementById("moneyDisplay").innerText = "Money: " + money
        let index = 0
        unlocks.forEach(function() {
            try{
            document.getElementById("upg" + (index+1)).innerText = (index+1)+". +" + upgradePerks[index] + " Speed\nPrice: " + upgradeCosts[index] + "$"
            if (index < unlocks.length - 2)index++}catch(e){console.warn(e)}
        })
    }

    function prestige(view){
        if (money > 1000000){
            pPoint = 0
            let index = 0
            progressSpeeds.forEach(function() {
                pPoint += Math.floor(progressSpeeds[index] * 10)
            })
            pPoint+=Math.floor(money/100000)
            if (view) return pPoint
        }else return 0
        if (!view){
            money = 0
            progresses = [0, 0, 0, 0, 0, 0]
            progressSpeeds = [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003]
            unlocks = [true, false, false, false, false, false]
            upgradeCosts = [75, 250, 5000, 25000, 1000000, 25000000]
            spinMoney = [10, 100, 500, 2500, 10000, 1000000]
            upgradePerks = [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007]
            priceMult = [1.05, 1.015, 1.004, 1.005, 1.003, 1.0035]
            prestigePoints += pPoint
            saveGame()
            updateTexts()
        }
    }

    document.addEventListener('visibilitychange', () =>{
        if (document.visibilityState == "hidden"){
           oldTime = Date.now() 
        }else{
            afkTime = Math.round((Date.now() - oldTime)/1000)
            moneyBackup = money
            money += moneyPerSecond * afkTime
            if (isNaN(money)) money = moneyBackup
        }
    })

    var buttons = document.querySelectorAll('.upg')
    buttons.forEach((b) => {
        b.addEventListener('click', function () {
            upgrade(Number(b.id.slice(3)) - 1)
        });
    })


    document.querySelector('.upgrade-tab').addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'button') return;
        this.classList.toggle('active');
    });
    document.getElementById('prestige-button').onclick = () => {
        document.querySelector('.prestige-popup').classList.add('active');
        document.getElementById('prestige-amount').innerText = "That will give you "+prestige(true)+" prestige points"
    };
    document.getElementById('prestige-confirm').onclick = () => {
        document.querySelector('.prestige-popup').classList.remove('active');
        prestige(false)
    };
    document.getElementById('prestige-decline').onclick = () => {
        document.querySelector('.prestige-popup').classList.remove('active');
    };
    addEventListener('click', () => {
        audio.play();
        audio.volume = 0.2
        audio.currentTime
        audio.addEventListener('ended', function () {
            if (!audio.onplay){
            var next = Math.round(Math.random()*5)
            audio.src = music[next]
            audio.play()}
        })
    });
})()

