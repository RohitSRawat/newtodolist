import { combineReducers } from 'redux';



const login = (state = [], action) => {
    switch (action.type) {
      case "fetchthedata":
        return action.payload;
        case "fielderror":
          return action.payload;
      default:
        return state;
    }
  };


  const verify = (state = [], action) => {
    switch (action.type) {
      case "verifyaccount":
        return action.payload;
        case "verifyerror":
          return action.payload;
      default:
        return state;
    }
  };

  const tasks = (state = [], action) => {
    switch (action.type) {
      case "tasklist":
        return action.payload;
        case "tasklisterr":
          return action.payload;
      default:
        return state;
    }
  };



export default combineReducers({
    login,verify,tasks
});

