import React, { useReducer, useEffect, useState, createContext } from 'react';
import { IUser } from '../models/user';
import { firebaseAuth } from '../utils/firebase';

export interface AuthState {
    user: IUser | undefined;
}

const INITIAL_STATE: AuthState = {
    user: undefined,
};

export enum AuthActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

interface LoginAction {
    type: AuthActionType.LOGIN,
    payload: IUser;
}

interface LogoutAction {
    type: AuthActionType.LOGOUT,
}

type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: AuthState = INITIAL_STATE, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActionType.LOGOUT:
            return {
                ...state,
                user: undefined,
            };
        default:
            return state;
    }
}

interface IAuthContext {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
    state: {
        user: undefined,
    },
    dispatch: () => null,
    loading: true,
    setLoading: () => null,
});

export const AuthProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = firebaseAuth.onAuthStateChanged(async user => {
            setLoading(true);

            if (!user) {
                dispatch({
                    type: AuthActionType.LOGOUT,
                });

                setLoading(false);
                return;
            }
            
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: AuthActionType.LOGIN,
                payload: {
                    name: user.displayName || '',
                    email: user.email || '',
                    token: idTokenResult.token,
                },
            });

            setLoading(false);
        });

        return function cleanUp() {
            unsubscribeAuth();
        }
    }, []);

    const value: IAuthContext = { state, dispatch, loading, setLoading };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}