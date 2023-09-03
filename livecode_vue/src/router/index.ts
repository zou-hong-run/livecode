import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router';

export const constRoute:RouteRecordRaw[] = [
    {
        path:"/addcode",
        name:"addcode",
        component:()=>import("../views/index.vue")
    },
    {
        path:"/mycode",
        name:"mycode",
        component:()=>import("../views/mycode.vue")
    },
    {
        path:"/person",
        name:"person",
        component:()=>import("../views/person.vue")
    },
    {
        path:"/statistics",
        name:"statistics",
        component:()=>import("../views/statistics.vue")
    },
    {
        path:"/showcode",
        name:"showcode",
        component:()=>import("../views/showcode.vue")
    },
];
const router = createRouter({
    history:createWebHashHistory(),
    routes:constRoute
});
export default router;