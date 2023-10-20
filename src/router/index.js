import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/index/layout';
import Layout2 from '@/components/admin/layout';
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [{
      path: '/',
      component: Layout,
      meta: {
        bg: '#15172c'
      },
      children: [{
          path: '/',
          name: "网站首页",
          component: () => import('@/views/index/index/index_index')
        },

        //* ====================================================
        {
          path: '/benefits',
          name: "福利活动",
          component: () => import('@/views/index/benefits/index')
        },
        {
          path: '/box/:id',
          name: '箱子开启',
          component: () => import('@/views/index/box/details')
        }, {
          path: '/battle',
          name: '箱子对战',
          component: () => import('@/views/index/battle/index')
        }, {
          path: '/battle/:id',
          name: '对战详情',
          component: () => import('@/views/index/battle/details')
        }, {
          path: '/battle_create',
          name: '创建对战',
          component: () => import('@/views/index/battle/create')
        },
        {
          path: '/luckylist',
          name: '幸运开箱',
          component: () => import('@/views/index/lucky/index')
        }, {
          path: '/lucky/:id',
          name: '幸运开箱详情',
          component: () => import('@/views/index/lucky/details')
        },
        {
          path: '/lucky',
          name: '幸运开箱',
          component: () => import('@/views/index/lucky/details')
        },
        {
          path: '/roll',
          name: '福利Roll房',
          component: () => import('@/views/index/roll/index')
        }, {
          path: '/roll/:id',
          name: '福利Roll房详情',
          component: () => import('@/views/index/roll/details')
        }, {
          path: '/store',
          name: '饰品商城',
          component: () => import('@/views/index/store/index')
        }, {
          path: '/official',
          name: '福利中心',
          component: () => import('@/views/index/cdk/index')
        }, {
          path: '/profile/:id',
          name: '个人资料页',
          component: () => import('@/views/index/user/profile')
        }, {
          path: '/partner',
          name: '合作伙伴',
          component: () => import('@/views/index/user/partner')
        }, {
          path: '/member',
          name: '优质会员',
          component: () => import('@/views/index/user/member')
        }, {
          path: '/support',
          name: '客户支持',
          component: () => import('@/views/index/user/support')
        }, {
          path: '/history',
          name: '历史最佳',
          component: () => import('@/views/index/user/history')
        }, {
          path: '/user_info/:type?',
          name: '用户中心',
          component: () => import('@/views/index/user/user_info')
        }, {
          path: '/play',
          name: '活动',
          component: () => import('@/views/index/play/play')
        }, {
          path: '/user_tickets',
          name: '工单',
          component: () => import('@/views/index/user/user_tickets')
        },
        //======================================================*/
        // 签到
        // {
        //   path: '/signin',
        //   name: '签到',
        //   component: () => import('@/views/index/signin/index')
        // }
        // ,
        // {
        //   path: '/membervip',
        //   name: '会员',
        //   component: () => import('@/views/index/membervip/index')
        // }
        // ,
        // {
        //   path: '/activity',
        //   name: '活动',
        //   component: () => import('@/views/index/activity/index')
        // }
      ]
    },
    {
      path: '/cclladminlogin',
      component: Layout2,
      meta: {
        bg: '#ffffff'
      },
      redirect: '/cclladminlogin/index/index',
      children: [{
        path: '/cclladminlogin/index/index',
        name: '控制台',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/index/index')
      }, {
        path: '/cclladminlogin/user/user',
        name: '会员中心',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/user/user')
      }, {
        path: '/cclladminlogin/user/spread',
        name: '用户推广',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/user/spread')
      }, {
        path: '/cclladminlogin/user/ticket',
        name: '工单管理',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/user/ticket')
      }, {
        path: '/cclladminlogin/ornaments/ornaments_class',
        name: '饰品分类',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/ornaments/ornaments_class')
      }, {
        path: '/cclladminlogin/ornaments/ornaments',
        name: '饰品管理',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/ornaments/ornaments')
      }, {
        path: '/cclladminlogin/box/box_class',
        name: '箱子分类',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/box/box_class')
      }, {
        path: '/cclladminlogin/box/box',
        name: '箱子管理',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/box/box')
      }, {
        path: '/cclladminlogin/roll/roll',
        name: 'Roll房管理',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/roll/roll')
      }, {
        path: '/cclladminlogin/record/ornaments_record',
        name: '饰品记录',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/ornaments_record')
      }, {
        path: '/cclladminlogin/record/balance_record',
        name: '余额记录',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/balance_record')
      }, {
        path: '/cclladminlogin/record/gold_record',
        name: '佣金记录',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/gold_record')
      }, {
        path: '/cclladminlogin/record/zb_gold_record',
        name: '主播佣金',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/zb_gold_record')
      }, {
        path: '/cclladminlogin/record/statistics',
        name: '用户统计',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/statistics')
      }, {
        path: '/cclladminlogin/record/user_recharge',
        name: '充值统计',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/user_recharge')
      }, {
        path: '/cclladminlogin/record/cdk',
        name: 'cdk充值记录',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/record/cdk')
      }, {
        path: '/cclladminlogin/activity/cdk',
        name: 'CDK',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/activity/cdk')
      }, {
        path: '/cclladminlogin/system/site',
        name: '基本设置',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/system/site')
      }, {
        path: '/cclladminlogin/system/account',
        name: '管理员列表',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/system/account')
      }, {
        path: '/cclladminlogin/system/role',
        name: '角色列表',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/system/role')
      }, {
        path: '/cclladminlogin/system/account_info',
        name: '个人信息修改',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/system/account_info')
      }, {
        path: '/cclladminlogin/system/help',
        name: '帮助文档',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/system/help')
      }, {
        path: '/cclladminlogin/system/recharge',
        name: '充值金额',
        meta: {
          isAuth: 2
        },
        component: () => import('@/views/admin/system/recharge')
      }]
    },
    {
      path: '/cclladminlogin/login/login',
      name: '后台登录',
      meta: {
        bg: '#ffffff'
      },
      component: () => import('@/views/admin/login/login')
    },
  ]
})
// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}