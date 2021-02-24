export const START_LOAD = "BurgerBuilder/overallui/START_LOAD";
export const STOP_LOAD = "BurgerBuilder/overallui/STOP_LOAD";

export const startLoad = () => {
    return {
        type:START_LOAD
    }
}

export const stopLoad = () => {
    return {
        type:STOP_LOAD
    }
}

const initialState = {
    isLoading:false
}

const overallUIReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOAD:
            return { ...state, isLoading: true };
        case STOP_LOAD:
            return { ...state, isLoading: false };
        default:
            return state;
    }    
}

export default overallUIReducer;
