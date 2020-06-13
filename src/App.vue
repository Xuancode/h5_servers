<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created() {
    
  },
  mounted() {
    this.countWith()
    this.addGlobalPageEvent()
  },
  methods: {
    /** 使用rem调节 */
    countWith() {
      const that = this
      fnResize()
      window.onresize = function () {
        fnResize()
      }
      function fnResize() {
        var deviceWidth = document.documentElement.clientWidth || window.innerWidth
        if (deviceWidth >= 750) {
          deviceWidth = 750
        }
        if (deviceWidth <= 320) {
          deviceWidth = 320
        }
        // 提交宽度到vuex 
        that.$store.commit('setDeviceWidth', {
          w: deviceWidth
        })
      }
    },
    /**点击全局后的动作，现在有，隐藏叉叉 */
    addGlobalPageEvent() {
      const that = this
      const _body = document.getElementsByTagName('body')[0]
      _body.addEventListener('click', function() {
        that.$store.commit('setClickOther', {state: false})
      })
    },
  }
}
</script>>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: .3rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
