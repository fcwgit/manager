import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container'
import Login from '@/components/Login'
import Home from '@/components/Home'
import CreateProject from '@/components/CreateProject'
import ConformProject from '@/components/ConformProject'
import QueryProject from '@/components/QueryProject'
import DetailProject from '@/components/DetailProject'
import ModifyProject from '@/components/ModifyProject'
import QueryBranch from '@/components/QueryBranch'
import DetailBranch from '@/components/DetailBranch'
import ModifyBranch from '@/components/ModifyBranch'
import QueryUser from '@/components/QueryUser'
import DetailUser from '@/components/DetailUser'
import ModifyUser from '@/components/ModifyUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/container',
      component: Container,
      children:[
        {
          path:'/',
          component:Home
        },
        {
          path:'createProject',
          component:CreateProject
        },{
          path:'conformProject/:projectName/:projectDesc/:projectDate',
          component:ConformProject
        },{
          path:'queryProject',
          component:QueryProject
        },{
          path:'detailProject',
          component:DetailProject
        },{
          path:'modifyProject',
          component:ModifyProject
        },{
          path:'queryBranch',
          component:QueryBranch
        },{
          path:'detailBranch',
          component:DetailBranch
        },{
          path:'modifyBranch',
          component:ModifyBranch
        },{
          path:'queryUser',
          component:QueryUser
        },{
          path:'detailUser',
          component:DetailUser
        },{
          path:'modifyUser',
          component:ModifyUser
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
