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
    console.log(this.$router)
  },
  watch: {},
  methods: {
    getToken() {
      const data = {
        code: this.$route.query.code,
        state: this.$route.query.state,
        type: '310',
        app_type: 1,
        unAuth_type: '211'
      }
      this.$post('/api/v1/webAuth', data).then(
        res => {
          if (res.code === 20000) {
            setCookie('X-token', res.data.token)
            this.$router.replace({
              path: `room?state=${data.state}`
            })
          } else {
            this.$weui.alert('权限错误')
          }
        },
        err => {
          console.log(err)
          this.$weui.alert('网络错误')
        }
      )
    }
  }
}
</script>

<style scoped>
</style>