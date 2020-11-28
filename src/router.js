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
        {
            path: '/sheep',
            name: 'Sheep',
            component: () => import('./components/temp/Sheep.vue')
        }
    ]
});
