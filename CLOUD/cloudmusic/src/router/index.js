/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
// 注意，通过import引入的组件不会按需加载
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
const Recommend = resolve => {
  import("../views/Recommend").then(module => {
    resolve(module);
  });
};
const Detail = resolve => {
  import("../views/Detail").then(module => {
    resolve(module);
  });
};
const Singer = resolve => {
  import("../views/Singer").then(module => {
    resolve(module);
  });
};
const Rank = resolve => {
  import("../views/Rank").then(module => {
    resolve(module);
  });
};
const Search = resolve => {
  import("../views/Search").then(module => {
    resolve(module);
  });
};
const Account = resolve => {
  import("../views/Account").then(module => {
    resolve(module);
  });
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: Recommend,
    children: [
      {
        path: "detail/:id/:type",
        component: Detail
      }
    ]
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: "detail/:id/:type",
        component: Detail
      }
    ]
  },
  {
    path: "/rank",
    component: Rank
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/account",
    component: Account
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
