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
                money += spinMoney[index]
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
        let data = (shitCrypt({ m: money, p: progresses, ps: progressSpeeds, u: unlocks, uc: upgradeCosts, s: spinMoney, pe: upgradePerks, mu: priceMult }))
        localStorage.setItem("ZjkfJsakjbfUWoasdOIawho", data)
    }

    function loadGame() {
        let unShit = (v) => JSON.parse(atob(v.split("").reverse().join("")));
        let save = localStorage.getItem("ZjkfJsakjbfUWoasdOIawho")
        if (!save) return console.warn("No save found!");
        let data = (unShit(save))
        progresses = data.p
        money = data.m
        progressSpeeds = data.ps
        unlocks = data.u
        upgradeCosts = data.uc
        spinMoney = data.s
        upgradePerks = data.pe
        priceMult = data.mu
        document.getElementById("moneyDisplay").innerText = "Money: " + money
        document.getElementById("upg" + (1)).innerText = "1. +" + upgradePerks[0] + " Speed\nPrice: " + upgradeCosts[0] + "$"
        document.getElementById("upg" + (2)).innerText = "2. +" + upgradePerks[1] + " Speed\nPrice: " + upgradeCosts[1] + "$"
        document.getElementById("upg" + (3)).innerText = "3. +" + upgradePerks[2] + " Speed\nPrice: " + upgradeCosts[2] + "$"
        document.getElementById("upg" + (4)).innerText = "4. +" + upgradePerks[3] + " Speed\nPrice: " + upgradeCosts[3] + "$"
        document.getElementById("upg" + (5)).innerText = "5. +" + upgradePerks[4] + " Speed\nPrice: " + upgradeCosts[4] + "$"
        document.getElementById("upg" + (6)).innerText = "6. +" + upgradePerks[5] + " Speed\nPrice: " + upgradeCosts[5] + "$"
    }

    setInterval(saveGame, 10000)

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

    addEventListener('click', () => {
        audio.play();
        audio.volume = 0.2
        audio.currentTime
        audio.addEventListener('ended', function () {
            var next = Math.round(Math.random()*5)
            audio.src = music[next]
            audio.play()
        })
    });
})()

