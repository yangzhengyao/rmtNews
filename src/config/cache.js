export const getCache = name => {
    if (!name) return
    return window.sessionStorage.getItem(name)
}

export const setCache = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
}

export const removeCache = (name) => {
    if (!name) return
    window.sessionStorage.removeItem(name)
}

export const get_local_cache = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}

export const set_local_cache = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

export const remove_local_cache = (name) => {
    if (!name) return
    window.localStorage.removeItem(name)
}


/* 时间转yyyy-mm-dd hh:mm:ss */
export const formatDate = (dateTime) => {
    var dateTemp = dateTime.slice(0, 10).replace(/-/g, '/') + ' ' + dateTime.slice(11, 19)
    var date = new Date(dateTemp)
    var y = date.getFullYear()
    var m = date.getMonth()+1
    var d = date.getDate()
    var h = date.getHours()
    var m1 = date.getMinutes()
    var s = date.getSeconds()
    m = m < 10 ? ("0" + m) : m
    d = d < 10 ? ("0" + d) : d
    h = h < 10 ? ("0" + h) : h
    m1 = m1 < 10 ? ("0" + m1) : m1
    s = s < 10 ? ("0" + s) : s
    return y + "-" + m + "-" + d + " " + h + ":" + m1 + ":" + s
}

/* 时间转 几天前 几分钟前 */
export const getDateDiff = (dateTime) => {
    var dateTemp = dateTime.slice(0, 10).replace(/-/g, '/') + ' ' + dateTime.slice(11, 19)
    var dateTimeStamp = new Date(dateTemp).getTime()
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if (diffValue < 0) {
        return
    }
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    var result = ''
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前"
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前"
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前"
    } else
        result = "刚刚";
    return result;
}

/* 采编时间转yyyy-mm-dd hh:mm:ss */
export const formatDate_8 = (dateTime) => {
    var dateTemp = dateTime.slice(0, 10).replace(/-/g, '/') + ' ' + dateTime.slice(11, 19)
    var date = new Date(new Date(dateTemp).getTime() + (1000*60*60*8))
    var y = date.getFullYear()
    var m = date.getMonth()+1
    var d = date.getDate()
    var h = date.getHours()
    var m1 = date.getMinutes()
    var s = date.getSeconds()
    m = m < 10 ? ("0" + m) : m
    d = d < 10 ? ("0" + d) : d
    h = h < 10 ? ("0" + h) : h
    m1 = m1 < 10 ? ("0" + m1) : m1
    s = s < 10 ? ("0" + s) : s
    return y + "-" + m + "-" + d + " " + h + ":" + m1 + ":" + s
}

/* 采编时间转 几天前 几分钟前 */
export const getDateDiff_8 = (dateTime) => {
    var dateTemp = dateTime.slice(0, 10).replace(/-/g, '/') + ' ' + dateTime.slice(11, 19)
    var dateTimeStamp = new Date(new Date(dateTemp).getTime() + (1000*60*60*8))
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if (diffValue < 0) {
        return
    }
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    var result = ''
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前"
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前"
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前"
    } else
        result = "刚刚";
    return result;
}

