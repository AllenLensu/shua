import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../pages/home/Home.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('../pages/home/content/Content.vue')
                },
                {
                    path: 'star',
                    component: () => import('../pages/zone/setting/star/StarSetting.vue')
                },
                {
                    path: 'content/:id',
                    props: true,
                    component: () => import('../pages/home/content/Content.vue')
                },
                {
                    path: 'content/:pid/:id',
                    props: true,
                    component: () => import('../pages/home/content/Content.vue')
                }
            ]
        },
        {
            path: '/error',
            component: () => import('../pages/error/Error.vue')
        },
        {
            path: '/account',
            component: () => import('../pages/account/Login.vue')
        },
        {
            path: '/register',
            component: () => import('../pages/account/register/Register.vue'),
            children: [
                {
                    path: '',
                    component: () => import('../pages/account/register/Steps/StepOne.vue')
                },
                {
                    path: 'improve',
                    component: () => import('../pages/account/register/Steps/StepTwo.vue')
                },
                {
                    path: 'finish',
                    component: () => import('../pages/account/register/Steps/StepThr.vue')
                }
            ]
        },
        {
            path: '/zone',
            component: () => import('../pages/zone/BaseZone.vue'),
            children: [
                {
                    path: '',
                    component: () => import('../pages/zone/home/ZoneHome.vue')
                }, {
                    path: 'user/info',
                    component: () => import('../pages/zone/user/UserInfo.vue')
                }, {
                    path: 'manage',
                    component: () => import('../pages/zone/manage/Manage.vue')
                }, {
                    path: 'setting',
                    component: () => import('../pages/zone/setting/BaseSetting.vue')
                }, {
                    path: 'star',
                    component: () => import('../pages/zone/setting/star/StarSetting.vue')
                }
            ]
        }
    ]
})

export default router