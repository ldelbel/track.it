const initialState = {
  page: 'new',
}

const menuReducer = (state = initialState, action) => {
  switch(action.type){
    case 'change_page':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

export default menuReducer;