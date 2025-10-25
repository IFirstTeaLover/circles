var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

requestAnimationFrame(render)

function render(){
    height = window.innerHeight
    width = window.innerWidth
    canvas.height = height/100*99.5
    canvas.width = width/100*99.9

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
    requestAnimationFrame(render) // keep on bottom!
}

function getCenter(size, axis){
    if (axis == "x")return width/2-size/2
    else if (axis == "y") return height/2-size/2
}