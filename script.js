var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var progresses = [0, 0, 0]
var progressSpeeds = [0.01, 0.002, 0.001]
var unlocks = [true, false, false]

requestAnimationFrame(render)


function render(){
    height = window.innerHeight
    width = window.innerWidth
    canvas.height = height/100*99.5
    canvas.width = width/100*99.9

    //circles themselves
    ctx.lineWidth = width/103
    if (unlocks[2]){
    ctx.beginPath()
    ctx.moveTo(getCenter(0, "x"), getCenter(height/30, "y"));
    ctx.arc(getCenter(0, "x"), getCenter(height/30, "y"), width/14, -Math.PI/2, (-Math.PI/2) + progresses[2] * Math.PI*2)
    ctx.strokeStyle = '#f0ea24ff'
    ctx.stroke()}

    if (unlocks[1]){
    ctx.beginPath()
    ctx.moveTo(getCenter(0, "x"), getCenter(height/30, "y"));
    ctx.arc(getCenter(0, "x"), getCenter(height/30, "y"), width/17, -Math.PI/2, (-Math.PI/2) + progresses[1] * Math.PI*2)
    ctx.strokeStyle = '#e7922aff'
    ctx.stroke()}

    ctx.beginPath()
    ctx.moveTo(getCenter(0, "x"), getCenter(height/30, "y"));
    ctx.arc(getCenter(0, "x"), getCenter(height/30, "y"), width/22, -Math.PI/2, (-Math.PI/2) + progresses[0] * Math.PI*2)
    ctx.strokeStyle = 'rgba(222, 34, 34, 1)'
    ctx.stroke()



    midButtons()
    progress()
    requestAnimationFrame(render) // keep on bottom!
}

function getCenter(size, axis){
    if (axis == "x")return width/2-size/2
    else if (axis == "y") return height/2-size/2
}

function midButtons(){
    //outter button
    ctx.beginPath()
    ctx.arc(getCenter(0, "x"), getCenter(height/30, "y"), width/25, 0, Math.PI*2)
    ctx.fillStyle = '#555555ff'
    ctx.strokeStyle = '#3a3a3aff'
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()

    //inner button
    ctx.beginPath()
    ctx.arc(getCenter(0, "x"), getCenter(height/30, "y"), width/32, 0, Math.PI*2)
    ctx.fillStyle = '#d72424ff'
    ctx.strokeStyle = '#821d1dff'
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()

}

function progress(){
    var index = 0
    progresses.forEach(function () {
        progresses[index] += progressSpeeds[index]
        if (progresses[index] >= 1.01) {
            progresses[index] = 0
        } 
        index++
    })
}