import * as types from './mutation_types';

export default {
  [types.SET_LOADING_STACKTRACE](state, data) {
    state.loadingStacktrace = data;
  },
  [types.SET_STACKTRACE_DATA](state, data) {
    state.stacktraceData = data;
  },
};
