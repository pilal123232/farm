export const INITIAL_STATE = {
   loading: false,
   GenderNumber: [],
   error: false
}

export const Gender = (state , action) =>{
   switch(action.type){
      case "FETCH_START":
         return{
            loading: true,
            GenderNumber: [],
            error: false
         }
      case "FETCH_SUCCESS":
         return{
            loading: false,
            GenderNumber: action.payload,
            error: false
         }
      case "FETCH_ERROR":
         return{
            loading: false,
            GenderNumber: [],
            error: true
         }
      default : 
         return state
   }
}