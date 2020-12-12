import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            name: 'Landing',
            component: () => import('./views/Lndg.vue')
        },

        // 작업물 ㅎㅎ
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
