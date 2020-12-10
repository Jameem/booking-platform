export const initialState = {
  user: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    // Setup the token and application state
    case "SET_USER":
      if (action.user) localStorage.setItem("token", action?.user?.uid)
      else localStorage.removeItem("token")

      return {
        ...state,
        user: action.user,
      }

    default:
      return state
  }
}

export default reducer
