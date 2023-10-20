<template>
  <div ref="indexRoll" style="width:100%;">
     <div style="text-align: center;line-height: 100px;margin-top: 50px;font-size: 24px;">尽请期待!</div>
  </div>
</template>

<script>
import {
  ttGet,
  ttPost
} from "@/utils/util.js";
import {
  getStore,
  setStore
} from "@/utils/store.js";
import {
  ref
} from 'vue'

export default {
  data() {
    return {
      img_url: this.$img_url,
      symbol: getStore({
        name: "symbol"
      }),
      loadingIndex: true,
      box_class: [],
      game_type: 1,
      roll_height: '300',
      banner_height: 130,
      topimg: [
        {
          id: 1,
          src: "/public/static/img/banner.png",
          href: "#",
        },
        {
          id: 2,
          src: "/public/static/img/banner.png",
          href: "#",
        },
        // {
        //   id: 3,
        //   // src: require('@/assets/img/img1/banner.png'),
        //   src: "https://www.halocsgo.com/public/static/img/banner3.jpg",
        //   href: "#",
        // },
      ],
      site: getStore({
        name: "site"
      }),
    };
  },
  mounted() {
    this.$emit("get_game_type", (res) => {
      this.game_type = res.game_type;
    });
    this.get_list();
    let windowWidth = this.$refs.indexRoll.clientWidth
    if (windowWidth < 1280) {
      this.roll_height = 150;
    }
    if (windowWidth > 1080) {
      this.banner_height = 180;
    } else if (windowWidth > 420) {
      this.banner_height = 100;
    } else {
      this.banner_height = 80;
    }
    console.log('总款：' + this.$refs.indexRoll.clientWidth)
  },
  methods: {

    //获取首页箱子数据
    get_list() {
      let game_type = this.game_type;
      ttGet("/api.php/index/index", {
        game_type: game_type
      }, (res) => {
        this.loadingIndex = false;
        if (res.code == 200) {
          this.box_class = res.data.box_class;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },

    //切换
    game_type_change(res) {
      this.game_type = res.game_type;
      this.get_list();
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-view {
  margin-bottom: 70px;
}

.class-title {
  text-shadow: 3px 3px 0 #000;
  transition: all 1s ease;
  -webkit-transition: all 1s ease;
  position: relative;
  cursor: pointer;
  padding: 1rem;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.5em;
  margin: 1rem auto 0;
  line-height: 1.2;
  color: #fff;
  z-index: 9;
  text-align: center;
  width: 300px;
}

.class-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
}

.class-item {
  flex: 0 0 50%;
  max-width: 50%;
}

.class-item-img {
  height: 90%;
  max-width: 100%;
}

.class-item-body {
  background-image: url("../../../assets/img/morebg.png");
  background-size: 100% 135%;
  background-repeat: no-repeat;

  // background: red;
  position: relative;
}


.class-item-content {
  position: relative;
  box-sizing: border-box;
  padding-top: 72%;
}

.class-item-img-info {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
  text-align: center;
}

.class-item-name {
  text-align: center;
  font-size: 18px;
  color: #acaec5;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin-bottom: 10px;
  min-height: 26px;
}

.class-item-price {
  position: relative;
  text-align: center;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  padding: 3px 0px;
}

.class-item-hover {
  position: absolute;
  z-index: -1;
  bottom: -50px;
  left: 50%;
  width: 160px;
  height: 160px;
  transform: translateX(-50%) scale(0);
  transition: transform 0.25s, opacity 0.1s;
  opacity: 0;
}



.item-a:hover {
  .class-item-body {
    background-image: url("../../../assets/img/morehave.png");
    background-size: 100% 145%;
    background-repeat: no-repeat;
    transition: all .5s linear;

  }

  // height: 15rem;
  .class-item-img {
    -webkit-transform: scale(1.23);
    transform: scale(1.23);
    transition: transform 0.8s ease, -webkit-transform 0.8s ease;
  }

  .class-item-hover {
    transform: translateX(-50%) scale(1);
    opacity: 2;
  }

  .class-item-price {
    position: relative;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background: #9b8dee;
    padding: 3px 0px;
    width: 50%;
    margin: 0px auto;
    border-radius: 5px;
    font-weight: 700;
  }
}

@media (min-width: 480px) {
  .class-item {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .hid-720 {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .class-item {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }

  .hid-720 {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .class-item {
    flex: 0 0 25%;
    max-width: 25%;
  }

  .hid-720 {
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .class-item {
    flex: 0 0 20%;
    max-width: 20%;
  }

  .hid-720 {
    width: 1200px;
    margin: 0 auto;
  }
}

@media (min-width: 1440px) {}

@media only screen and (max-width: 1439px) {}

@media only screen and (max-width: 1199px) {}

@media only screen and (max-width: 991px) {}

@media only screen and (max-width: 767px) {
  .class-item-name {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .class-item-price {
    font-size: 12px;
  }
}

@media only screen and (max-width: 479px) {}</style>
<style scoped>.class-item-price {
  display: flex;
  justify-content: center;
  align-items: center;
}

.class-item-price /deep/ .symbol {
  width: 18px;
  padding-top: 3px;
  margin-right: 10px;
}</style>
