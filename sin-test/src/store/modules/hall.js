import API from '../api';
import filterBy from '../utils';

const state = {
  sectors: {},
  lines: {},
  seats: {},
  categories: {},
  filteredBySec: {},
  filteredByCat: {},
  filteredByLine: {}
};

const getters = {
  getSectors: state => {
    return state.sectors;
  },
  getCategories: state => id => {
    if (!id) {
      return {}
    }
    return state.filteredBySec.categories
  },
  getLines: state => id => {
    if (!id) {
      return {}
    }
    return state.filteredByCat.lines
  },
  getSeats: state => id => {
    if (!id) {
      return {}
    }
    return state.filteredByLine.seats
  }
};

const actions = {
  askItems({ state, commit }, article) {
    API.get({
      url: 'https://syn.su/js/front/data.js',
      callback: (resp) => {
        this.commit('setItems', resp.data.response)
      }
    })
  },
  filterItems(state, options) {
    this.commit('getFiltered', options)
  }
};

const mutations = {
  setItems(state, items) {
      const {sectors, lines, seats, categories} = items;
      state.sectors = sectors;
      state.lines = lines;
      state.seats = seats;
      state.categories = categories;
  },
  getFiltered(state, {sector, category, line}) {
    //filter by line
    if(line) {
      let filtered = filterBy(
        {name: 'line', id: line},
        state.filteredByCat,
        {name: 'seat', instate: 'seats'}
      );
      state.filteredByLine.seats = filtered.seats;
      return;
    }
    //filter by category
    if(category) {
      let filtered = filterBy(
        {name: 'category', id: category},
        state.filteredBySec,
        {name: 'line', instate: 'lines'}
      );
      state.filteredByCat.lines = filtered.param;
      state.filteredByCat.seats = filtered.seats;
      return;
    }
    //filter by sector
    if(sector) {
      let filtered = filterBy(
        {name: 'sector', id: sector},
        state,
        {name: 'category', instate: 'categories'}
      );
      state.filteredBySec.categories = filtered.param;
      state.filteredBySec.seats = filtered.seats;
      state.filteredBySec.lines = state.lines;
      return;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
