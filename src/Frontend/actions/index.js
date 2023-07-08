import formapi from '../api'

export const wpadmin = (values,history) => async (dispatch) => {
    try {
        
      const response = await formapi.post("/createaccount", values);
      dispatch({ type: "fetchthedata", payload: response.data });
      history("/")

    } catch (error) {
      dispatch({ type: "fetchthedata", payload: error.response.data });
    }
  };



export const checkverify = (history) => async (dispatch) => {

        try {
           
          const response = await formapi.get("/verifydata");
          dispatch({ type: "verifyaccount", payload: response.data });
          history("/")
        } catch (error) {
           
          dispatch({ type: "verifyerror", payload: error.response.data });
          history("/login")
        }
      };



      export const createtask = (val) => async (dispatch) => {

        try {
           
          const response = await formapi.post("/createtask",val);
          dispatch({ type: "tasklist", payload: response.data });
         
        } catch (error) {
           
          dispatch({ type: "tasklisterr", payload: error.response.data });
         
        }
      };


      export const fetchtask = (val) => async (dispatch) => {

        try {
           
          const response = await formapi.get("/fetchtask",val);
          dispatch({ type: "tasklist", payload: response.data });
         
        } catch (error) {
           
          dispatch({ type: "tasklisterr", payload: error.response.data });
         
        }
      };


      export const updatetask = (val) => async (dispatch) => {

        try {
           console.log(val)
          const response = await formapi.post("/updatetask",val);
          dispatch({ type: "tasklist", payload: response.data });
         
        } catch (error) {
           
          dispatch({ type: "tasklisterr", payload: error.response.data });
         
        }
      };


      export const deletetask = (val) => async (dispatch) => {

        try {
           console.log(val)
          const response = await formapi.delete("/deletetask"+`?id=${val}`);
          dispatch({ type: "tasklist", payload: response.data });
         
        } catch (error) {
           
          dispatch({ type: "tasklisterr", payload: error.response.data });
         
        }
      };


      export const logout = (history) => async (dispatch) => {

      
           
          const response = await formapi.post("/destoryerifyusertoken");
          dispatch({ type: "verifyaccount", payload: response.data });
          history("/login")

        
      };


