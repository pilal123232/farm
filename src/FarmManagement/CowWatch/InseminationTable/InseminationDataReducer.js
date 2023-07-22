export const INITIAL_STATE = {
   loading: false,
   InseminationData: [],
   error: false
}

export const InseminationDataReducer = (state , action) =>{
   switch(action.type){
      case "FETCH_START":
         return{
            loading: true,
            InseminationData: [],
            error: false
         }
      case "FETCH_SUCCESS":
         return{
            loading: false,
            InseminationData: action.payload,
            error: false
         }
      case "FETCH_ERROR":
         return{
            loading: false,
            InseminationData: null,
            error: true
         }
      case "UPDATE":
         return{
            loading: false,
            InseminationData: action.payload,
            error: false
         }
      default : 
         return state
   }
}