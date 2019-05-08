import React from 'react';

const AuthContext = React.createContext({
    status: false,
    login: null
});

export default AuthContext;