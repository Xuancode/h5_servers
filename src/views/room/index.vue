<template>
  <div class="room">
    <div class="focus" @click="goWST" v-if="canSee==0">
      <span class="focus_text">更多房源请关注</span>
      <span class="wst_name">“横县万事通”</span>
      <div class="logo_div">
        <img src="/img/weChat/logo_text.png" alt="公号图标" />
      </div>
      <a
        href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTMxMzUyMQ==#wechat_redirect"
        class="weui-btn weui-btn_mini weui-btn_primary"
      >去关注</a>
    </div>
    <div class="focus" @click="goWST" v-if="canSee==1">
      <span class="focus_text">更多房源请查看</span>
      <span class="wst_name">“横县万事通”</span>
      <div class="logo_div">
        <img src="/img/weChat/logo_text.png" alt="公号图标" />
      </div>
      <a
        href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTMxMzUyMQ==#wechat_redirect"
        class="weui-btn weui-btn_mini weui-btn_primary"
      >去查看</a>
    </div>

    <div class="cannot_see" v-if="canSee==0">
      <div class="weui-mask weui-animate-fade-in"></div>
      <div class="weui-dialog weui-animate-fade-in">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">温馨提示</strong>
        </div>
        <div class="weui-dialog__bd">关注公众号“横县万事通”获取更多租房信息哦</div>
        <div class="weui-dialog__ft">
          <a
            href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTMxMzUyMQ==#wechat_redirect"
            class="weui-dialog__btn weui-dialog__btn_primary"
          >去关注</a>
        </div>
      </div>
    </div>
    <div class="pics" v-if="canSee==1">
      <div class="pic">
        <img src="/img/room/301590637566_.pic.jpg" alt />
      </div>
      <div class="pic">
        <img src="/img/room/311590637566_.pic.jpg" alt />
      </div>
      <div class="pic">
        <img src="/img/room/321590637567_.pic.jpg" alt />
      </div>
      <div class="pic">
        <img src="/img/room/321590637567_.pic.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rem2px, saveStore, setCookie } from '@/js/util'

export default {
  name: 'Home',
  data() {
    return {
      hasFocus: false,
      canSee: 2,
      loadingEle: null
    }
  },
  computed: {
    // ...mapState(['deviceWidth'])
  },
  components: {},
  mounted() {
    this.canIRead()
  },
  watch: {},
  methods: {
    goWST() {
      window.location.href =
        'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTMxMzUyMQ==#wechat_redirect'
    },
    async canIRead() {
      this.loadingEle = this.$weui.loading('loading', {
        className: 'custom-classname'
      })
      setTimeout(() => {
        this.loadingEle.hide()
      }, 3000)

      const data = { type: '210', countType: '211' }
      const _this = this
      this.$get('/api/v1/room/canSee', data).then(res => {
        this.loadingEle.hide()
        if (res.code === 20040) {
          // 需要关注
          this.canSee = 0
        } else if (res.data.times === undefined) {
          // 已关注
          this.canSee = 1
          this.hasFocus = true
        } else {
          // 未关注，但还可以看
          this.canSee = 1
        }
      })
    }
  }
}
</script>

<style scoped>
.room {
  padding: 0.05rem 0.1rem 0.1rem 0.1rem;
}
.pics {
}
.pic img {
  width: 100%;
  height: 100%;
  padding-bottom: 0.1rem;
}
.focus {
  width: 100%;
  text-align: left;
  padding: 0.05rem 0;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
}
.focus a {
  float: right;
  margin-right: 0.1rem;
}
.focus_text {
  float: left;
  line-height: 0.3rem;
  margin-left: 0.1rem;
}
.focus img {
  width: 0.3rem;
  height: 0.3rem;
}
.wst_name {
  float: left;
  line-height: 0.3rem;
  font-weight: 700;
}
.cannot_see {
  width: 100%;
  height: 8rem;
  background-image: url('/img/room/dialog.png');
  background-size: 100% 100%;
}

/* logo改变的动画 */
.logo_div {
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.05rem;
  display: inline-block;
  border-radius: 50%;
  background: #80c5ff;
  animation: logo 5s;
  -moz-animation: logo 5s; /* Firefox */
  -webkit-animation: logo 5s; /* Safari and Chrome */
  -o-animation: logo 5s; /* Opera */
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
@keyframes logo {
  0% {
    background: #80c5ff;
  }
  50% {
    background: #109b41;
  }
  100% {
    background: #80c5ff;
  }
}

@-webkit-keyframes logo {
  0% {
    background: #80c5ff;
  }
  50% {
    background: #109b41;
  }
  100% {
    background: #80c5ff;
  }
}
</style>