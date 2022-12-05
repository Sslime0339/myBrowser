var x = [240, 240, 240];
var y = [240, 240, 240];

var r = Math.random();
fx = ((r * 50) - (r * 50 % 1)) * 10;
var r = Math.random();
fy = ((r * 50) - (r * 50 % 1)) * 10;

var l = 3;
var ll = 3;
var maxL = 3;
var k;
var lk;

var died = false;


window.onload = function() {
    var canv = document.getElementById('game');
    if(canv && canv.getContext) {
        var ctx = canv.getContext('2d');
        
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 500, 500);
    
        for (var i = 0; i < l; i++) {
            ctx.fillStyle = 'green';
            ctx.fillRect(x[i], y[i], 10, 10);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(fx, fy, 10, 10);

        maxL = localStorage.getItem('maxL');
        if (maxL == null) {
            maxL = 3;
        }
        
        setInterval(function() {
            if (!(k == 'Space' || k == 'KeyE')) {
                var xs = x[0];
                var ys = y[0];
                
                if (k == 'KeyW') { y[0] = y[0] - 10; }
                else if (k == 'KeyA') { x[0] = x[0] - 10; }
                else if (k == 'KeyS') { y[0] = y[0] + 10; }
                else if (k == 'KeyD') { x[0] = x[0] + 10; }
                lk = k;
            
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
                    
                    if (l > maxL) { 
                        maxL = l; 
                        localStorage.setItem('maxL', maxL)
                    }


                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, 500, 500);
    
                    
                    for (var i = 1; i < l; i++) {
                        ctx.fillStyle = 'green';
                        ctx.fillRect(x[i], y[i], 10, 10);
                    }

                    ctx.fillStyle = 'green';
                    ctx.fillRect(x[0], y[0], 10, 10);

                    ctx.fillStyle = 'red';
                    ctx.fillRect(fx, fy, 10, 10);
                }
                else {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x[ll - 1], y[ll - 1], 10, 10);

                    x[ll - 1] = xs;
                    y[ll - 1] = ys;
                    
                    ctx.fillStyle = 'green';
                    ctx.fillRect(x[ll - 1], y[ll - 1], 10, 10);
                    ctx.fillRect(x[0], y[0], 10, 10);

                    ll -= 1;
                    if (ll < 2) {
                        ll = l;
                    }
                }
            
                for (var i = 1; i < l; i++) {
                    if (x[i] == x[0] && y[i] == y[0]) {
                        died = true;
                    }
                }
        
                if ((x[0] < 0) || (x[0] >= 500) || (y[0] < 0) || (y[0] >= 500) || died) {

                    l = 3;
                    ll = 3;
                    
                    x = [240, 240, 240];
                    y = [240, 240, 240];
                
                    var r = Math.random();
                    fx = ((r * 50) - (r * 50 % 1)) * 10;
                    var r = Math.random();
                    fy = ((r * 50) - (r * 50 % 1)) * 10;

                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, 500, 500);
                
                    for (var i = 0; i < l; i++) {
                        ctx.fillStyle = 'green';
                        ctx.fillRect(x[i], y[i], 10, 10);
                    }
            
                    ctx.fillStyle = 'red';
                    ctx.fillRect(fx, fy, 10, 10);

                    k = 'Space';
                    lk = 'Space';
                    died = false;
                }
                var grad = ctx.createLinearGradient(230, 0, 270, 0);

                grad.addColorStop('0', 'magenta');
                grad.addColorStop('0.50', 'blue');
                grad.addColorStop('1', 'red');

                ctx.fillStyle = grad;
                ctx.textAlign = 'center';
                ctx.font = '30px Georgia';
                ctx.fillText(l, 225, 90);
                ctx.fillText(maxL, 275, 90);
            }
        }, 180);
    }
    
    var up = document.getElementById('up')
    var left = document.getElementById('left')
    var right = document.getElementById('right')
    var down = document.getElementById('down')
    var pause = document.getElementById('pause')
    
    up.addEventListener('click', function() {
        if ( lk != 'KeyS') { k = 'KeyW'; }
    })
    left.addEventListener('click', function() {
        if ( lk != 'KeyD' ) { k = 'KeyA'; }
    })
    right.addEventListener('click', function() {
        if ( lk != 'KeyA' ) { k = 'KeyD'; }
    })
    down.addEventListener('click', function() {
        if ( lk != 'KeyW') { k = 'KeyS'; }
    })

    pause.addEventListener('click', function() {
        k = 'Space';
    })
}

document.addEventListener('keydown', function(e) {
    if ((e.code == 'KeyW' && lk != 'KeyS') || 
    (e.code == 'KeyA' && lk != 'KeyD') || 
    (e.code == 'KeyS' && lk != 'KeyW') || 
    (e.code == 'KeyD' && lk != 'KeyA') || 
    e.code == 'KeyE' || e.code == 'Space') 
    {
        k = e.code;
    }
})

/*
function setL(LLL) {
    l = LLL
}*/