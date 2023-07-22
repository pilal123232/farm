export const INITIAL_STATE = {
   loading: false,
   HealthData: [],
   error: false
}

export const HealthDataReducer = (state , action) =>{
   switch(action.type){
      case "FETCH_START":
         return{
            loading: true,
            HealthData: [],
            error: false
         }
      case "FETCH_SUCCESS":
         return{
            loading: false,
            HealthData: action.payload,
            error: false
         }
      case "FETCH_ERROR":
         return{
            loading: false,
            HealthData: [],
            error: true
         }
      case "DELETE":
         return{
            loading: false,
            HealthData: action.payload,
            error: false
         }
      default : 
         return state     
   }
}