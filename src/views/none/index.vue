<!--
 * @Author: xuanpl
 * @Date: 2020-06-16 08:29:15
 * @LastEditors: xuanpl
 * @LastEditTime: 2020-06-20 21:04:14
 * @Description: file content
 * @FilePath: /h5_servers/src/views/none/index.vue
-->
<template>
  <div class="none"></div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'
import { rem2px, saveStore, setCookie } from '@/js/util'

export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {
    // ...mapState(['deviceWidth'])
  },
  components: {},
  mounted() {
    this.getToken()
  },
  watch: {},
  methods: {
    getToken() {
      const data = {
        code: this.$route.query.code,
        state: this.$route.query.state,
        type: '310',
        app_type: 1,
        unAuth_type: '211',
      }
      this.$post('/v1/webAuth', data).then(
        (res) => {
          if (res.code === 20000) {
            setCookie('X-token', res.data.token)
            const jumpType = this.$route.query.state.slice(0, 1)
            // 跳转类型两种，m为master即楼主；v为visitor即访客
            if (jumpType === 'v') {
              this.$router.replace({
                path: `room?state=${data.state}`,
              })
            } else if (jumpType === 'm') {
              this.$router.replace({
                path: `building/add?state=${data.state}`,
              })
            }
          } else {
            this.$weui.alert('权限错误')
          }
        },
        (err) => {
          console.log(err)
          this.$weui.alert('网络错误')
        }
      )
    },
  },
}
</script>

<style scoped></style>
