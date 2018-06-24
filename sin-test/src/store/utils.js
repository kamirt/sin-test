const filterBy = (param, state, paramToChange) => {
  let seats = Object.keys(state.seats)
    .filter(seat => state.seats[seat][param.name] === param.id)

  let filtered = seats.sort().reduce((obj, key) => {
    obj.param[state.seats[key][paramToChange.name]] = state[paramToChange.instate][state.seats[key][paramToChange.name]];
    obj.seats[key] = state.seats[key]
    return obj;
  }, {seats: {}, param: {}});
  return filtered
}

export default filterBy;
