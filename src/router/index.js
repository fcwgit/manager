import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container'
import Login from '@/components/Login'
import Login1 from '@/components/Login1'
import Home from '@/components/Home'
import CreateProject from '@/components/CreateProject'
import ConformProject from '@/components/ConformProject'
import QueryProject from '@/components/QueryProject'
import DetailProject from '@/components/DetailProject'
import ModifyProject from '@/components/ModifyProject'
import QueryBranch from '@/components/QueryBranch'
import AddBranch from '@/components/AddBranch'
import DetailBranch from '@/components/DetailBranch'
import ModifyBranch from '@/components/ModifyBranch'
import QueryUser from '@/components/QueryUser'
import DetailUser from '@/components/DetailUser'
import ModifyUser from '@/components/ModifyUser'
import AddUser from '@/components/AddUser'
import QueryManager from '@/components/QueryManager'
import DetailManager from '@/components/DetailManager'
import ModifyManager from '@/components/ModifyManager'
import AddManager from '@/components/AddManager'
import ResetPassword from '@/components/ResetPassword'
import Document from '@/components/Document'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword, meta: { keepAlive: false }
    },
    {
      path: '/',
      name: 'Login',
      component: Login, meta: { keepAlive: false }
    },
    {
      path: '/container',
      component: Container,
      children:[
        {
          path:'/',
          component:Home, meta: { keepAlive: false }
        },
        {
          path:'createProject',
          component:CreateProject, meta: { keepAlive: false }
        },{
          path:'conformProject',
          name:'conformProject',
          component:ConformProject, meta: { keepAlive: false }
        },{
          path:'queryProject',
          component:QueryProject, meta: { keepAlive: true }
        },{
          path:'detailProject',
          name:'detailProject',
          component:DetailProject, meta: { keepAlive: false }
        },{
          path:'modifyProject',
          name:'modifyProject',
          component:ModifyProject, meta: { keepAlive: false }
        },{
          path:'queryBranch',
          component:QueryBranch, meta: { keepAlive: false }
        },{
          path:'addBranch',
          component:AddBranch,meta:{keepAlive:false}
        },{
          // path:'detailBranch/:id/:num/:master/:slaver/:label/:state/:author/:time',
          path:'detailBranch',
          name:'detailBranch',
          component:DetailBranch, meta: { keepAlive: false }
        },{
          // path:'modifyBranch/:id/:num/:master/:slaver/:label/:state/:author/:time',
          path:'modifyBranch',
          name:'modifyBranch',
          component:ModifyBranch, meta: { keepAlive: false }
        },{
          path:'queryUser',
          component:QueryUser, meta: { keepAlive: true }
        },{
          // path:'detailUser/:time/:pinyin/:name/:section/:post/:specialty/:stateDesc/:author/:key',
          path:'detailUser',
          name:'detailUser',
          component:DetailUser, meta: { keepAlive: false }
        },{
          // path:'modifyUser/:time/:pinyin/:name/:section/:post/:specialty/:stateDesc/:author/:key',
          path:'modifyUser',
          name:'modifyUser',
          component:ModifyUser, meta: { keepAlive: false }
        },{
          path:'addUser',
          component:AddUser, meta: { keepAlive: false }
        },{
          path:'queryManager',
          component:QueryManager, meta: { keepAlive: true }
        },{
          // path:'detailManager/:time/:alias/:name/:section/:post/:type/:state/:author',
          path:'detailManager',
          name:'detailManager',
          component:DetailManager, meta: { keepAlive: false }
        },{
          // path:'modifyManager/:time/:alias/:name/:section/:post/:type/:state/:author',
          path:'modifyManager',
          name:'modifyManager',
          component:ModifyManager, meta: { keepAlive: false }
        },{
          path:'addManager',
          component:AddManager, meta: { keepAlive: false }
        },{
          path:'document',
          component:Document,meta:{keepAlive:false}
        }
      ]
    },
    // {
    //   path: '/createProject',
    //   name: 'CreateProject',
    //   component: CreateProject
    // }
  ]
})
