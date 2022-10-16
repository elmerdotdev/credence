import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state

    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    //Let React check localstrage when first render.....if "user" is not exist into localstrage, it return null = not signed in
    //Localstrageを最初のRender時にReactに確認させる・もしUserがあれば、JSONのものをJS仕様に変える。Userがlocal strageになければNullを返す
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({ type: 'LOGIN', payload: user })
        }
    },[])
    console.log('AuthContext state: ', state )

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}


//</AuthContext.Provider> でApp.jsのrootをwrapする そうすることで、Login時のみDashboardがdisplayされる