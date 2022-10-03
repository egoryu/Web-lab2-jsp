

$(function() {
    const X_VALUES = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    const Y_MIN = -5;
    const Y_MAX = 5;

    let canvas = document.getElementById('plot'),
        ctx = canvas.getContext('2d');
    start();
    function drawPlot() {
        ctx.width = 320;
        ctx.high = 320;
        let width = ctx.width,
            high = ctx.high;

        ctx.fillStyle = '#00FFFF';

        ctx.beginPath();
        //radius
        ctx.arc(width / 2, high / 2, 75, Math.PI, 3 * Math.PI / 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(160, 85);
        ctx.lineTo(160, 160);
        ctx.lineTo(85, 160);
        ctx.closePath();
        ctx.fill();
        //square
        ctx.fillRect(width / 2, 10, 150, 150);

        //triangle
        ctx.beginPath();
        ctx.moveTo(160 + 75, 160);
        ctx.lineTo(160, 160);
        ctx.lineTo(160, 310);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.font = "15px Arial bold"

        //0x
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 160);
        ctx.lineTo(320, 160);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(320, 160);
        ctx.lineTo(315, 155);
        ctx.lineTo(315, 165);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(10, 156);
        ctx.lineTo(10, 164);
        ctx.stroke();
        ctx.fillText("-R", 10, 156);

        ctx.beginPath();
        ctx.moveTo(85, 156);
        ctx.lineTo(85, 164);
        ctx.stroke();
        ctx.fillText("-R/2", 85, 156);

        ctx.beginPath();
        ctx.moveTo(235, 156);
        ctx.lineTo(235, 164);
        ctx.stroke();
        ctx.fillText("R/2", 235, 156);

        ctx.beginPath();
        ctx.moveTo(310, 156);
        ctx.lineTo(310, 164);
        ctx.stroke();
        ctx.fillText("R", 308, 156);
        ctx.fillText("X", 310, 180);

        //0y
        ctx.beginPath();
        ctx.moveTo(160, 0);
        ctx.lineTo(160, 320);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(160, 0);
        ctx.lineTo(155, 5);
        ctx.lineTo(165, 5);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(156, 10);
        ctx.lineTo(164, 10);
        ctx.stroke();
        ctx.fillText("R", 164, 15);

        ctx.beginPath();
        ctx.moveTo(156, 85);
        ctx.lineTo(164, 85);
        ctx.stroke();
        ctx.fillText("R/2", 164, 90);

        ctx.beginPath();
        ctx.moveTo(156, 235);
        ctx.lineTo(164, 235);
        ctx.stroke();
        ctx.fillText("-R/2", 164, 240);

        ctx.beginPath();
        ctx.moveTo(156, 310);
        ctx.lineTo(164, 310);
        ctx.stroke();
        ctx.fillText("-R", 164, 315);
        ctx.fillText("Y", 145, 10);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawPoint(x, y) {
        clearCanvas();
        drawPlot();

        if (x > canvas.width || x < -canvas.width || y > canvas.height || y < -canvas.height) return;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    canvas.addEventListener('click', function (event) {
        let rval = $('.r-radio:checked');
        rval = rval.val();
        if (rval === undefined || rval == null || isNaN(rval))
            return;
        let xFromCanvas = (event.offsetX - 160) / 150 * rval;
        let minDifference = Infinity;
        let nearestXValue;

        for (let i = 0; i < X_VALUES.length; i++) {
            if (Math.abs(xFromCanvas - X_VALUES[i]) < minDifference) {
                minDifference = Math.abs(xFromCanvas - X_VALUES[i]);
                nearestXValue = X_VALUES[i];
            }
        }

        let yValue = (-event.offsetY + 160) / 150 * rval;
        if (yValue < Y_MIN) yValue = Y_MIN;
        else if (yValue > Y_MAX) yValue = Y_MAX;

        drawPoint(nearestXValue * 150 / rval + 160, -(yValue / rval *  150 - 160));

        let xSelect = $('.x-checkbox:checked');
        xSelect.prop('checked', false);
        xSelect = $('.x-checkbox[value="' + nearestXValue + '"]');
        xSelect.prop('checked', true);

        $('#y-textinput').val(yValue.toString().substring(0, 10));

    });

    function start() {
        drawPlot();
        let url = window.location.pathname;
        if(url !== '/lab2/')
            window.location.replace("/lab2/");

        const lastResult = document.querySelector('#result-table tr:last-child');
        if (lastResult) {
            const row = lastResult.children;
            let x = parseInt(row[0].innerText);
            let y = parseFloat(row[1].innerText);
            let r = parseInt(row[2].innerText);

            let xSelect = $('.x-checkbox:checked');
            xSelect.prop('checked', false);
            xSelect = $('.x-checkbox[value="' + x + '"]');
            xSelect.prop('checked', true);

            $('#y-textinput').val(y.toString().substring(0, 10));

            let rSelect = $('.r-radio[value="' + r + '"]');
            rSelect.prop('checked', true);

            drawPoint(x * 150 / r + 160, -(y / r * 150 - 160));
        }
    }
})