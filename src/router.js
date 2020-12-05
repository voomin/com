import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'Landing',
            component: () => import('./components/Lndg.vue')
        },

        // 연습용
        {
            path: '/temp',
            component: () => import('./views/Temp.vue'),
            children: [
                {
                    path: 'wave',
                    name: 'Wave',
                    component: () => import('./components/temp/wave/Pge.vue')
                },
                {
                    path: 'sheep',
                    name: 'Sheep',
                    component: () => import('./components/temp/sheep/Pge.vue')
                },
                {
                    path: 'rope-box',
                    name: 'RopeBox',
                    component: () => import('./components/temp/RopeBox.vue')
                }
            ]

        }
    ]
});
