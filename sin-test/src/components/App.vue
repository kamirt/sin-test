<template>
  <div id="app">
    <div>
      <label for="sector">Сектор <span v-if="sector">{{ sectors[sector].name }}</span></label>
      <b-form-select
        v-model="sector"
        @change="selectChanged($event, 'sector')"
        class="mb-3"
        id="sector"
        :options="sectors"
        text-field="name"
        value-field="id"/>
      <label for="sector">Категория <span v-if="category">{{ categories[category].about }}</span></label>
      <b-form-select
        v-model="category"
        @change="selectChanged($event, 'category')"
        class="mb-3"
        id="category"
        :options="categories"
        text-field="about"
        value-field="id"/>
      <label for="sector">Ряд <span v-if="line">{{ lines[line].name }}</span></label>
      <b-form-select
        v-model="line"
        @change="selectChanged($event, 'line')"
        class="mb-3"
        id="line"
        :options="lines"
        text-field="name"
        value-field="id"/>
      <label for="sector">Место <span v-if="seat">{{ seats[seat].seat }}</span></label>
      <b-form-select
        v-model="seat"
        @change="selectChanged($event, 'seat')"
        class="mb-3"
        id="seat"
        :options="seats"
        text-field="seat"
        value-field="id"/>
      <div>sector_id: <strong>{{ sector }}</strong></div>
      <div>category_id: <strong>{{ category }}</strong></div>
      <div>line_id: <strong>{{ line }}</strong></div>
      <div>seat_id: <strong>{{ seat }}</strong></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      sector: null,
      category: null,
      line: null,
      seat: null,
      filters: {
        'sector': 1,
        'category': 2,
        'line': 3,
        'seat': 4
      }
    }
  },
  computed: {
    sectors () {
      return this.$store.getters.getSectors;
    },
    categories () {
      return this.$store.getters.getCategories(this.sector)
    },
    lines () {
      return this.$store.getters.getLines(this.category)
    },
    seats () {
      return this.$store.getters.getSeats(this.line)
    }
  },
  beforeCreate () {
    this.$store.dispatch('askItems');
  },
  methods: {
    selectChanged (id, item) {
      const obj = {}
      obj[item] = id
      this.$store.dispatch('filterItems', obj)
      Object.keys(this.filters).forEach((fil, idx) => {
        if (fil != item && this.filters[fil] > this.filters[item]) {
          this[fil] = null;
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/normalize.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
