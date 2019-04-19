<template>
  <transition name="slideUp">
    <div v-if="is_show" class="c-Date">
      <div class="content">
        <div class="header">
          <span>{{headerShowDate()}}</span>
        </div>
        <div class="tool">
          <span>自定义日期范围</span>
          <span @click.stop="clearDateEvent('clearAll')">清空选择</span>
        </div>
        <div class="year-month">
          <div class="year">
            <img @click.stop="yearEvent('reduce')" src="../../assets/images/leftArrow.png"/>
            <span>{{year}}年</span>
            <img @click.stop="yearEvent('add')" src="../../assets/images/rightArrow.png"/>
          </div>
          <div class="month">
            <img @click.stop="monthEvent('reduce')" src="../../assets/images/leftArrow.png"/>
            <span>{{month | monthCase}}</span>
            <img @click.stop="monthEvent('add')" src="../../assets/images/rightArrow.png"/>
          </div>
        </div>
        <div class="week">
          <span style="color: #FF6868;">日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span style="color: #FF6868;">六</span>
        </div>
        <div class="day-show">
          <div class="row row1">
            <span @click="chooseDayEvent(item)" v-for="(item, index) in dayData.row1" :class="{'active': item.checked, 'is-no-choose': !item.isChoose}">
              <small :class="{'color-gray': item.showMonth != month, 'color-red': index == 0 || index == 6}">{{item.showDay}}</small>
              <small>{{item.label}}</small>
            </span>
          </div>
          <div class="row row2">
            <span @click="chooseDayEvent(item)" v-for="(item, index) in dayData.row2" :class="{'active': item.checked, 'is-no-choose': !item.isChoose}">
              <small :class="{'color-gray': item.showMonth != month, 'color-red': index == 0 || index == 6}">{{item.showDay}}</small>
              <small>{{item.label}}</small>
            </span>
          </div>
          <div class="row row3">
            <span @click="chooseDayEvent(item)" v-for="(item, index) in dayData.row3" :class="{'active': item.checked, 'is-no-choose': !item.isChoose}">
              <small :class="{'color-gray': item.showMonth != month, 'color-red': index == 0 || index == 6}">{{item.showDay}}</small>
              <small>{{item.label}}</small>
            </span>
          </div>
          <div class="row row4">
            <span @click="chooseDayEvent(item)" v-for="(item, index) in dayData.row4" :class="{'active': item.checked, 'is-no-choose': !item.isChoose}">
              <small :class="{'color-gray': item.showMonth != month, 'color-red': index == 0 || index == 6}">{{item.showDay}}</small>
              <small>{{item.label}}</small>
            </span>
          </div>
          <div class="row row5">
            <span @click="chooseDayEvent(item)" v-for="(item, index) in dayData.row5" :class="{'active': item.checked, 'is-no-choose': !item.isChoose}">
              <small :class="{'color-gray': item.showMonth != month, 'color-red': index == 0 || index == 6}">{{item.showDay}}</small>
              <small>{{item.label}}</small>
            </span>
          </div>
          <div class="row row6">
            <span @click="chooseDayEvent(item)" v-for="(item, index) in dayData.row6" :class="{'active': item.checked, 'is-no-choose': !item.isChoose}">
              <small :class="{'color-gray': item.showMonth != month, 'color-red': index == 0 || index == 6}">{{item.showDay}}</small>
              <small>{{item.label}}</small>
            </span>
          </div>
        </div>
        <div class="comfirm-btn">
          <div @click="hide">取消</div>
          <div @click="comfirmEvent">确定</div>
        </div>
      </div>
      <div class="mask" @click="hide"></div>
    </div>
  </transition>
</template>

