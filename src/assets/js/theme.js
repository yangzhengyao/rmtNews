function theme() {
    var obj = {};
    if (process.env.THEME == 'haicang') {
        var aaa = import("../theme/haicang/config.js")

    } else if (process.env.THEME == 'qingtongxia') {
        obj.dominantColor = "#be2c1f"
    }
    return obj;
}

export { //很关键
    theme
   }