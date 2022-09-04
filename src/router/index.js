import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllData from '../views/Web/AllData.vue'
import Details from '../views/Web/Details.vue'
import ContentDetails from '../views/Web/ContentDetails.vue'
import Register from '../views/Web/Register.vue'
import Login from '../views/Web/Login.vue'
import Person from '../views/Web/Person.vue'
import LearningTools from '../views/Web/LearningTools.vue'
import SetPassword from '../views/Web/SetPassword.vue'
import comment from '../views/Web/comment.vue'
import PostContent from '../views/Web/PostContent.vue'
import changeEmail from '../views/Web/changeEmail.vue'
import SearchResult from '../views/Web/SearchResult.vue'
import Manager from '../views/Web/Manager.vue'
import Message from '../views/Web/Message.vue'
import SignOut from '../views/Web/SignOut.vue'
import VideoDetails from '../views/Web/VideoDetails.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home",
  },
  {
    path: "/home",
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/web/data',
    name: 'AllData',
    component: AllData
  },
  {
    path: '/web/data/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/web/content/details',
    name: 'ContentDetails',
    component:ContentDetails
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/person',
    name: 'Person',
    component:Person
  },
  {
    path: '/learningTools',
    name: 'LearningTools',
    component:  LearningTools
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component:  SetPassword
  },
  {
    path: '/comment',
    name: 'comment',
    component:  comment
  },
  {
    path: '/postContent',
    name: 'PostContent',
    component:  PostContent
  },
  {
    path: '/changeEmail',
    name: 'changeEmail',
    component:  changeEmail
  },
  {
    path: '/SearchResult',
    name: 'SearchResult',
    component: SearchResult
  },
  {
    path: '/Manager',
    name: 'Manager',
    component: Manager
  },
  {
    path: '/Message',
    name: 'Message',
    component: Message
  },
  {
    path: '/SignOut',
    name: 'SignOut',
    component: SignOut
  },
  {
    path: '/VideoDetails',
    name: 'VideoDetails',
    component: VideoDetails
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
