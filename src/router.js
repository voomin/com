import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
    history: createWebHashHistory(),
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
