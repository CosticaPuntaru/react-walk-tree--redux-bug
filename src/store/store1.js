export const store1 = 'delayed_action_STORE_1'

export function changeStore1(payload) {

  return (dispatch) => {
    console.log('changeStore1');
    setTimeout(() => {
      dispatch({
        type: store1,
        payload: {
          value: payload
        }
      });
    }, 1000)
  }
}

const initialState = {
  value: ''
};

export default function reducer1(state = initialState, action) {
  if (action.type === store1) {
    console.log('reducer1 triggered', action.payload);
    return action.payload;
  }
  return state;
}
