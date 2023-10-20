<template>
  <div>


    <div class="page-footer">
      <div class="stats">
        <div class="stats-inner">
          <div class="stats-item">
            <div class="stats-content">
              <div class="stats-title">
                {{ num[0] }}
              </div>
              <div class="stats-desc">
                打开的箱子
              </div>
            </div>
          </div>
          <div class="stats-item">
            <div class="stats-content">
              <div class="stats-title">
                {{ num[1] }}
              </div>
              <div class="stats-desc">
                玩家
              </div>
            </div>
          </div>
          <div class="stats-item">
            <div class="stats-content">
              <div class="stats-title">
                {{ num[2] }}
              </div>
              <div class="stats-desc">
                在线
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttom">
        <div class="buttom1">

          <div class="footer-nav">
            <router-link class="footer-nav-link" to="/support">客户支持</router-link>
            <router-link class="footer-nav-link" to="/history">历史最佳</router-link>
            <a href="https://beian.miit.gov.cn" class="footer-nav-link">湘ICP备2023017949号-1</a>

          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- <div class="page-footer2">
      <div class="page-footer2-inner">
        <div class="page-footer2-icp">
          <div v-html="site.icp"></div>
        </div>
        <div class="footer-nav">
          <router-link class="footer-nav-link" to="/support">客户支持</router-link>
          <router-link class="footer-nav-link" to="/history">历史最佳</router-link>
        </div>
        <div class="page-footer2-logo">
          <img src="@/assets/img/payment_methods.png" alt="">
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  ttGet,
  ttPost,
  htmlDecode
} from "@/utils/util.js";

export default {
  data() {
    return {
      site: {},
      num: [],
    };
  },
  mounted() {
    this.get_foot();
   /* setInterval(() => {
      this.get_foot();
    }, 5000); */
  },
  methods: {
    //获取底部信息
    get_foot() {
      ttGet("/api.php/common/get_foot", '', (res) => {
        if (res.code == 200) {
          this.site = res.data.site;
          this.site.icp = htmlDecode(res.data.site.icp);
          this.num = res.data.num;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.buttom {
  background-image: url("../../../src/assets/img/img1/weiye.png");
  background-size: 100%;
  background-repeat: no-repeat;
  // height: 180px;
  width: 100%;
  display: flex;
  justify-content: end;

  .buttom1 {
    // width: 13%;
    display: flex;

    // height: 100px;
    // margin-top: 10%;
    // margin-right: 12%;
    flex-wrap: wrap;

    justify-content: space-between;

    .footer-nav-link {
      color: #fff;

    }
  }
}

.stats {
  background-image: url("../../../src/assets/img/stats-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  overflow: hidden;
}

.stats-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 234px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.stats-item {
  display: flex;
  flex: 1 0 33%;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  line-height: 1.2;
  justify-content: center;
}

.stats-img {
  max-width: 100%;
  height: auto;
  filter: contrast(1);
}

.stats-img-1 {
  position: relative;
  // top: -5px;
  top: 5px;
  left: 35px // margin-right: -25px;
}

.stats-img-2 {
  position: relative;
  top: -14px;
  margin-right: -23px;
  left: 27px;
}

.stats-img-3 {
  position: relative;
  top: 10px;
  margin-right: -10px;
  left: 25px;
}

.stats-title {
  font-size: 20px;
  font-weight: 300;
  color: #cbccd6;
  margin-bottom: -2px;
  font-variant-numeric: tabular-nums;
  min-width: 70px;
}

.stats-desc {
  font-size: 15px;
  color: #4f5165;
  font-weight: 600;
  text-transform: uppercase;
}

.page-footer2 {
  padding-bottom: 50px;
  padding-top: 50px;
  background-color: #212126;
}

.page-footer2-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

.page-footer2-icp {
  font-size: .7rem;

  p {
    margin: 0;
    line-height: 1.60714em;
    color: #57586c;
  }
}

.footer-nav {
  display: flex;
  // flex-direction: column;
  margin-left: auto;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: space-around;
}

.footer-nav-link {
  color: #8386a5;
  margin-top: 15px;
}

.footer-nav-link:after {
  content: '';
  left: 0;
  position: absolute;
  right: 0;
  bottom: -1px;
  height: 1px;
  background-color: #21243d;
}

.page-footer2-logo {
  order: 2;
}

@media (min-width: 300px) {
  .buttom1 {
    width: 16%;
    height: 80px;
    margin-top: 5%;
    margin-right: 13%;
    font-size: 12px;
    font-size: 12px;
    transform: scale(0.5);
  }

  .buttom {
    height: 155px;
  }

  .footer-nav-link {}
}

@media (min-width: 380px) {
  .buttom1 {
    width: 16%;
    height: 80px;
    margin-top: 5%;
    margin-right: 13%;
    font-size: 12px;
    font-size: 12px;
    transform: scale(0.5);
  }

  .buttom {
    height: 155px;
  }

  .footer-nav-link {}
}

@media (min-width: 768px) {
  .buttom1 {
    width: 15%;
    height: 140px;
    margin-top: 10%;
    margin-right: 12%;
    font-size: 13px;
    transform: scale(1);
  }

  .buttom {
    height: 150px;
  }

}




@media (min-width: 992px) {
  .buttom1 {
    width: 13%;
    height: 140px;
    margin-top: 10%;
    margin-right: 12%;
    font-size: 13px;
    transform: scale(1);
  }

  .buttom {
    height: 100%;
  }

}

@media (min-width: 1200px) {
  .buttom1 {
    width: 15%;
    height: 140px;
    margin-top: 10%;
    margin-right: 12%;
    font-size: 15px;
    transform: scale(1);
  }

}

@media (min-width: 1440px) {
  .buttom1 {
    width: 13%;
    height: 140px;
    margin-top: 10%;
    margin-right: 12%;
    font-size: 17px;
    transform: scale(1);
  }
}

@media only screen and (max-width: 1439px) {}

@media only screen and (max-width: 1199px) {}

@media only screen and (max-width: 991px) {
  .stats-inner {
    // display: block;
    height: auto;
    padding: 20px;
  }

  .stats-item {
    justify-content: start;
  }
}

@media only screen and (max-width: 767px) {}

@media only screen and (max-width: 479px) {}
</style>
