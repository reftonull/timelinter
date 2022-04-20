import { createRouter, createWebHistory } from 'vue-router'
import AddView from '../views/AddView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PersonView from '../views/PersonView.vue'
import RegisterView from '../views/RegisterView.vue'
import TimelineView from '../views/TimelineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/timelines",
      name: "timelines",
      component: TimelineView
    },
    {
      path: "/people",
      name: "people",
      component: PersonView
    },
    {
      path: "/add",
      name: "add",
      component: AddView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
