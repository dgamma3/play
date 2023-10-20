<template>
  <div
    class="radial-indicator-container"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <div class="percentloop">
      <div class="circle-left" :style="{ backgroundColor: color }">
        <div
          :style="{ backgroundColor: backgroundColor }"
          ref="leftcontent"
        ></div>
      </div>
      <div class="circle-right" :style="{ backgroundColor: color }">
        <div
          :style="{ backgroundColor: backgroundColor }"
          ref="rightcontent"
        ></div>
      </div>
      <div class="content-wrap">
        <div class="turntable">
          <div class="text"><span class="text-rate"> 20.00% </span></div>
          <div
            class="point"
            :style="'transform: rotate('+dushu+'deg) perspective(1000px);transition: all '+zhanting+'s cubic-bezier(0,0,.05,1);'"
          >
          </div>
        </div>

        <img
          src="@/assets/img/huban.png"
          style="position: absolute; width: 280px; height: 280px"
        />
        <!-- <icon :name="icon" width="28" :style="{ 'fill': color }" /> -->
        <span class="content-number" :title="percent + '%'"
          >{{ percent }}%</span
        >
        <span class="content-text" :title="content">{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Events: animationFinished

export default {
  name: "RadialIndicator",

  props: {
    size: {
      type: [String, Number],
      default: 155,
    },
    icon: {
      type: String,
      default: "mail",
    },
    content: String,
    color: {
      type: String,
      default: "#00b3ef",
    },
    backgroundColor: {
      type: String,
      default: "#7fd9f7",
    },
    percentNum: {
      type: [String, Number],
      default: 0,
    },
    dushu: {
      type: [String, Number],
      default: 0,
    },
    zhanting: {
      type: [String, Number],
      default: 4,
    },
    speed: {
      // suggest 1~3
      type: [String, Number],
      default: 1,
    },
  },

  data() {
    return {
      percent: 0,
      initDeg: 0,
      timeId: null,
      animationing: false,
    };
  },

  created() {
    this.goRotate(this.transformToDeg(this.percentNum));
  },

  watch: {
    percentNum: function (val) {
      if (this.animationing) {
        console.log("ssssss");
        return;
      }
      console.log("shhh");
      this.goRotate(this.transformToDeg(val));
    },
  },

  methods: {
    transformToDeg(percent) {
      let deg = 0;
      if (percent >= 100) {
        deg = 360;
      } else {
        deg = parseInt((360 * percent) / 100);
      }
      return deg;
    },

    transformToPercent(deg) {
      let percent = 0;
      if (deg >= 360) {
        percent = 100;
      } else {
        percent = parseInt((100 * deg) / 360);
      }
      return percent;
    },

    //  > 180
    rotateLeft(deg) {
      if (this.$refs.leftcontent) this.$refs.leftcontent.style.transform = "rotate(" + (deg - 180) + "deg)";
    },

    //  < 180
    rotateRight(deg) {
      if (this.$refs.rightcontent) this.$refs.rightcontent.style.transform = "rotate(" + deg + "deg)";
    },

    goRotate(deg) {
      this.animationing = true;
      this.timeId = setInterval(() => {
        if (deg > this.initDeg) {
          this.initDeg += Number(this.speed);
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg);
            this.rotateRight(180);
          } else {
            this.rotateRight(this.initDeg);
          }
        } else {
          this.initDeg -= Number(this.speed);
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg);
          } else {
            this.rotateLeft(180);
            this.rotateRight(this.initDeg);
          }
        }
        this.percent = this.transformToPercent(this.initDeg);
        const remainer = Number(deg) - this.initDeg;
        if (Math.abs(remainer) < this.speed) {
          this.initDeg += remainer;
          if (this.initDeg > 180) {
            this.rotateLeft(deg);
          } else {
            this.rotateRight(deg);
          }
          this.animationFinished();
        }
      }, 10);
    },

    animationFinished() {
      this.percent = this.percentNum;
      this.animationing = false;
      
      clearInterval(this.timeId);
      // this.dushu=0;
      this.$emit("animationFinished");
    },
  },
};
</script>

<style>
.radial-indicator-container .percentloop {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.radial-indicator-container .circle-left,
.radial-indicator-container .circle-right {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.radial-indicator-container .circle-left > div,
.radial-indicator-container .circle-right > div {
  width: 100%;
  height: 100%;
  transform-origin: right center;
  /* transition: all .5s linear; */
}

.radial-indicator-container .circle-right {
  left: 50%;
}

.radial-indicator-container .circle-right > div {
  transform-origin: left center;
}

.radial-indicator-container .content-wrap {
  position: absolute;
  top: 4%;
  bottom: 4%;
  left: 4%;
  right: 4%;
  background-color: #201f22;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
}

.radial-indicator-container .content-wrap .content-number {
  font-size: 22px;
  padding: 5px 0 7px 0;
  cursor: pointer;
  position: absolute;
  color: #e5ce28;
}

.radial-indicator-container .content-wrap .content-text {
  display: inline-block;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.turntable {
    /* background-image: url(https://static.d2topbox.com/images/upgrade/huban.png); */
    background-position: 50%;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    position: relative;
    z-index: 99;
}
.turntable>.point {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(0deg) perspective(1000px);
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
:after, :before {
    text-decoration: inherit;
    vertical-align: inherit;
    box-sizing: inherit;
}
.turntable .point:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 8px;
    background-color: orange;
    top: -34px;
}
.turntable .point:after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    background-image: url('../assets/img/shouzhi.png');
    background-size: 100%;
    top: -24px;
}
</style>
