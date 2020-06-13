<template>
  <div class="com_bottle">
    <p v-if="heartNumber==0">双击+❤</p>
    <img v-if="showDelte" :class="className + '_img'" src="/img/delete.png" @click.stop="deleteBt" alt="删除图标">
    <div class="">
      <canvas :class="className"></canvas>
      <div :class="className + '_text'">
        <input class="text" :class="{edit_input: !uneditable}" type="text" maxlength="6"  v-model="bottle_text" :disabled="uneditable" @keydown="keydown" @blur="blur" @click.stop="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rem2px } from '@/js/util'
import Hammer from 'hammerjs'

export default {
  name: 'Home',
  data() {
    return {
      pictureH: 1.2,
      pictureW: 0.63,
      btHight: 1, // 瓶子高,rem，下同
      btwidth: 0.63, // 瓶子宽
      hHight: 0.1, // 心高
      hWidth: 0.1, // 心宽
      hx: 0.01,  // 心的x坐标
      hy: 0.3,  // 心的y坐标

      showDelte: false,
      uneditable: true,
      bottle_text: this.btText,
      realText: this.btText
    }
  },
  props: ['className', 'heartNumber', 'btText', 'btID'],
  computed: {
    ...mapState(['deviceWidth', 'clickOther']),
  },
  components: {
    
  },
  mounted() {
    this.drawSingleBottle()
    setTimeout(()=> {
      this.addEvent()
    }, 200)
  },
  watch: {
    /** 监听rem生效后再渲染canvas */
    deviceWidth: function() {
      this.drawSingleBottle()
    },
    heartNumber: function() {
      this.drawSingleBottle()
    },
    clickOther: function() {
      this.showDelte = false
      this.uneditable = true
    },
    realText: function() {
      this.$emit('upHeart', {text: this.bottle_text, number: this.heartNumber + 1, id: this.btID})
    }
  },
  methods: {
    /**
     * 画图部分
     */
    drawSingleBottle() {
      // 如果rem没初始化完就不执行
      if (!this.deviceWidth) {
        return
      }

      const that = this
      var pictrue = document.getElementsByClassName(this.className)[0]
      if ( !pictrue.getContext ) return
      
      // 设置画布大小
      pictrue.setAttribute('width',rem2px(this.pictureW));
      pictrue.setAttribute('height',rem2px(this.pictureH));

      const ctx = pictrue.getContext('2d')

      // 画瓶子
      const img = new Image()
      img.src = '/img/battle.png'
      img.onload = function(){
        ctx.drawImage(img, 0, rem2px(that.pictureH - that.btHight), rem2px(that.btwidth), rem2px(that.btHight))
        that.drawHeart(ctx)
      }
    },
    /** 画心 */
    drawHeart(ctx) {                                                                                   
      const that = this
      const img = new Image()
      img.src = '/img/heart1.png'
      ctx.globalCompositeOperation = "destination-over";
      img.onload = function(){
        var num = that.heartNumber
        let arr = that.num2arr(num)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].num != 0) {
            that.drawDifLineHeart(arr[i], ctx, img)
          } 
        }
      }
    },
    /** 心数字转为数组 */
    num2arr(num) {
      const arr =[0,0,0]
      num = num > 49 ? 49 : num // 不超过48
      for (let i = 0; i < num; i++) {
        if (i<36) {
          arr[0] ++
        } else if (i>=36 && i<41) {
          arr[1] ++
        } else if (i>= 41) {
          arr[2] ++
        }
      }
      return [
        {num: arr[0], wnum: 6, fixdX: 0, fixdY: 0},
        {num: arr[1], wnum: 5, fixdX: 0.05, fixdY: this.hHight * 6},
        {num: arr[2], wnum: 4, fixdX: 0.1, fixdY: this.hHight * 7}
      ]
    },
    /**根据不同类型的行来画心 */
    drawDifLineHeart(param, ctx, img) {
      const that = this
      const num = param.num   // 该类的所有数量
      var wnum = param.wnum // 每行数量
      var hnum = Math.ceil(num/wnum)  // 有几行
      for (let i = 0; i < hnum; i++) {
        // 每行的数量
        const count = i == hnum-1 ? num - i * wnum : wnum
        /** 额，先写固定的了，说不定不会用完的。。 */
        /**
         * 0-5: 6*6=36, 36
         * 6: 5*1=5, 41
         * 7-8: 4*2, 49
         */
        for (let j = 0; j < count; j++) {     
          ctx.drawImage(img, rem2px(that.hx + j * that.hWidth + param.fixdX), rem2px(that.btHight - that.hHight * (i+1) - param.fixdY - 0.03 + (that.pictureH - that.btHight)), rem2px(that.hWidth), rem2px(that.hHight))
        }
      }
    },

    /**
     * 功能控制部分
     */
    
    /** 添加瓶子和文字的事件 */
    addEvent() {
      const that = this
      /**瓶子的双击和长按事件 */
      var square = document.getElementsByClassName(this.className)[0]
      var hammer = new Hammer(square)
      hammer.on('doubletap', function(e) {
        let className = e.target.className
        that.$emit('upHeart', {text: that.bottle_text, number: that.heartNumber + 1, id: that.btID}, className.replace(/[^0-9]/ig,""))
      })
      hammer.on('press', function(e) {
        // e.target.classList.toggle('expand');
        /** 防止点长按出现后马上消失的情况 */
        that.$store.commit('setClickOther', {state: false})
        setTimeout(()=> {
          that.showDelte = true
        },200)
      })

      /**文字的长按修改事件 */
      var el = document.getElementsByClassName(this.className + '_text')[0]
      var hammer0 = new Hammer(el)
      hammer0.on('press', function(e) {
        let className = e.target.className
        that.uneditable = false
      })
    },

    /** 删除瓶子 */
    deleteBt(e){
      this.showDelte = false
      this.$emit('deletBt', this.btID)
    },

    /**添加文字长按修改事件 */
    /** 监听回车 */
    keydown(e) {
      if (e.keyCode == 13) {
        this.uneditable = true
      }
    },
    /**保存修改 */
    blur() {
      this.realText = this.bottle_text
    }
  }
}
</script>
<style scoped>
  .com_bottle {
    width: .7rem;
    position: relative;
    
  }
  .com_bottle img {
    position: absolute;
    height: .3rem;
    width: .3rem;
    right: 0;
    top: 0;
  }
  .com_bottle input {
    color: #000;
    font-size: .12rem;
    text-align: center;
    width: 100%;
    opacity: 1;
    vertical-align: middle;
    outline: inherit;
    border: 0;
  }
  .com_bottle input:disabled,input.disabled,input[disabled] {
    color: #000;
    font-size: .12rem;
    text-align: center;
    width: 100%;
    opacity: 1;
    background-color: transparent;
    color: #000;
    -webkit-text-fill-color:#000;
    -webkit-opacity:1;
    opacity: 1;
  }
  .com_bottle p {
    position: absolute;
    top: .66rem;
    left: .1rem;
    color: #17828e
  }
  .edit_input {
    box-shadow: 0 1px 0px 0px #000
  }
  .text {
    margin-top: .05rem;
  }
  .com_bottle p {
    z-index: -1;
  }
</style>