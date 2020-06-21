<!--
 * @Author: xuanpl
 * @Date: 2020-06-16 08:29:15
 * @LastEditors: xuanpl
 * @LastEditTime: 2020-06-17 16:36:21
 * @Description: file content
 * @FilePath: /h5_servers/src/views/bottle.vue
-->
<template>
  <div class="home">
    <h1>快乐源泉小瓶子</h1>
    <span @click="help">帮助</span>
    <div v-if="showTip" class="help_tip">
      <p>❤长按瓶子删除</p>
      <p>❤长按文字修改</p>
      <p>❤双击增加心心</p>
    </div>
    <div class="bottle_div">
      <div class="bottle" v-for="(item, index) in bottleArr" :key="index">
        <Bottle
          :className="'bottleNo' + index"
          :heartNumber="item.number"
          :btText="item.text"
          :btID="item.id"
          @upHeart="upHeart"
          @deletBt="deletBt"
        />
      </div>
      <div class="add_bottle" @click="addBottle">
        <img src="/img/add.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'
import { rem2px, saveStore, setCookie } from '@/js/util'
import Bottle from '@/components/bottle'

export default {
  name: 'Home',
  data() {
    return {
      showTip: false,
      bottleArr: [
        // {text: '天气不错', number: 12, id: 999},
        // {text: '天气不错1', number: 13, id: 998},
        // {text: '天气不错2', number: 14, id: 997},
        // {text: '天气不错阿萨德的啊', number: 15, id: 99123},
        // {text: '天气不错4', number: 16, id: 998123},
        // {text: '天气不错5', number: 17, id: 99813}
      ],
    }
  },
  computed: {
    ...mapState(['deviceWidth']),
  },
  components: {
    Bottle,
  },
  mounted() {
    this.initData()
  },
  watch: {
    /** 监听rem生效后再渲染canvas */
    deviceWidth: function() {
      // this.initCanvas()
    },
  },
  methods: {
    initData() {
      this.getQuery()
      this.$get('/v1/bottle', { page: 1, size: 100 }).then(
        (res) => {
          this.bottleArr = res.data.data
        },
        (err) => {
          console.log(err)
        }
      )
    },
    getQuery() {
      setCookie('X-token', this.$router.history.current.query.token)
      // this.$router.history.current.query
    },
    upHeart(item, index) {
      this.$put('/v1/bottle/1', item).then(
        (res) => {
          this.bottleArr = res.data.data
        },
        (err) => {
          console.log(err)
        }
      )
    },
    addBottle() {
      this.$post('/v1/bottle', { text: '你的好心情', number: 0 }).then(
        (res) => {
          this.bottleArr = res.data.data
        },
        (err) => {
          console.log(err)
        }
      )
    },
    deletBt(id) {
      this.$set(this.bottleArr)
      this.$delete('/v1/bottle/1', { id: id }).then(
        (res) => {
          this.bottleArr = res.data.data
        },
        (err) => {
          console.log(err)
        }
      )
    },
    help() {
      if (this.showTip == true) {
        return
      }
      this.showTip = true
      setTimeout(() => {
        this.showTip = false
      }, 4000)
    },
  },
}
</script>

<style scoped>
.home {
  padding: 0.02rem 0.2rem;
  background-size: 2rem 2.4rem;
  background-repeat: repeat;
  background-color: #f4f1cf;
  background-attachment: fixed;
  background-image: url('/img/background.png');
  height: 100%;
}
.bottle_div {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}
.add_bottle {
  height: 1.02rem;
  width: 0.7rem;
  margin-top: 0.18rem;
}
.add_bottle img {
  height: 1.02rem;
  width: 0.8rem;
}

h1 {
  margin-top: 0.2rem;
  font-size: 0.22rem;
  font-weight: 500;
  color: #008605;
  display: inline-block;
}
span {
  margin-top: 0.24rem;
  position: absolute;
  right: 0.1rem;
  top: 0;
  font-size: 0.14rem;
  color: #999;
  float: right;
}
.help_tip {
  width: 1.4rem;
  /* height: .5rem; */
  z-index: 1;
  background-color: #333;
  text-align: left;
  padding: 0.2rem;
  border-radius: 0.08rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
}
.help_tip p {
  color: #fff;
  font-size: 0.18rem;
  line-height: 0.24rem;
}
</style>
