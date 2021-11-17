import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import UsuarioCrud from '../components/UsuarioCrud'
import TipoCrud from '../components/TipoCrud'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/usuarios',
    component: UsuarioCrud
    
  },
   {
    path: '/tipos',
    component: TipoCrud
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router