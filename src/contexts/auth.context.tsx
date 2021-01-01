import React, { useReducer, useEffect, useState, createContext, useRef } from 'react';
import { IUser } from '../models/user';
import { firebaseAuth, Firebase } from '../utils/firebase';

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

let refreshTokenTimer: number;
// let remainingTimeTimer: number;

const loginAction = (dispatch: React.Dispatch<AuthAction>, userData: IUser) => {
    dispatch({
        type: AuthActionType.LOGIN,
        payload: userData,
    });
};

const logoutAction = (dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
        type: AuthActionType.LOGOUT,
    });
}

export const AuthProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    const [loading, setLoading] = useState(true);
    const [tokenExpirationTime, setTokenExpirationTime] = useState<Date>(new Date(new Date().getTime() + 1000 * 60 * 10));
    const shouldForceRefreshToken = useRef(false);

    const handleUserAuthState = async (user: Firebase.User | null) => {
        setLoading(true);

        if (!user) {
            logoutAction(dispatch);
            setLoading(false);
            return;
        }

        const idTokenResult = await user.getIdTokenResult(shouldForceRefreshToken.current);

        const expiryTime = new Date(idTokenResult.expirationTime);
        setTokenExpirationTime(expiryTime);

        loginAction(dispatch, {
            name: user.displayName || '',
            email: user.email || '',
            token: idTokenResult.token,
            signInProvider: idTokenResult.signInProvider || '',
        });

        setLoading(false);

        refreshTokenTimer = setTimeout(() => {
            console.log(`refreshing token: ${new Date().toLocaleString()}`);
            shouldForceRefreshToken.current = true;
            handleUserAuthState(user);
        }, 59 * 60 * 1000);
    }

    useEffect(() => {
        const unsubscribeAuth = firebaseAuth.onIdTokenChanged(async user => {
            await handleUserAuthState(user);
        })

        return function cleanUp() {
            unsubscribeAuth();
            clearTimeout(refreshTokenTimer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(`token: ${state.user?.token}`);
    }, [state.user?.token]);

    useEffect(() => {
        console.log(`expiry time: ${tokenExpirationTime.toLocaleString()}`);
    }, [tokenExpirationTime]);

    const value: IAuthContext = { state, dispatch, loading, setLoading };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}