function hexToRgbArr(hex) {
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (reg.test(hex)) {
        var color = [], hex = hex.slice(1);
        if (hex.length === 3) {
            for (var i = 0; i < 3; i++) {
                color[i] = parseInt(hex[i] + hex[i], 16);
            }
            return color
        } else if (hex.length === 6) {
            for (var i = 0; i < 3; i++) {
                color[i] = parseInt('0x' + hex.substr(i * 2, 2));
            }
            return color;
        }
    } else {
        return [0, 0, 0];
    }
}

function parseRgbToArr(rgb) {
    const regex = /^rgb\((?<r>[0-9]+),(?<g>[0-9]+),(?<b>[0-9]+)\)$/gm;
    const m = regex.exec(rgb)
    if (m !== null) {
        console.log(m.groups["us"]);
        return [m.groups["r"] || 0, m.groups["g"] || 0, m.groups["b"] || 0]
    } else {
        return [0, 0, 0]
    }
}

function CaculateColor(config) {
    let start = [0, 0, 0]
    let end = [0, 0, 0]
    if (config.hex) {
        start = hexToRgbArr(config.start)
        end = hexToRgbArr(config.end)
    } else {
        start = parseRgbToArr(config.start)
        end = parseRgbToArr(config.end)
    }
    console.log(start, end);
    let res = []
    for (let i = 0; i < 3; i++) {
        res.push(Math.round(start[i]+(end[i]-start[i])*config.st))
    }
    config.func(res)
}

const changeColor = (color) => {
    console.log(color);
}
let config = {
    start: "#1ac3af",
    end: "#1ac3e6",
    hex: true,
    st: 0.9,
    func: changeColor
}
CaculateColor(config)
// parseRgbToArr("rgb(2,255,4)")