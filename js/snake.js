var x = [240, 240, 240];
var y = [240, 240, 240];

var r = Math.random();
fx = ((r * 50) - (r * 50 % 1)) * 10;
var r = Math.random();
fy = ((r * 50) - (r * 50 % 1)) * 10;

var l = 3;
var ll = 3;
var k;

var died = false;

function updet() {
    if (k == 'Space' || k == 'KeyE') { return; }
    var xs = x[0];
    var ys = y[0];

    if (k == 'KeyW') { y[0] = y[0] - 10; }
    else if (k == 'KeyA') { x[0] = x[0] - 10; }
    else if (k == 'KeyS') { y[0] = y[0] + 10; }
    else if (k == 'KeyD') { x[0] = x[0] + 10; }

    for (var i = 1; i < l; i++) {
        if (x[i] == x[0] && y[i] == y[0]) {
            died = true;
        }
    }

    if (x[0] == fx && y[0] == fy) {
        x.push(x[l - 1]);
        y.push(y[l - 1]);

        for (var i = l - 1; i > ll; i--) {
            x[i] = x[i - 1];
            y[i] = y[i - 1];
        }
        x[ll] = xs;
        y[ll] = ys;

        l++;

        var r = Math.random();
        fx = ((r * 50) - (r * 50 % 1)) * 10;
        
        var r = Math.random();
        fy = ((r * 50) - (r * 50 % 1)) * 10;
    }
    else {
        x[ll - 1] = xs;
        y[ll - 1] = ys;

        ll -= 1;
        if (ll < 2)
        {
            ll = l;
        }
    }

    if ((x[0] < 0) || (x[0] >= 500) || (y[0] < 0) || (y[0] >= 500) || died) {
        l = 3;
        ll = 3;

        x = [240, 240, 240];
        y = [240, 240, 240];

        died = false;
    }
}

window.onload = function() {
    var canv = document.getElementById('game');
    if(canv && canv.getContext) {
        var ctx = canv.getContext('2d');
        
        setInterval(function() {
            updet();
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 500, 500);

            var grad = ctx.createLinearGradient(230, 0, 270, 0);

            grad.addColorStop('0', 'magenta');
            grad.addColorStop('0.50', 'blue');
            grad.addColorStop('1', 'red');

            ctx.fillStyle = grad;
            ctx.textAlign = 'center';
            ctx.font = '30px Georgia';
            ctx.fillText(l, 250, 90);

            for (var i = 0; i < l; i++) {
                ctx.fillStyle = 'green';
                ctx.fillRect(x[i], y[i], 10, 10);
            }
            
            ctx.fillStyle = 'red';
            ctx.fillRect(fx, fy, 10, 10);

        }, 120);
    }
    
    var up = document.getElementById('up')
    var left = document.getElementById('left')
    var right = document.getElementById('right')
    var down = document.getElementById('down')
    var pause = document.getElementById('pause')
    
    up.addEventListener('click', function() {
        k = 'KeyW';
    })
    left.addEventListener('click', function() {
        k = 'KeyA';
    })
    right.addEventListener('click', function() {
        k = 'KeyD';
    })
    down.addEventListener('click', function() {
        k = 'KeyS';
    })

    pause.addEventListener('click', function() {
        k = 'Space';
    })
}

document.addEventListener('keydown', function(e) {
    k = e.code;
})

/*
function setL(LLL) {
    l = LLL
}*/