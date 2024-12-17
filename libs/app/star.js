var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 5;
var numStars = 300;
var intervalID;
$('document').ready(function() {
    screenH = $("#m_header").height();
    screenW = window.innerWidth;
    canvas = $('#viewer');
    canvas.attr('height', screenH);
    canvas.attr('width', screenW);
    context = canvas[0].getContext('2d');
    for (var i = 0; i < numStars; i++) {
        var x = Math.round(Math.random() * screenW);
        var y = Math.round(Math.random() * screenH);
        var length = 1 + Math.random() * 3;
        var opacity = Math.random();
        var star = new Star(x, y, length, opacity);
        stars.push(star)
    }
    requestAnimationFrame(animate)
});
window.addEventListener("resize", function() {
    screenW = window.innerWidth;
    canvas.attr('width', screenW);
    cancelAnimationFrame(intervalID);
    intervalID = requestAnimationFrame(animate)
});

function animate() {
    context.clearRect(0, 0, screenW, screenH);
    $.each(stars, function() {
        this.draw(context)
    })
    intervalID = requestAnimationFrame(animate)
}

function Star(x, y, length, opacity) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.length = parseInt(length);
    this.opacity = opacity;
    this.factor = 1;
    this.increment = Math.random() * .05
}
Star.prototype.draw = function() {
    context.rotate((Math.PI * 1 / 10));
    context.save();
    context.translate(this.x, this.y);
    if (this.opacity > 1) {
        this.factor = -1
    } else if (this.opacity <= 0) {
        this.factor = 1;
        this.x = Math.round(Math.random() * screenW);
        this.y = Math.round(Math.random() * screenH)
    }
    this.opacity += this.increment * this.factor;
    context.beginPath()
    for (var i = 5; i--;) {
        context.lineTo(0, this.length);
        context.translate(0, this.length);
        context.rotate((Math.PI * 2 / 10));
        context.lineTo(0, -this.length);
        context.translate(0, -this.length);
        context.rotate(-(Math.PI * 6 / 10))
    }
    context.lineTo(0, this.length);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
    context.fill();
    context.restore()
}