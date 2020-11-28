import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'hello'
    },
    mutations: {
        setUserPref(state, nm) {
            state.name = nm;
        }
    },
    actions: {
        // setPlayUserData(
        //     { commit },
        //     {
        //         pref,
        //         coupon,
        //         ...data
        //     }
        // ) {
        //     commit('setSignStatus', true);

        //     commit('setUserBaseData', data);
        //     commit('setUserItemData', data);

        //     commit('setUserPref', pref);

        //     if (coupon) {
        //         commit('setPremiumStatus', true);
        //     }
        // }
    },
    getters: {
        name: (state) => state.name
    }
});
