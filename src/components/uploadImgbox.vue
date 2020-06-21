<!--
 * @Author: xuanpl
 * @Date: 2020-06-18 22:32:13
 * @LastEditors: xuanpl
 * @LastEditTime: 2020-06-21 21:04:20
 * @Description: 图片上传时候的缩略图显示组件
  imgUrl: 缩略图的url
  processStatus: 图片上传的状态, 空字符串为未上传，fail为失败，success为成功，其余为进度百分比
 * @FilePath: /h5_servers/src/components/uploadImgbox.vue
-->
<template>
  <div class="imgbox">
    <div
      class="weui-uploader__file"
      :class="{ 'weui-uploader__file_status': processStatus != '' && processStatus != 'success' }"
      :style="{ 'background-image': 'url(' + imgUrl + ')' }"
    >
      <div
        v-show="processStatus != '' && processStatus != 'success'"
        class="weui-uploader__file-content"
      >
        {{ processStatus }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'imgbox',
  data() {
    return {}
  },
  props: ['imgUrl', 'processStatus'],
  computed: {
    ...mapState([]),
  },
  components: {},
  mounted() {
    // console.log(this.imgUrl)
  },
  watch: {
    // deviceWidth: function() {
    //   this.drawSingleBottle()
    // }
  },
  methods: {},
}
</script>
<style scoped></style>