<script>
  import {getMonthData} from '@/assets/javascript/getDateData'
  export default {
    name: "index",
    data() {
      return {
        is_show: false,
        dayData: {
          row1: [{showDay:1,checked:true,label:'开始'},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''}],
          row2: [{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''}],
          row3: [{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''}],
          row4: [{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''}],
          row5: [{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''}],
          row6: [{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''},{showDay:1,checked:false,label:''}]
        },
        allDayData: [],
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        firstChooseDay: '', // 第一次选择的日期
        secondChooseDay: '', // 第二次选择的日期
        // 标识是否点击了清空
        isChooseClear: false,
      }
    },
    mounted() {
      this.reader(this.year, this.month);
    },
    watch: {
      allDayData() {
        this.dayData.row1 = [];
        this.dayData.row2 = [];
        this.dayData.row3 = [];
        this.dayData.row4 = [];
        this.dayData.row5 = [];
        this.dayData.row6 = [];
        for(let i = 0;i<this.allDayData.length;i++){
          let item = this.allDayData[i];
          item.checked = false;
          item.label = '';
          item.isChoose = true;
          if(i<=6){
            this.dayData.row1.push(item);
          }
          if(6<i && i<=13){
            this.dayData.row2.push(item);
          }
          if(i>13 && i<=20){
            this.dayData.row3.push(item);
          }
          if(i>20 && i<=27){
            this.dayData.row4.push(item);
          }
          if(i>27 && i<=34){
            this.dayData.row5.push(item);
          }
          if(i>34 && i<=41){
            this.dayData.row6.push(item);
          }
        }
        this.isChooseEvent();
        this.rangeChooseEvent();
      }
    },
    filters: {
      monthCase(value) {
        switch (value) {
          case 1: return '一月';break;
          case 2: return '二月';break;
          case 3: return '三月';break;
          case 4: return '四月';break;
          case 5: return '五月';break;
          case 6: return '六月';break;
          case 7: return '七月';break;
          case 8: return '八月';break;
          case 9: return '九月';break;
          case 10: return '十月';break;
          case 11: return '十一月';break;
          case 12: return '十二月';break;
        }
        return value
      }
    },
    methods: {
      show() {
        this.is_show = true
      },
      hide() {
        this.is_show = false;
        if(this.isChooseClear){
          this.$emit('dateCancelEvent',{tip: '选择了清空的隐藏，要重置为本月'});
        }else{
          this.$emit('dateCancelEvent');
        }
        this.isChooseClear = false;
      },
      // 日期选择
      chooseDayEvent(item) {
        if(!this.firstChooseDay){ // 开始
          this.firstChooseDay = item;
          item.label = '开始';
          item.checked = true;
          this.isChooseEvent();
        }else{ // 结束
          if(!item.isChoose) return // 限制不能选择开始之前的日期
          this.secondChooseDay = item;
          item.label = '结束';
          item.checked = true;
          this.rangeChooseEvent();
        }
        this.$forceUpdate()
      },
      // 月份加减
      monthEvent(msg) {
        if(msg == 'add') {
          this.month++;
          if(this.month > 12) {
            this.month = 1;
            this.year = this.year + 1;
          }
        }else if(msg == 'reduce'){
          this.month--;
          if(this.month < 1) {
            this.month = 12;
            this.year = this.year - 1;
          }
        }
        this.reader(this.year, this.month);
      },
      // 判断哪些是不能选择的
      isChooseEvent() {
        if(this.firstChooseDay){
          for(var j = 1;j<=6;j++){
            for(let i = 0;i<this.dayData['row' + j].length;i++){
              let obj = this.dayData['row' + j][i];
              if(!this.judgeDate(obj, this.firstChooseDay)){
                obj.isChoose = false
              }
              if(obj.showYear == this.firstChooseDay.showYear && obj.showMonth == this.firstChooseDay.showMonth && obj.showDay == this.firstChooseDay.showDay){
                obj.checked = true;
                obj.label = '开始'
              }
            }
          }
          this.$forceUpdate();
        }
      },
      // 开始与结束的范围
      rangeChooseEvent() {
        if(this.firstChooseDay && this.secondChooseDay) {
          for(var j = 1;j<=6;j++){
            for(let i = 0;i<this.dayData['row' + j].length;i++){
              let obj = this.dayData['row' + j][i];
              if(obj.isChoose){
                if(this.judgeDate(obj, this.firstChooseDay) && !this.judgeDate(obj, this.secondChooseDay)){
                  obj.checked = true;
                  obj.label = '';
                }else {
                  obj.checked = false;
                  obj.label = ''
                }
                if(obj.showYear == this.secondChooseDay.showYear && obj.showMonth == this.secondChooseDay.showMonth && obj.showDay == this.secondChooseDay.showDay){
                  obj.checked = true;
                  obj.label = '结束'
                }
              }
            }
          }
          this.$forceUpdate();
        }
      },
      // 年份加减
      yearEvent(msg) {
        if(msg == 'add') {
          this.year++;
        }else if(msg == 'reduce'){
          this.year--;
        }
        this.reader(this.year, this.month);
        this.isChooseEvent();
      },
      // 重新渲染
      reader(year, month) {
        if(!year || !month){
          year = new Date().getFullYear();
          month = new Date().getMonth()+1;
        }
        let newMonthData = getMonthData(year, month)
        this.allDayData = newMonthData.days;
        this.year = newMonthData.year;
        this.month = newMonthData.month;
        this.$forceUpdate();
      },
      // 判断两个日期大小
      judgeDate(date1, date2){
        var oDate1 = new Date(date1.showYear+'/'+date1.showMonth+'/'+date1.showDay);
        var oDate2 = new Date(date2.showYear+'/'+date2.showMonth+'/'+date2.showDay);
        if(oDate1.getTime() > oDate2.getTime()){
          return true
        }else{
          return false
        }
      },
      // 清空日期
      clearDateEvent(msg) {
        if(msg == 'clearAll'){
          this.isChooseClear = true;
        }
        this.firstChooseDay = '';
        this.secondChooseDay = '';
        for(var j = 1;j<=6;j++){
          for(let i = 0;i<this.dayData['row' + j].length;i++){
            let obj = this.dayData['row' + j][i];
            obj.checked = false;
            obj.label = '';
            obj.isChoose = true;
          }
        }
        this.$forceUpdate();
      },
      // 确定
      comfirmEvent() {
        if(this.firstChooseDay && this.secondChooseDay){
          this.$emit('comfirmEvent', {startDate: this.firstChooseDay, endDate: this.secondChooseDay});this.hide();
        }else if(this.firstChooseDay && !this.secondChooseDay){
          weui.topTips('请选择结束时间', {
            duration: 800,
            className: 'custom-classname',
          });
        }else {
          this.hide();
        }
      },
      // 头部展示
      headerShowDate() {
        if(!this.firstChooseDay && !this.secondChooseDay) {
          return this.format(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate());
        }
        if(this.firstChooseDay && !this.secondChooseDay){
          return this.format(this.firstChooseDay.showYear+'/'+this.firstChooseDay.showMonth+'/'+this.firstChooseDay.showDay);
        }
        if(this.firstChooseDay && this.secondChooseDay){
          let startDate = this.format(this.firstChooseDay.showYear+'/'+this.firstChooseDay.showMonth+'/'+this.firstChooseDay.showDay);
          let endDate = this.format(this.secondChooseDay.showYear+'/'+this.secondChooseDay.showMonth+'/'+this.secondChooseDay.showDay);
          return startDate + '~' + endDate;
        }
      },
      format(date) {
        let Time = new Date(date);
        let yyyy = Time.getFullYear();
        let mm = Time.getMonth()+1 > 9 ? Time.getMonth()+1 : '0' + (Time.getMonth()+1);
        let dd = Time.getDate() > 9 ? Time.getDate() : '0' + Time.getDate();
        return yyyy + '.' + mm + '.' + dd;
      }
    }
  }
