export const getTimer = (stringTime: string) => {
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let week = day * 7
  let month = day * 30
  let time1 = new Date().getTime() //当前的时间戳
  // console.log(time1)
  let time2 = Date.parse(stringTime) //指定时间的时间戳
  // console.log(time2)
  let time = time1 - time2

  let result = null
  if (time < 0) {
    alert('设置的时间不能早于当前时间！')
  } else if (time / month >= 1) {
    result = Math.floor(time / month) + '月前'
  } else if (time / week >= 1) {
    result = Math.floor(time / week) + '周前'
  } else if (time / day >= 1) {
    result = Math.floor(time / day) + '天前'
  } else if (time / hour >= 1) {
    result = Math.floor(time / hour) + '小时前'
  } else if (time / minute >= 1) {
    result = Math.floor(time / minute) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}
// 防抖函数
export const debounce = (fn: Function, delay = 1600) => {
  // 定时器
  let timer: number | null = null

  // 将debounce处理结果当作函数返回
  return (...args: any[]) => {
    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn(...args)
    }, delay)
  }
}
