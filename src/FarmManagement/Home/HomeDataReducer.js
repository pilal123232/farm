export const INITIAL_STATE = {
    loading: true,
    HomeData: [],
    error: false
 }
 
 export const HomeData = (state , action) =>{
    switch(action.type){
       case "FETCH_START":
          return{
             loading: true,
             HomeData: [],
             error: false
          }
       case "FETCH_SUCCESS":
          return{
             loading: false,
             HomeData: action.payload,
             error: false
          }
       case "FETCH_ERROR":
          return{
             loading: false,
             HomeData: [],
             error: true
          }
       default : 
          return state
    }
 }