<template>
  <div id="app" v-cloak>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',

    data() {
      return {
        show:false
      }
    }
  }
</script>
<style scoped>
.user-info-bean  /deep/ .symbol{width: 15px; padding-top: 5px; float: left;  margin-right: 5px;}
.recharge-arr-btn  /deep/  .symbol{width: 18px; padding-top: 0px; float: left;}

.price_box /deep/ { float: right; display:flex; justify-content:center; align-items:center;  margin-top: -4px;  }
.price_box  /deep/  .symbol{ margin-left: 10px; width: 18px; padding-top: 2px; margin-right: 5px;  }


</style>
<style lang="scss">
  * {
    box-sizing: border-box;
    font-family: Oxanium, sans-serif;
  }

  @font-face {
    font-family: 'Oxanium';
    src: url('./assets/font/oxanium/Oxanium-Medium.ttf');
    font-weight: normal;
  }
  #app {
    font-family: Oxanium, sans-serif;
    background-size: contain;
    background-repeat: no-repeat;
    color: #2c3e50;
    margin: 0;
    height: 100%
  }

  [v-cloak]{
    display:none;
  }

  svg {
    fill: currentColor;
  }

  .el-image__error {
    background-color: transparent;
  }

  .el-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    .el-table__body-wrapper {
      flex: 1;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .search-card .el-card__header {
    padding: 6px !important;
  }

  .flex {
    display: flex;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .o-list {
    flex: 0 0 15%;
    max-width: 15%;
    // padding-left: 6px;
    // padding-right: 6px;
    // margin-bottom: 12px;
    text-align: center;
  }

  .o-item {
    border-radius: 5px;
    // background-color: #212126;
    cursor: pointer;
  }

  .o-body {
    position: relative;
    margin: 0 auto;
    text-align: center;
  }

  .o-bg {
    height: 88px;
  }

  .o-img {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    filter: saturate(150%);
    max-width: 100%;
    height: auto;
  }

  .o-name {
    font-weight: 700;
    font-size: 11px;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .o-abrasion {
    margin-top: 4px;
    color: #999;
    font-size: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .o-price {
    margin-top: 4px;
    color: #545567;
    font-size: 10px;
  }

  .o-item2:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    transform: translate(-50%,-50%);
    border-radius: 50%;
  }

  .o-golden {
    .o-body {
      background-image: radial-gradient(circle at center,rgba(252,166,17,.5),rgba(252,166,17,.1) 25%,rgba(252,166,17,0) 40%),radial-gradient(circle at center,rgba(210,154,19,.48),rgba(210,154,19,.15) 30%,rgba(210,154,19,0) 65%);
    }

    .o-bg {
      fill: #f7d744;
    }

    .o-item2:after {
      background: rgba(252,166,17,.6);
      box-shadow: 0 0 45px 26px #fca611;
    }
  }

  .o-red {
    .o-body {
      background-image: radial-gradient(circle at center,rgba(244,53,21,.52),rgba(244,53,21,.1) 25%,rgba(244,53,21,0) 40%),radial-gradient(circle at center,rgba(200,48,32,.6),rgba(200,48,32,.15) 30%,rgba(200,48,32,0) 65%);
    }

    .o-bg {
      fill: #f75044;
    }

    .o-item2:after {
      background: rgba(244,53,21,.6);
      box-shadow: 0 0 45px 26px #f43515;
    }
  }

  .o-pink {
    .o-body {
      background-image: radial-gradient(circle at center,rgba(241,43,141,.5),rgba(241,43,141,.1) 25%,rgba(241,43,141,0) 40%),radial-gradient(circle at center,rgba(192,42,102,.6),rgba(192,42,102,.15) 30%,rgba(192,42,102,0) 65%);
    }

    .o-bg {
      fill: #e13864;
    }

    .o-item2:after {
      background: rgba(241,43,141,.6);
      box-shadow: 0 0 45px 26px #f12b8d;
    }
  }

  .o-purple {
    .o-body {    background-image: radial-gradient(circle at center,rgba(94,43,241,.73),rgba(94,43,241,.1) 25%,rgba(94,43,241,0) 40%),radial-gradient(circle at center,rgba(81,42,192,.6),rgba(81,42,192,.15) 30%,rgba(81,42,192,0) 65%);
    }

    .o-bg {
      fill: #6644f7;
    }

    .o-item2:after {
      background: rgba(94,43,241,.6);
      box-shadow: 0 0 45px 25px #5e2bf1;
    }
  }

  .o-blue {
    .o-body {
      background-image: radial-gradient(circle at center,rgba(43,66,241,.73),rgba(43,66,241,.1) 25%,rgba(43,66,241,0) 40%),radial-gradient(circle at center,rgba(42,53,192,.6),rgba(42,53,192,.15) 30%,rgba(42,53,192,0) 65%);
    }

    .o-bg {
      fill: #4455f7;
    }

    .o-item2:after {
      background: rgba(43,66,241,.6);
      box-shadow: 0 0 40px 25px #2c46ff;
    }
  }

  .o-wathet {
    .o-body {background-image: radial-gradient(circle at center,rgba(99,165,209,.5),rgba(99,165,209,.1) 25%,rgba(99,165,209,0) 40%),radial-gradient(circle at center,rgba(99,165,209,.6),rgba(99,165,209,.1) 30%,rgba(99,165,209,0) 65%);
    }

    .o-bg {
      fill: #63A5D1;
    }

    .o-item2:after {
      background: rgba(99,165,209,.6);
      box-shadow: 0 0 45px 30px #63a5d1;
    }
  }

  .o-white {
    .o-body {
      background-image: radial-gradient(circle at center,rgba(187,187,187,.5),rgba(187,187,187,.1) 25%,rgba(187,187,187,0) 40%),radial-gradient(circle at center,rgba(170,170,170,.6),rgba(170,170,170,.15) 30%,rgba(170,170,170,0) 65%);
    }

    .o-bg {
      fill: #ddd;
    }
  }

  .edui-editor div {
    line-height: initial;
  }

  .page-content {
    height: 100vh;
  }

  .type .el-input__inner {
    background-color: #191c34;
    border: 1px solid #353859;
    color: #FFFFFF;
  }

  .type .el-input__inner:hover, .type .el-input__inner:focus {
    border: 1px solid #232749 !important;
  }

  .type .el-input.is-focus .el-input__inner {
    border: 1px solid #232749 !important;
  }

  .type-pop {
    background-color: #191c34 !important;
    border: 1px solid #353859 !important;
  }

  .type-pop.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #353859 !important;
  }

  .type-pop.el-popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: #191c34 !important;
  }

  .type-pop .el-select-dropdown__item.hover, .type-pop .el-select-dropdown__item:hover {
    background-color: #353859 !important;
  }

  .type-pop .el-select-dropdown__item.selected {
    color: #FFFFFF !important;
  }

  .text-center {
    text-align: center;
  }

  .data-loading {
    display: inline-block;
    margin-top: 50px;
    font-size: 80px;
  }

  .ml-auto {
    margin-left: auto;
  }

  .benefits-inner, .case-inner, .roll-inner, .profile-inner, .partner-inner, .member-inner, .lucky-inner, .store-inner, .page-footer2-inner, .account-inner, .battle-container {
    position: relative;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
  }

  .msg-dialog {
    .el-dialog {
      margin-top: 30vh !important;
      border-radius: 10px;
      overflow: hidden;
      background: #191c34;
      max-width: 500px;
    }

    .el-dialog__title {
      color: #ffffff;
      font-weight: 900;
      font-size: 20px;
    }

    .el-icon-close {
      font-size: 30px;
    }

    .el-dialog__body {
      color: #ffffff;
      font-size: 16px;
    }
  }

  .lucky-tooltip {
    border-radius: 5px;
    background-color: #090a14 !important;
    font-weight: 500;
    color: #6b6e90 !important;
    width: 250px;
    font-size: 12px;

    .popper__arrow {
      border-top-color: #090a14 !important;
    }

    .popper__arrow:after {
      border-top-color: #090a14 !important;
    }
  }

  .result-dialog {
    background-color: rgba(16,16,30,.9);

    .el-dialog {
      background-color: #0d0e1c;
      z-index: 0;
    }

    .el-dialog__title {
      font-size: 27px;
      line-height: 1.2;
      color: #fff;
      font-weight: 500;
      text-transform: capitalize;
    }

    .el-dialog {
      width: 40%;
      margin-top: 0 !important;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .el-dialog__header {
      padding: 31px 20px 10px;
    }

    .el-dialog__body {
      text-align: center !important;
    }
  }

  .result-dialogs {
    background-color: rgba(16,16,30,.9);

    .el-dialog {
      background-color: #191c34;
      z-index: 0;
    }

    .el-dialog__title {
      font-size: 27px;
      line-height: 1.2;
      color: #fff;
      font-weight: 500;
      text-transform: capitalize;
    }

    .el-dialog {
      width: 40%;
      margin-top: 0 !important;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .el-dialog__header {
      padding: 30px;
      text-align: left;
    }

    .el-dialog__body {
      text-align: center !important;
      padding: 0;
    }
  }

  .lucky-dialogs {
    background-color: rgba(16,16,30,.1);

    .el-dialog {
      background-color: #191c34;
      z-index: 0;
    }

    .el-dialog__title {
      font-size: 27px;
      line-height: 1.2;
      color: #fff;
      font-weight: 500;
      text-transform: capitalize;
    }

    .el-dialog {
      width: 60%;
      margin-top: 0 !important;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .el-dialog__header {
      padding: 30px;
      text-align: left;
    }

    .el-dialog__body {
      text-align: center !important;
      padding: 0;
    }
  }
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input::-webkit-outer-spin-button{
    -webkit-appearance: none !important;
  }

  input[type="number"]{
    -moz-appearance: textfield;
  }

  .fore-end-confirm {
    background-color: #191c34 !important;
    border: 1px solid #191c34 !important;

    .el-button {
      background-color: #282934;
      border-color: #282934;
      color: #787a8d;
    }

    .el-button:hover {
      background-color: #343542;
      border-color: #343542;
      color: #9799af;
    }

    .el-button--primary {
      background-color: #3a34b0;
      border-color: #3a34b0;
      color: #FFFFFF;
    }

    .el-button--primary:hover {
      background-color: #4e46f1;
      border-color: #4e46f1;
      color: #FFFFFF;
    }

    .el-message-box__content {
      color: #ccc;
    }
  }

  .hierarchy {
    z-index: 9999 !important;
  }

  .battle-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;

    .el-dialog {
      background-color: #191c34;
      margin-top: 0 !important;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    .el-dialog__header {
      flex-shrink: 0;
      background-color: #16192f;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      padding-left: 35px;
      padding-right: 35px;
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #111425;
    }

    .battle-dialog-title {
      margin: 0 27px 0 0;
      font-size: 27px;
      font-weight: 500;
      color: #fff;
    }

    .battle-dialog-total {
      font-size: 13px;
      margin-right: 16px;
      text-align: center;

      & span {
        color: #6ce19b;
      }
    }

    .battle-dialog-clear {
      background-color: transparent;
      cursor: pointer;
      transition: border-color .15s,color .15s;
      color: #626694;
      font-size: 12px;
      line-height: 1;
      padding: 8px 14px;
      border: 1px solid #2e304e;
      border-radius: 15px;
      text-transform: uppercase;

      &:hover {
        color: #979abd;
        border: 1px solid #434565;
      }
    }

    .el-dialog__body {
      padding: 0;
    }

    .battle-dialog-top {
      flex-shrink: 0;
      background-color: #16192f;
      padding-left: 35px;
      padding-right: 35px;
      display: flex;
      height: 70px;

      @include phone {
        padding: 0 10px;
      }
    }

    .battle-dialog-filter-wrap {
      display: flex;
      flex-grow: 1;
      overflow-x: auto;
    }

    .battle-dialog-filter {
      display: flex;
      flex-wrap: nowrap;
    }

    .battle-dialog-btn {
      flex: 1;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      font-size: 15px;
      color: #8b8ea8;
      white-space: nowrap;
      min-width: 100px;

      &:hover {
        color: #a8aabe;
      }

      &.active {
        color: #fff;
        border-bottom: 1px solid #8e429a;
      }
    }

    .battle-dialog-search {
      display: flex;
      width: 100%;
      max-width: 155px;
      padding-top: 1px;
      border-bottom: 1px solid #2d314e;
      margin-left: 10px;
      @include phone {
        display: none;
      }
    }

    .battle-dialog-search-input {
      width: 100%;
      background-color: transparent;
      font-size: 15px;
      color: #a3a6b6;
      border: 0;
      outline: 0;
    }

    .battle-dialog-search-btn {
      border: 0;
      padding: 0;
      background-color: transparent;
      cursor: pointer;
      flex-shrink: 0;
      color: #a3a6b6;
      transition: none;
      cursor: default;
    }

    .icon-search {
      width: 16px;
      height: 16px;
    }

    .battle-dialog-content {
      padding: 35px 0;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
    }

    .battle-dialog-items-wrap {
      position: relative;
      overflow: auto;
      flex-grow: 1;
      margin-bottom: 35px;
      height: auto;
    }

    .battle-dialog-items-wrap-content {
      margin-right: 35px;
      margin-left: 35px;
      overflow: hidden;
      height: 300px;
      max-width: 100%;
      overflow-y: scroll;
    }

    .battle-dialog-ready {
      border: 0;
      cursor: pointer;
      display: block;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      max-width: 200px;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
      padding: 21px 30px 19px;
      border-radius: 2px;
      background-color: #4854c9;
      color: #fff;
      text-align: center;
    }

    .battle-dialog-items {
      display: flex;
      flex-wrap: wrap;
      margin: -3px;
    }

    .battle-dialog-item {
      flex: 0 0 50%;
      max-width: 50%;
      padding: 3px;
    }

    .product-card {
      background-image: none !important;
    }

    .product-card-bg {
      opacity: 0 !important;
    }

    .product-card-icon-add {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 56px;
      height: 56px;
      color: #fff;
      border-radius: 50%;
      background-color: rgba(51,44,123,.8);
      transform: translate(-50%,-50%);
      opacity: 0;
      transition: opacity .15s;
    }

    .icon-plus-thin {
      width: 20px;
      height: 20px;
    }

    .battle-dialog-item:hover {
      .product-card {
        background-color: #272b50;
        background-image: linear-gradient(-135deg, rgba(67, 42, 192, 0.4), rgba(67, 42, 192, 0) 50%) !important;
      }

      .product-card-bg {
        opacity: 1 !important;
      }

      .product-card-icon-add {
        color: #fff;
        opacity: 1;
      }
    }

    .product-card-number {
      position: absolute;
      top: 13px;
      right: 15px;
      font-size: 13px;
      color: #dfdbef;
      user-select: none;
    }

    .product-card-remove {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      position: absolute !important;
      z-index: 1 !important;
      top: 10px !important;
      left: 10px !important;
      width: 22px !important;
      height: 22px !important;
      border-radius: 7px !important;
      border: 1px solid rgba(255,102,102,.15) !important;
      color: #ff7092 !important;
      transition: border-color .15s !important;

      &:hover {
        color: #ffa9b5;
        border: 1px solid rgba(255,160,160,.15);
      }
    }
  }

  @media (min-width: 480px) {
    .benefits-inner, .case-inner, .roll-inner, .profile-inner, .partner-inner, .member-inner, .lucky-inner, .store-inner, .page-footer2-inner, .account-inner, .battle-container {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .benefits-inner, .case-inner, .roll-inner, .profile-inner, .partner-inner, .member-inner, .lucky-inner, .store-inner, .page-footer2-inner, .account-inner, .battle-container {
      width: 738px;
    }

    .battle-dialog {
      .battle-dialog-item {
        flex: 0 0 25%;
        max-width: 25%;
      }
    }
  }

  @media (min-width: 992px) {
    .benefits-inner, .case-inner, .roll-inner, .profile-inner, .partner-inner, .member-inner, .lucky-inner, .store-inner, .page-footer2-inner, .account-inner, .battle-container {
      width: 962px;
    }
  }

  @media (min-width: 1200px) {
    .benefits-inner, .case-inner, .roll-inner, .profile-inner, .partner-inner, .member-inner, .lucky-inner, .store-inner, .page-footer2-inner, .account-inner, .battle-container {
      width: 1170px;
    }
  }

  @media (min-width: 1440px) {
    .benefits-inner, .case-inner, .roll-inner, .profile-inner, .partner-inner, .member-inner, .lucky-inner, .store-inner, .page-footer2-inner, .account-inner, .battle-container {
      width: 1440px;
    }

    .case-inner .live-item {
      flex-basis: 16.66667%;
      max-width: 16.66667%;
    }
  }

  @media only screen and (max-width: 1439px) {
  }

  @media only screen and (max-width: 1199px) {
  }

  @media only screen and (max-width: 991px) {
    .battle-dialog {
      .battle-dialog-items-wrap-content {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }

  @media only screen and (max-width: 767px){
  }

  @media only screen and (max-width: 479px){
  }
</style>
