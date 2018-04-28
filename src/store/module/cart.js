const state = {
    productCount: 0
};

const getters = {};

const actions = {};

const mutations = {
    countInit (state, n) {
        state.productCount = n;
    },
    add (state, n) {
        state.productCount += n;
    },
    reduce (state, n) {
        state.productCount -= n;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
