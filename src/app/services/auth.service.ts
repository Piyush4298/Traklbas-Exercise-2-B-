import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { AppConstants } from '../constants/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user!: User;

  constructor() { 
    this.manager.getUser().then(user =>{
      this.user = user!;
    })
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    if ((this.user) == null) {
      return null;
    }
    else {
      return this.user.profile == null ? '' : this.user.profile;
    }
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<any> {
    return this.manager.signinRedirect().then(data =>{
      sessionStorage.setItem("STAGE", AppConstants.AUTHENTICATION_STAGES.STARTED_AUTHENTICATION);
    });
  }

  completeAuthentication(): Promise<any> {
    return this.manager.signinRedirectCallback().then(user => {
        this.user = user;
        sessionStorage.setItem("STAGE", AppConstants.AUTHENTICATION_STAGES.COMPLETE_AUTHENTICATION);
        sessionStorage.setItem('expires_at', this.user.expires_at.toString());
    });
  }
  
  logout(){
    sessionStorage.setItem("STAGE", AppConstants.AUTHENTICATION_STAGES.SIGN_OUT);
    this.manager.removeUser().then(d=>{
      this.manager.signoutRedirect();
      this.manager.signoutRedirectCallback().then(x=>{
        sessionStorage.setItem("STAGE", AppConstants.AUTHENTICATION_STAGES.SIGNED_OUT);
        //this.startAuthentication();
      });
    });
  }
}

export function getClientSettings(): UserManagerSettings{
  return {
    "authority": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_iePaYk3wU/",
    "redirect_uri": "https://localhost:4201/auth-callback",
    "post_logout_redirect_uri": "https://localhost:4201/home",
	  "client_id": "60heaf1oc6mr4l21khcl66gd52",
    "response_type": "code",
    "scope": "openid profile email aws.cognito.signin.user.admin",
    "filterProtocolClaims": true,
    "loadUserInfo": true,
    "automaticSilentRenew": true,
    "includeIdTokenInSilentRenew": true,
    "revokeAccessTokenOnSignout": true
  };
}
