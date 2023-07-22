export const INITIAL_STATE = {
   loading: false,
   CowData: [],
   error: false
}

export const CowDataReducer = (state , action) =>{
   switch(action.type){
      case "FETCH_START":
         return{
            loading: true,
            CowData: [],
            error: false
         }
      case "FETCH_SUCCESS":
         return{
            loading: false,
            CowData: action.payload,
            error: false
         }
      case "FETCH_ERROR":
         return{
            loading: false,
            CowData: null,
            error: true
         }
      case "UPDATE":
      return{
         loading: false,
         CowData: action.payload,
         error: false
      }
      default : 
         return state
   }
}