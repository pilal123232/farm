export const INITIAL_STATE = {
   loading: false,
   ProductionData: [],
   error: false
}

export const ProductionData = (state , action) =>{
   switch(action.type){
      case "FETCH_START":
         return{
            loading: true,
            ProductionData: [],
            error: false
         }
      case "FETCH_SUCCESS":
         return{
            loading: false,
            ProductionData: action.payload,
            error: false
         }
      case "FETCH_ERROR":
         return{
            loading: false,
            ProductionData: [],
            error: true
         }
      default : 
         return state
   }
}