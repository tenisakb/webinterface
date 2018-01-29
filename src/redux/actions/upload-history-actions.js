const ADD = "oyster/upload_history/add";

const ACTIONS = Object.freeze({
  // actions
  ADD,
  addAction: item => ({ type: ACTIONS.ADD, payload: item })
});

export default ACTIONS;
