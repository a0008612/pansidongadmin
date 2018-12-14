import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import AppHe from '@/components/service/App-He'
import AppYu from '@/components/service/App-Yu'
import AppCao from '@/components/service/App-Cao'
import AppSun from '@/components/service/App-Sun'
import AppSong from '@/components/service/App-Song'
import AppRuan from '@/components/service/App-Ruan'
import AppIndex from '@/components/service/App-Index'

Vue.use(Router)

export const routes= [{
  path: '/',
  name: 'AppIndex',
  component: AppIndex
},
{
  path: '/appHe',
  name: 'AppHe',
  component: AppHe
},
{
  path: '/appYu',
  name: 'AppYu',
  component: AppYu
},
{
  path: '/appCao',
  name: 'AppCao',
  component: AppCao
}, 
{
  path: '/appSun',
  name: 'AppSun',
  component: AppSun
},
{
  path: '/appSong',
  name: 'AppSong',
  component: AppSong
},
{
  path: '/appRuan',
  name: 'AppRuan',
  component: AppRuan
}
]
    
