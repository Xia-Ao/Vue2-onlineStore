const state = {
    menuFlag: [false, false, false, false]
};

const getters = {};

const actions = {};

const mutations = {
    menuShow (state, index) {
        state.menuFlag[index] = true;
    },
    menuHidden (state, index) {
        state.menuFlag[index] = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
