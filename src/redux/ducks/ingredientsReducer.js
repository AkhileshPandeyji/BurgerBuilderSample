export const ADD_INGREDIENT = 'BurgerBuilder/ingredients/ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'BurgerBuilder/ingredients/REMOVE_INGREDIENT';

export const addIngredient = (ingType) => {
    return {
        type: ADD_INGREDIENT,
        ingType: ingType
    };
}
export const removeIngredient = (ingType) => {
    return {
        type: REMOVE_INGREDIENT,
        ingType: ingType
    };
}

const initState = {
  Salad: 0,
  Bacon: 0,
  Cheese: 0,
  ChickenPatty: 0,
};

const ingredientsReducer = (state = initState, action) => {
    let newState = {};
    switch (action.type) {
        case ADD_INGREDIENT:
            newState = { ...state };
            newState[action.ingType] = state[action.ingType] + 1;
            // console.log("ADD")
            return newState;
        case REMOVE_INGREDIENT:
            newState = { ...state };
            if (state[action.ingType] !== 0)
                newState[action.ingType] = state[action.ingType] - 1;
            // console.log("remove")
            return newState;
        default:
            return state;
    }
}

export default ingredientsReducer;
