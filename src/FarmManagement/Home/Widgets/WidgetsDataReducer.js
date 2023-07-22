export const INITIAL_STATE = {
    loading: false,
    WidgetsData: [],
    error: false
 }
 
 export const WidgetsData = (state , action) =>{
    switch(action.type){
       case "FETCH_START":
          return{
             loading: true,
             WidgetsData: [],
             error: false
          }
       case "FETCH_SUCCESS":
          return{
             loading: false,
             WidgetsData: action.payload,
             error: false
          }
       case "FETCH_ERROR":
          return{
             loading: false,
             WidgetsData: [],
             error: true
          }
       default : 
          return state
    }
 }