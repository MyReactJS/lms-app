// return the user data from the session storage
export const getUser = () => {
    const userStr = [];
    userStr.id = sessionStorage.getItem('id');
    userStr.name = sessionStorage.getItem('user');
    userStr.password = sessionStorage.getItem('password');
    userStr.dob = sessionStorage.getItem('dob');
    userStr.type = sessionStorage.getItem('usertype');
    userStr.address = sessionStorage.getItem('useraddress');
    userStr.email = sessionStorage.getItem('useremail');
    userStr.phonenum = sessionStorage.getItem('phonenum');
    return userStr;
}
export const getUserAuthenticationStatus = () => {
    const authenticated = sessionStorage.getItem('userauthenticated');
    return authenticated;
}
// return the token from the session storage
export const getToken = () => {
    //return sessionStorage.getItem('token') || null;
    return "dfdfdsf";
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (id, name,password,dob, type,address, email, phonenum) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('user', name);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('dob', dob);
    sessionStorage.setItem('usertype', type);
    sessionStorage.setItem('useraddress', address);
    sessionStorage.setItem('useremail', email);
    sessionStorage.setItem('phonenum', phonenum);


}

export const setUserAuthenticationStatus = (userauthenticated) => {
    return sessionStorage.setItem('userauthenticated', userauthenticated);
}