</script>

<style scoped>
  .c-Date{
    position: fixed;
    z-index: 2005;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: transparent;
    display: flex;
    flex-direction: column;
  }
  .content{
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  .content .header{
    background: url("../../assets/images/bg1.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
    padding: 0.32rem 0;
  }
  .content .header .img-box{
    width: 1.76rem;
    height: 1.76rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tool{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0.3rem 0.48rem 0 0.48rem;
    font-size: 0.52rem;
    color: #8CA0B4;
  }
  .tool span:last-child{
    color: #7CB2F0
  }
  .year-month{
    display: flex;
    border-bottom: 1px solid #E8EDF2;
  }
  .year-month .year,.month{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #3C5064;
    font-size: 0.56rem;
  }
  .year-month .year img,.year-month .month img{
    width: 1.76rem;
    height: 1.76rem;
  }
  .week{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E8EDF2;
  }
  .week span{
    flex: 1;
    text-align: center;
    color: #3C5064;
    font-size: 0.5rem;
    line-height: 0.7rem;
  }
  .day-show .row{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-right: 0.12rem;
  }
  .day-show .row span{
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 0.48rem;
    color: #3C5064;
    line-height:0.75rem;
    margin-top: 0.12rem;
    margin-left: 0.12rem;
    border-radius: 0.12rem;
    height: 2rem;
  }
  .comfirm-btn{
    display: flex;
    margin-top: 0.12rem;
  }
  .comfirm-btn div{
    flex: 1;
    text-align: center;
    box-sizing: border-box;
    padding: 0.32rem 0;
    color: #8CA0B4;
    font-size: 0.64rem;
  }
  .comfirm-btn div:first-child{
    box-sizing: border-box;
    border-top: 1px solid #E8EDF2;
  }
  .comfirm-btn div:last-child{
    background:rgba(140,200,255,1);
    color: #fff;
  }
  .mask{
    flex: 1;
    background: rgba(60,80,100,0.72);
  }
  /*color*/
  .day-show .row span small.color-gray:first-child{
    color: #C5CDD5;
  }
  .day-show .row span small.color-red:first-child{
    color: #FF6868;
  }
  .day-show .row span.is-no-choose{
    background: #eaeaea;
  }
  .day-show .row span.is-no-choose small{
    color: #dadada !important;
  }
  .day-show .row span.active{
    background: #57A5FC;
  }
  .day-show .row span.active small{
    color: #fff !important;
  }
  /*动画*/
  .slideUp-enter-active {
    animation: slideUp .3s;
  }
  .slideUp-leave-active {
    animation: slideUp .2s reverse;
  }
  @-webkit-keyframes slideUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
</style>
