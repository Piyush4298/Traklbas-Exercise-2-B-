import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

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
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  async completeAuthentication(): Promise<void> {
    const user = await this.manager.signinRedirectCallback();
    this.user = user;
  }
  
  logout(){
    this.manager.signoutRedirect();
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
