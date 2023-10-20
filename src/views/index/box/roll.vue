
<template>
    <div>
      <lottery-components :speed="500" :prizeList="prizeList">
            <div v-for="item in prizeList" :key="item.name" class="prize">{{item.name}}</div>
      </lottery-components>
      
    </div>
  </template>
  
  <script>
  import LotteryComponents from '@/components/lottery.vue'
  export default {
    components:{
        LotteryComponents
    },
    data() {
      return {
        prizeList: [
          { name: "奖品1", isWinner: false },
          { name: "奖品2", isWinner: false },
          { name: "奖品3", isWinner: false },
          { name: "奖品4", isWinner: false },
          { name: "奖品5", isWinner: false },
          { name: "奖品6", isWinner: false },
          { name: "奖品7", isWinner: false },
          { name: "奖品8", isWinner: true },
          { name: "奖品9", isWinner: false },
          { name: "奖品10", isWinner: false },
          { name: "奖品11", isWinner: false }
        ]
      };
    }
  };
  </script>
  <style>
  .prize{
      width: 150px;
      height: 150px;
      background: #000;
      border: 1px solid #fff;
      margin: 10px 5px;
  }
  </style>
<style scoped>
 

.live-item-price{ float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
.live-item-price  /deep/  .symbol{ margin-left: 10px; width: 16px; padding-top: 3px; margin-right: 5px;  }
</style>
  