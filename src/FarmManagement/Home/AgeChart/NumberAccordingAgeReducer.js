export const INITIAL_STATE = {
   loading: false,
   NumberAccordingAge: [],
   error: false
}

export const NumberAccordingAge = (state , action) =>{
   switch(action.type){
      case "FETCH_START":
         return{
            loading: true,
            NumberAccordingAge: [],
            error: false
         }
      case "FETCH_SUCCESS":
         return{
            loading: false,
            NumberAccordingAge: action.payload,
            error: false
         }
      case "FETCH_ERROR":
         return{
            loading: false,
            NumberAccordingAge: [],
            error: true
         }
      default : 
         return state
   }
}