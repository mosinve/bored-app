import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Activity",
      component: () =>
        import(/* webpackChunkName: "Activity" */ "@/views/PageActivity")
    },
    {
      path: "/list",
      name: "Activities",
      component: () =>
        import(
          /* webpackChunkName: "Activities" */ "@/views/PageActivitiesList"
        )
    }
  ]
});
