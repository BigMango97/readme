const isLogin = (accessToken:string) => {

  let loggedIn = false
  
  if (accessToken) {
    loggedIn = true
  } 
 
return loggedIn
};

export default isLogin;