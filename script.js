(async () => {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var progresses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var spinsPerSecond = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var unlocks = [true, false, false, false, false, false, false, false, false, false]
    var upgradeCosts = [10, 100, 1000, 10000, 1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000]
    var spinMoney = [1, 100, 500, 2500, 10000, 1000000, 5000000, 10000000, 50000000]
    var upgradePerks = [0.2, 0.1, 0.068, 0.05, 0.04, 0.033, 0.029, 0.025, 0.022, 0.02]
    var spinMultiplier = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    var spinMultiplierIncrease = [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]
    var upgradeAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var costMultiplier = [1.2, 1.24, 1.28, 1.32, 1.36, 1.4, 1.44, 1.48, 1.52, 1.56]
    var gameVersion = "0.2"

    var dprogresses = progresses
    var dspinsPerSecond = spinsPerSecond
    var dunlocks = unlocks
    var dupgradeCosts = upgradeCosts
    var dspinMoney = spinMoney
    var dupgradePerks = upgradePerks
    var dspinMultiplier = spinMultiplier
    var dspinMultiplierIncrease = spinMultiplierIncrease
    var dupgradeAmount = upgradeAmount
    var dcostMultiplier = costMultiplier

    let oldTime
    let afkTime = 0
    let moneyPerSecond = 0
    let money = 0
    let moneyBackup = 0
    let pPoint = 0
    let prestigePoints = 0
    let delta = 0
    let oldDelta = 0
    let preferredAxis = 0
    let clicksBeforePrestige = 0
    let CBPCooldown = 0
    const music = ["music/1.mp3", "music/2.mp3", "music/3.mp3", "music/4.mp3", "music/5.mp3"]
    var audio = new Audio(music[0])

    loadGame()
    requestAnimationFrame(render)


    function render(timestamp) {
        delta = (timestamp - oldDelta)
        oldDelta = timestamp
        height = window.innerHeight
        width = window.innerWidth
        canvas.height = height
        canvas.width = width / 100 * 99.9

        //circles themselves
        ctx.lineCap = 'round'
        drawCircle('#ffffffff', 6.25, 9)

        drawCircle('#f73780ff', 6.78, 8)

        drawCircle('#b937f5ff', 7.4, 7)

        drawCircle('#333dfbff', 8.15, 6)

        drawCircle('#30d8f6ff', 9.1, 5)

        drawCircle('#24f879ff', 10.3, 4)

        drawCircle('#8df236ff', 11.85, 3)

        drawCircle('#e5d41bff', 14, 2)

        drawCircle('#f29d35ff', 17, 1)

        drawCircle('rgba(241, 58, 58, 1)', 22, 0)
        CBPCooldown += delta / 1000
        if (CBPCooldown >= 5){
            CBPCooldown = 0
            clicksBeforePrestige = 0
        }
        document.getElementById('prestige-amount').innerText = "You will receive " + prestige(true) + " prestige points"
        showUpgradeButtons()
        progress()
        requestAnimationFrame(render) // keep on bottom!
    }

    function drawCircle(color, size, id) {

        if (width > height){
            preferredAxis = width
        }else{
            preferredAxis = height
        }
        ctx.lineWidth = preferredAxis / 103
        if (unlocks[id]) {
            ctx.beginPath()
            if (spinsPerSecond[id] < 10) {
                ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), preferredAxis / size, -Math.PI / 2, (-Math.PI / 2) + progresses[id] / 360 * Math.PI * 2)
            } else if (spinsPerSecond[id] >= 10) {
                ctx.arc(getCenter(0, "x"), getCenter(height / 30, "y"), preferredAxis / size, -Math.PI / 2, (-Math.PI / 2) + 1 * Math.PI * 2)
            }
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
            moneyPerSecond += Math.round((spinMoney[index] * spinsPerSecond[index]) * (1 + (prestigePoints / 50)))

            if (unlocks[index]) {
                progresses[index] += (360 * spinsPerSecond[index] / (1000 / delta))
            }

            if (progresses[index] >= 360) {
                progresses[index] = 0
                spinMultiplier[index] += spinMultiplierIncrease[index]
                money += Math.round((spinMoney[index] * spinMultiplier[index]))
                document.getElementById("moneyDisplay").innerText = "Money: " + money
            }
            index++
        })
    }

    function upgrade(id) {
        if (unlocks[id] || upgradeAmount[id - 1] >= 5) {
            if (money >= upgradeCosts[id]) {
                unlocks[id] = true
                money -= upgradeCosts[id]
                spinsPerSecond[id] += upgradePerks[id]
                upgradeAmount[id]++
                upgradeCosts[id] = Math.round(upgradeCosts[id] * costMultiplier[id])
                document.getElementById("upg" + (id + 1)).innerText = (id + 1) + ". +" + upgradePerks[id] + " Speed\nPrice: " + upgradeCosts[id] + "$"
            }
        }
    }

    function saveGame() {
        let shitCrypt = (v) => btoa(JSON.stringify(v)).split("").reverse().join("");
        let data = (shitCrypt({
            m: money,
            p: progresses,
            ps: spinsPerSecond,
            u: unlocks,
            uc: upgradeCosts,
            s: spinMoney,
            pe: upgradePerks,
            pp: prestigePoints,
            sm: spinMultiplier,
            smi: spinMultiplierIncrease,
            ua: upgradeAmount,
            version: gameVersion
        }))
        localStorage.setItem("ZjkfJsakjbfUWoasdOIawho", data)
    }

    function loadGame() {
        let unShit = (v) => JSON.parse(atob(v.split("").reverse().join("")));
        let save = localStorage.getItem("ZjkfJsakjbfUWoasdOIawho")
        try{
            if (save.version == gameVersion) { //Dont ask why it works, Okay??
                console.warn("Incompatible save version!")
                localStorage.clear()
                fillSave()
                saveGame()
            }
        }catch{
            console.warn("Incompatible save version!(No version found)")
            localStorage.clear()
            fillSave()
            saveGame()
        }

        if (!save) return console.warn("No save found!");
        let data = (unShit(save))
        progresses = data.p ?? dprogresses
        money = data.m ?? 0
        spinsPerSecond = data.ps ?? dspinsPerSecond
        unlocks = data.u ?? dunlocks
        upgradeCosts = data.uc ?? dupgradeCosts
        spinMoney = data.s ?? dspinMoney
        upgradePerks = data.pe ?? dupgradePerks
        spinMultiplier = data.sm ?? dspinMultiplier
        spinMultiplierIncrease = data.smi ?? dspinMultiplierIncrease
        upgradeAmount = data.ua ?? dupgradeAmount
        prestigePoints = data.pp ?? 0
        fillSave()
        updateTexts()
    }

    function fillSave(){
        if (progresses.length < dprogresses.length) {
            for (let i = progresses.length; i < dprogresses.length; i++) {
                progresses.push(dprogresses[i])
                spinsPerSecond.push(dspinsPerSecond[i])
                unlocks.push(dunlocks[i])
                upgradeCosts.push(dupgradeCosts[i])
                spinMoney.push(dspinMoney[i])
                upgradePerks.push(dupgradePerks[i])
                spinMultiplier.push(dspinMultiplier[i])
                spinMultiplierIncrease.push(dspinMultiplierIncrease[i])
                upgradeAmount.push(dupgradeAmount[i])
            }
        }
    }

    setInterval(saveGame, 10000)

    function updateTexts() {
        document.getElementById("moneyDisplay").innerText = "Money: " + money
        let index = 0
        unlocks.forEach(function () {
            try {
                document.getElementById("upg" + (index + 1)).innerText = (index + 1) + ". +" + upgradePerks[index] + " Speed\nPrice: " + upgradeCosts[index] + "$"
                if (index < unlocks.length - 2) index++
            } catch (e) { console.warn(e) }
        })
    }

    function prestige(view) {
        if (calculatePrices(upgradeAmount) + money >= 10000000000) {
            pPoint = 0
            let index = 0
            pPoint += calculatePrices(upgradeAmount)
            pPoint += Math.floor(money / 1000000000)

            if (view) return pPoint
        } else return 0
        if (!view) {
            money = 0
            progresses = [0, 0, 0, 0, 0, 0]
            spinsPerSecond = [0.01, 0.002, 0.001, 0.0006, 0.0004, 0.0003]
            unlocks = [true, false, false, false, false, false]
            upgradeCosts = [75, 250, 5000, 25000, 1000000, 25000000]
            spinMoney = [10, 100, 500, 2500, 10000, 1000000]
            upgradePerks = [0.01, 0.003, 0.001, 0.001, 0.0008, 0.0007]
            prestigePoints += pPoint
            saveGame()
            updateTexts()
        }
    }

    function showUpgradeButtons() {
        var buttons = [document.getElementById('upg1'), document.getElementById('upg2'), document.getElementById('upg3'), document.getElementById('upg4'), document.getElementById('upg5'), document.getElementById('upg6'), document.getElementById('upg7'), document.getElementById('upg8'), document.getElementById('upg9')]
        for (let index = 0; index < unlocks.length; index++) {
            if (upgradeAmount[index] >= 5) {
                buttons[index + 1].style.display = 'block'
            }
        }
    }

    function calculatePrices(amount){
        let wholePrice = 0
        let circle = 0
        let lastPrice = 0
        unlocks.forEach(function(){
            lastPrice = dupgradeCosts[circle]
            for (let i = 0; i < amount[circle]; i++){
                wholePrice += lastPrice
                lastPrice = lastPrice * costMultiplier[circle]
            }

            if (circle < unlocks.length - 2)circle++
        })
        wholePrice = Math.round(wholePrice)
        return wholePrice
    }


    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState == "hidden") {
            oldTime = Date.now()
        } else {
            afkTime = Math.round((Date.now() - oldTime) / 1000)
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

    document.querySelector('.prestige-menu').classList.add('active');

    document.querySelector('.prestige-menu').addEventListener('click', function (e){
        clicksBeforePrestige++
        document.getElementById('prestige-countdown').innerText = "Click this button " + (5 - clicksBeforePrestige) + " more times to prestige"
        if (clicksBeforePrestige >= 5){
            prestige(false)
        }
    })

    document.querySelector('.upgrade-tab').addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'button') return;
        this.classList.toggle('active');
    });

    var musicPlaying = false
    addEventListener('click', () => {
        audio.play();
        audio.volume = 0.2
        musicPlaying = true
        audio.addEventListener('ended', function () {
            musicPlaying = false
            if (!musicPlaying) {
                try{
                    var next = Math.round(Math.random() * 5)
                    audio.src = music[next]
                    audio.play()
                    musicPlaying = true
                }catch{}
            }
        })
    });
})()

