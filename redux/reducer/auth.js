  // redux/reducers/auth.js
  const initialState = {
    token: null,
  };
  
  export default (state = initialState, action) => {
    
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...state,
          token: action.token,
        };
      default:
        return state;
    }
  };
