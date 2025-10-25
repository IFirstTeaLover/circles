var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var progresses = [0, 0, 0]
var progressSpeeds = [0.01, 0.002, 0.001]
var unlocks = [true, false, false]
var upgradeCosts = [75, 250, 5000]
var spinMoney = [10, 100, 500]
var upgradePerks = [0.01, 0.003, 0.001]
var priceMult = [1.05, 1.015, 1.004]
var money = 0

requestAnimationFrame(render)


function render() {
    height = window.innerHeight
    width = window.innerWidth
    canvas.height = height
    canvas.width = width

    //circles themselves
    ctx.lineWidth = width / 103
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
    //ctx.moveTo(getCenter(0, "x"), getCenter(height / 30, "y"));
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
        if (progressSpeeds[index] >= 1){
            progresses[index] = 1
        }

        if (unlocks[index]) progresses[index] += progressSpeeds[index]
        if (progresses[index] >= 1) {
            if (progressSpeeds[index] < 1){
            progresses[index] = 0}
            money += spinMoney[index]
            document.getElementById("moneyDisplay").innerText = "Money: "+money
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
            document.getElementById("upg"+(id+1)).innerText = "1. +"+upgradePerks[id]+"0.01 Speed\nPrice: "+upgradeCosts[id]+"$"
            document.getElementById("moneyDisplay").innerText = "Money: "+money
        }
    }
}
document.querySelector('.upgrade-tab').addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() === 'button') return;
    this.classList.toggle('active');
});
