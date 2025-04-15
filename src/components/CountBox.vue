<template>
 <div class="count-box">
  <button @click="handleSub" class="minus">-</button>
  <input :value="value" @change="hanldeChange" class="inp" type="text">
  <button @click="handleAdd" class="add">+</button>
 </div>
</template>
 
<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    hanldeChange (e) {
      // console.log(e.target.value)
      const num = +e.target.value  //转数字处理 1.变成数字，2变成NaN
      // 输入不合法文本 或 输入负值，回退成原来的value值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>
 
<style scoped lang="less">
.count-box {
  width: 110px;
  display: flex;
  .add,.minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>