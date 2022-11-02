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

    //Localstrageを最初のRender時にReactに確認させる・もしUserがあれば、JSONのものをJS仕様に変える。Userがlocal strageになければNullを返す
    //let React check local strage at first render. if User info exist, show dashboard.
    //if user is not exist into localstrage, return Null.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({ type: 'LOGIN', payload: user })
        }
    },[])
    // console.log('AuthContext state:', state )

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}


//</AuthContext.Provider> でApp.jsのrootをwrapする
//Wrap root into App.js with </AuthContext.Provider> 
