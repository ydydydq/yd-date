<template>
  <div class="hello">
    <h1>日期控件</h1>
    <button @click="dateEvent">请点击我</button>
    <my-date ref="myDate" @comfirmEvent="comfirmEvent"></my-date>
  </div>
</template>

<script>
import myDate from '@/components/date'
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods: {
    dateEvent() {
      this.$refs.myDate.show()
    },
    comfirmEvent(result) {
      console.log(result)
    }
  },
  components: {myDate}
}
</script>


<style scoped>
  .hello{
    text-align: center;
  }
  h1{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  button{
    color: #2c3e50;
    background: transparent;
    border-radius: 0.28rem;
    box-sizing: border-box;
    padding: 0.48rem 0.8rem;
    border: 1px solid #ddd;
    outline: none;
  }
</style>
