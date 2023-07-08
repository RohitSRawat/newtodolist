import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import {wpadmin,checkverify} from '../actions'
import { useDispatch,useSelector  } from "react-redux";
import { useNavigate } from "react-router-dom";







const Loginpage = () => {

  const checklog = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    
    dispatch(checkverify(navigate));
  }, []);


    return(
      <div>
      <GoogleOAuthProvider clientId="1027281901111-9jqpa7b2okt48raiug52eae8u1t0rfhl.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
            console.log(USER_CREDENTIAL);
            const {email,name,picture} = USER_CREDENTIAL
            console.log({email,name,picture})
            dispatch(wpadmin({email,name,picture},navigate))
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div> 
    )
}
export default Loginpage
