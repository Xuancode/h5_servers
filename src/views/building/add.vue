<!--
 * @Author: xuanpl
 * @Date: 2020-06-16 08:29:15
 * @LastEditors: xuanpl
 * @LastEditTime: 2020-06-21 22:44:04
 * @Description: 新增公寓的页面
 * @FilePath: /h5_servers/src/views/building/add.vue
-->
<template>
  <div class="add_building">
    <!-- 图片预览窗口 -->
    <div v-if="0" class="weui-gallery" id="gallery" style="display: block">
      <span
        class="weui-gallery__img"
        id="galleryImg"
        style="background-image: url('http://obs.molitown.cn/1579144377962');"
      ></span>
      <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
          <i class="weui-icon-delete weui-icon_gallery-delete"></i>
        </a>
      </div>
    </div>
    <!-- 表单 -->
    <div class="weui-form">
      <!-- <div class="weui-form__text-area">
        <h2 class="weui-form__title">新建公寓</h2>
      </div> -->
      <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd">
                <label class="weui-label">公寓名</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" placeholder="为该公寓取个名吧" />
              </div>
            </div>
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd">
                <label class="weui-label">联系电话</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" placeholder="联系电话" type="number" pattern="[0-9]*" />
              </div>
            </div>
            <div class="weui-cell weui-cell_active weui-cell_vcode">
              <div class="weui-cell__hd">
                <label class="weui-label">位置信息</label>
              </div>
              <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="点击按钮进行定位" rows="4"></textarea>
              </div>
              <div class="weui-cell__ft">
                <button class="weui-btn weui-btn_default weui-vcode-btn">定位</button>
              </div>
            </div>
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd">
                <label class="weui-label">备注信息</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" placeholder="（选填）" />
              </div>
            </div>
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell weui-cell_uploader">
                <div class="weui-cell__bd">
                  <div class="weui-uploader">
                    <div class="weui-uploader__hd">
                      <p class="weui-uploader__title">图片上传</p>
                      <div class="weui-uploader__info">0/2</div>
                    </div>
                    <div class="weui-uploader__bd">
                      <div v-for="(item, index) in imgArr" :key="index">
                        <UploadImgbox :imgUrl="item.baseUrl" :processStatus="item.processStatus" />
                      </div>
                      <div class="weui-uploader__input-box">
                        <input
                          id="uploaderInput"
                          class="weui-uploader__input"
                          type="file"
                          accept="image/*"
                          multiple
                          @change="receivePic"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-form__tips-area">
        <p class="weui-form__tips">表单页提示，居中对齐</p>
      </div>
      <div class="weui-form__opr-area">
        <a
          class="weui-btn weui-btn_primary"
          :class="{ 'weui-btn_disabled': 0 }"
          href="javascript:"
          @click="commit"
          >确定</a
        >
      </div>
      <div class="weui-form__tips-area">
        <p class="weui-form__tips">表单页提示，居中对齐</p>
      </div>
      <div class="weui-form__extra-area">
        <div class="weui-footer">
          <p class="weui-footer__links">
            <a href="javascript:" class="weui-footer__link">底部链接文本</a>
          </p>
          <p class="weui-footer__text">Copyright © 2008-2019 weui.io</p>
        </div>
      </div>
    </div>
    <div id="js_toast" style="display: none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已完成</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rem2px, saveStore, setCookie } from '@/js/util'
import * as Qiniu from 'qiniu-js'
import UploadImgbox from '@/components/uploadImgbox.vue'

