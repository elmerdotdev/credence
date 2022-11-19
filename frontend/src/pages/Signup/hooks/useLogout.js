import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    //update global state and delate token from local strage
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch(送る)　logout action
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}