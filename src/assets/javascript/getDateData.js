export function getMonthData(year, month) {
  let monthData = []
  // 初始默认值
  if (!year || !month) {
    year = new Date().getFullYear()
    month = new Date().getMonth() + 1
  }

  // 获取本月第一天和这天是星期几
  let curMonthFirstDay = new Date(year, month - 1, 1)
  let curMonthFirstDayWeek = curMonthFirstDay.getDay() === 0 ? 7 : curMonthFirstDay.getDay()
  year = curMonthFirstDay.getFullYear()
  month = curMonthFirstDay.getMonth() + 1

  // 获取本月最后一天和这天是几号
  let curMonthLastDay = new Date(year, month, 0)
  let curMonthLastDayNum = curMonthLastDay.getDate()

  // 获取上个月最后一天和这天是几号
  let prevMonthLastDay = new Date(year, month - 1, 0) /*month - 1:为原来的月份,0:可以变成一个月最后一天*/
  let prevMonthLastDayNum = prevMonthLastDay.getDate()

  // 计算补多少天为上个月的
  let prevMonthDayCount = curMonthFirstDayWeek - 1 /*假设本月1号为周四,则4-1 = 3,还要补三天*/

  for (let i = 0; i < 7 * 6; i++){
    let date = i - prevMonthDayCount
    let showDay = date
    let showMonth = month
    let showYear = year
    // 天数越界处理
    if (date <= 0) {
      // 上一个月
      showDay = prevMonthLastDayNum + date
      showMonth = month - 1
    }else if (date > curMonthLastDayNum) {
      // 下个月
      showDay = showDay - curMonthLastDayNum
      showMonth = month + 1
    }
    // 月数越界处理
    if (showMonth == 0){
      showMonth = 12;
      showYear--;
    }
    if (showMonth == 13){
      showMonth = 1;
      showYear++;
    }
    monthData.push({
      showYear,
      showMonth,
      showDay,
      date,
    })
  }
  return {
    year,
    month,
    days: monthData
  }
}