export default {
  name: 'Home',
  data() {
    return {
      QiniuToken: '',
      imgArr: [], // 读取到的图片
      imgNameArr: [], // 读取的图片的name
      loadingEle: null,
      imgUploadCount: 0,
    }
  },
  computed: {
    // ...mapState(['deviceWidth'])
  },
  components: { UploadImgbox },
  mounted() {
    this.getQiniuToken()
  },
  watch: {},
  methods: {
    getQiniuToken() {
      this.$get('/v1/qiniu').then((res) => {
        this.qiniuToken = res.uptoken
      })
    },
    async receivePic(e) {
      const _this = this
      let blobArr = e.target.files
      if (blobArr.length === 0) {
        return
      }

      // 压缩图片和生成base64预览图
      for (let i = 0; i < blobArr.length; i++) {
        let obj = {}
        const ele = blobArr[i]

        let options = {
          quality: 0.8,
          noCompressIfLarger: true, // 为 true 时如果发现压缩后图片大小比原来还大，则返回源图片
        }
        // 压缩
        // let tinyRes = await Qiniu.compressImage(blobArr[i], options)
        // tinyRes = tinyRes.dist
        let tinyRes = blobArr[i]
        // 转化为base64作缩略图
        let reader = new FileReader() // 此处用var会有bug，改为let即可
        reader.onload = function() {
          obj = { baseUrl: reader.result, file: tinyRes, processStatus: '' }
          _this.imgArr.push(obj)
          _this.imgNameArr.push(blobArr[i].name) // 插件压缩后去掉了名字，要补回来
        }
        reader.readAsDataURL(tinyRes)
      }
    },
    uploadFile(file, index, name) {
      const _this = this
      const config = {
        useCdnDomain: true, // 是否使用加速域名
        region: Qiniu.region.z2, // 华南节点
      }
      // 拓展名获取
      let extendName = name.split('.')
      extendName = extendName[extendName.length - 1]
      let key = 'building_' + new Date().getTime() + '.' + extendName
      console.log(file)
      var observable = Qiniu.upload(file, key, this.qiniuToken, config)
      // 订阅事件
      var observer = {
        next(res) {
          console.log('过程')
          console.log(res)
          _this.imgArr[index].processStatus = parseInt(res.total.percent) + '%'
        },
        error(err) {
          console.log('错误')
          _this.loadingEle.hide()
          // err.isRequestError: 用于区分是否 xhr 请求错误；当 xhr 请求出现错误并且后端通过 HTTP 状态码返回了错误信息时，该参数为 true；否则为 undefined 。
          // err.reqId: string，xhr请求错误的 X-Reqid。
          // err.code: number，请求错误状态码，只有在 err.isRequestError 为 true 的时候才有效。可查阅七牛云码值对应说明。
          // err.message: string，错误信息，包含错误码，当后端返回提示信息时也会有相应的错误信息。

          // 此处弹出错误信息
          console.log(err.message)
          _this.imgArr[index].processStatus = 'fail'
        },
        complete(res) {
          console.log('成功')
          console.log(res)
          _this.imgArr[index].processStatus = 'success'
          _this.imgUploadCount++
          if (_this.imgUploadCount === _this.imgArr.length) {
            _this.loadingEle.hide()
          }
        },
      }
      var subscription = observable.subscribe(observer) // 上传开始
      // subscription.unsubscribe() // 上传取消
    },
    commit() {
      this.imgUploadCount = 0 // 重置图片上传计数
      this.loadingEle = this.$weui.loading('loading')
      setTimeout(() => {
        this.loadingEle.hide()
      }, 5000)
      // 先上传图片到七牛云
      for (let i = 0; i < this.imgArr.length; i++) {
        const ele = this.imgArr[i]
        this.uploadFile(ele, i, this.imgNameArr[i])
      }
    },

    goWST() {
      window.location.href =
        'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTMxMzUyMQ==#wechat_redirect'
    },
    async canIRead() {
      this.loadingEle = this.$weui.loading('loading', {
        className: 'custom-classname',
      })
      setTimeout(() => {
        this.loadingEle.hide()
      }, 3000)

      const data = { type: '210', countType: '211' }
      const _this = this
      this.$get('/v1/room/canSee', data).then((res) => {
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
    },
  },
}
</script>

<style scoped>
.add_building {
  text-align: left;
}
</style>
