/**
 * 全局配置文件
 */
export default {
  title: "CHSkin",
  logo: "tt",
  key: 'tt',//配置主键,目前用于存储
  indexTitle: 'Admin',
  clientId: 'tt', // 客户端id
  clientSecret: 'tt_secret', // 客户端密钥
  //http的status默认放行列表
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "控制台",
    value: "/cclladminlogin/index/index",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  },
}
