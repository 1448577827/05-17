import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'

Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    { path: '/', redirect:'/login' },
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children : [
        { path :  '/welcome', component : Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles }
      ]
    }

  ]
})

// 监听路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')

  if (!token) return next('/login')

  next()
})

export default router
