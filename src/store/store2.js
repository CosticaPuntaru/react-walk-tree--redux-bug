export const store2 = 'delayed_action_STORE_2'

export function changeStore2(payload) {

  return (dispatch) => {
    console.log('changeStore2');
    setTimeout(() => {
      dispatch({
        type: store2,
        payload: {
          value: payload
        }
      });
    }, 2000)
  }
}

const initialState = {
  value: ''
};

export default function reducer2(state = initialState, action) {
  if (action.type === store2) {
    console.log('reducer2 triggered', action.payload);
    return action.payload;
  }
  return state;
}
