const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
const btcData = [42000, 42500, 41800, 43000, 43500, 43700, 44000];
const ethData = [2500, 2520, 2520, 2540, 2560, 2550, 2570];

const padding = 60;
const chartWidth = canvas.width - padding * 2;
const chartHeight = canvas.height - padding * 2;

// шукаємо min/max для шкали
const allValues = btcData.concat(ethData);
const minValue = Math.min(...allValues) * 0.95;
const maxValue = Math.max(...allValues) * 1.05;

// функції перетворення даних у координати
function getX(index) {
    return padding + (index / (labels.length - 1)) * chartWidth;
}
function getY(value) {
    return padding + chartHeight - (value - minValue) / (maxValue - minValue) * chartHeight;
}

// малюємо сітку
function drawGrid() {
    ctx.strokeStyle = "#ddd";
    ctx.fillStyle = "#666";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    // вертикальні лінії + підписи часу
    labels.forEach((label, i) => {
        const x = getX(i);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
        ctx.fillText(label, x, canvas.height - padding + 20);
    });

    // горизонтальні лінії + підписи по осі Y
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
        const y = padding + (i / steps) * chartHeight;
        const value = maxValue - (i / steps) * (maxValue - minValue);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        ctx.textAlign = "right";
        ctx.fillText("$" + Math.round(value), padding - 5, y + 3);
    }
}

// малюємо лінію
function drawLine(data, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((val, i) => {
        const x = getX(i);
        const y = getY(val);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // малюємо точки
    data.forEach((val, i) => {
        const x = getX(i);
        const y = getY(val);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

// малюємо графік
function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawLine(btcData, "orange");
    drawLine(ethData, "blue");
}

// показуємо ціну при наведенні
function showTooltip(mouseX, mouseY) {
    const radius = 8;
    let found = false;

    function checkPoints(data, color, label) {
        data.forEach((val, i) => {
            const x = getX(i);
            const y = getY(val);
            if (Math.abs(mouseX - x) < radius && Math.abs(mouseY - y) < radius) {
                // малюємо підпис
                const text = `${label}: $${val}`;
                ctx.fillStyle = "white";
                ctx.fillRect(x - 40, y + 10, 80, 20);
                ctx.strokeStyle = "#ccc";
                ctx.strokeRect(x - 40, y + 10, 80, 20);
                ctx.fillStyle = color;
                ctx.textAlign = "center";
                ctx.fillText(text, x, y + 25);
                found = true;
            }
        });
    }

    checkPoints(btcData, "orange", "BTC");
    checkPoints(ethData, "blue", "ETH");

    return found;
}

canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    drawChart();
    showTooltip(mouseX, mouseY);
});

// стартове малювання
drawChart();