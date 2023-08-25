const { createContext, useReducer } = require("react");

export const UserContext = createContext();

const initialState = {
    access_token: localStorage.getItem("access_token") ?? "",
    user: JSON.parse(localStorage.getItem("user")) ?? {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("access_token", action.payload.access_token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                access_token: action.payload.access_token,
                user: action.payload.user
            }
        case 'LOGOUT':
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            return {
                access_token: "",
                user: {}
            }
        default:
            return state
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;