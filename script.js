(async () => {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var progresses = [0, 0, 0, 0, 0, 0]
    var progressSpeeds = [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003]
    var unlocks = [true, false, false, false, false, false]
    var upgradeCosts = [75, 250, 5000, 25000, 1000000, 25000000]
    var spinMoney = [10, 100, 500, 2500, 10000, 1000000]
    var upgradePerks = [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007]
    var priceMult = [1.05, 1.015, 1.004, 1.005, 1.003, 1.0035]
    var money = 0
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

        if (unlocks[5]) {
            ctx.beginPath()
            ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / 9.1, -Math.PI / 2, (-Math.PI / 2) + progresses[5] * Math.PI * 2)
            ctx.strokeStyle = '#24d1f0ff'
            ctx.stroke()
        }

        if (unlocks[4]) {
            ctx.beginPath()
            ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / 10.3, -Math.PI / 2, (-Math.PI / 2) + progresses[4] * Math.PI * 2)
            ctx.strokeStyle = '#24f076ff'
            ctx.stroke()
        }

        if (unlocks[3]) {
            ctx.beginPath()
            ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / 11.85, -Math.PI / 2, (-Math.PI / 2) + progresses[3] * Math.PI * 2)
            ctx.strokeStyle = '#83f024ff'
            ctx.stroke()
        }

        if (unlocks[2]) {
            ctx.beginPath()
            ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / 14, -Math.PI / 2, (-Math.PI / 2) + progresses[2] * Math.PI * 2)
            ctx.strokeStyle = '#f0ea24ff'
            ctx.stroke()
        }

        if (unlocks[1]) {
            ctx.beginPath()
            ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / 17, -Math.PI / 2, (-Math.PI / 2) + progresses[1] * Math.PI * 2)
            ctx.strokeStyle = '#e7922aff'
            ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), width / 22, -Math.PI / 2, (-Math.PI / 2) + progresses[0] * Math.PI * 2)
        ctx.strokeStyle = 'rgba(222, 34, 34, 1)'
        ctx.stroke()



        progress()
        requestAnimationFrame(render) // keep on bottom!
    }

    function getCenter(size, axis) {
        if (axis == "x") return width / 2 - size / 2
        else if (axis == "y") return height / 2 - size / 2
    }

    function progress() {
        var index = 0
        progresses.forEach(function () {
            if (progressSpeeds[index] >= 1) {
                progresses[index] = 1
            }

            if (unlocks[index]) progresses[index] += progressSpeeds[index]
            if (progresses[index] >= 1) {
                if (progressSpeeds[index] < 1) {
                    progresses[index] = 0
                }
                money += spinMoney[index] * (1+(prestigePoints / 50))
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
        progresses = data.p ?? [0, 0, 0, 0, 0, 0]
        money = data.m ?? 0
        progressSpeeds = data.ps ?? [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003]
        unlocks = data.u ?? [true, false, false, false,false,false]
        upgradeCosts = data.uc ?? [75, 250, 5000, 25000, 1000000, 25000000]
        spinMoney = data.s ?? [10, 100, 500, 2500, 10000, 1000000]
        upgradePerks = data.pe ?? [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007]
        priceMult = data.mu ?? [1.05, 1.015, 1.004, 1.005, 1.003, 1.0035]
        prestigePoints = data.pp ?? 0
        updateTexts()
    }

    setInterval(saveGame, 10000)

    function updateTexts(){
        let index = 0
        unlocks.forEach(function() {
            document.getElementById("upg" + (index+1)).innerText = (index+1)+". +" + upgradePerks[index] + " Speed\nPrice: " + upgradeCosts[index] + "$"
            index++
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

