import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppConstants } from '../constants/AppConstants';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private authService: AuthService){ }

  canActivate(): boolean {
    let expires_at = sessionStorage.getItem('expires_at');
    let current_date = Math.floor(Number(Date.now().toString()) / 1000);
    let expires_at_number = expires_at!=null? Number(expires_at) : 0;

    let stage = sessionStorage.getItem("STAGE"); 
    if(this.authService.isLoggedIn()) {
      return true;
    }
    else{
      expires_at_number = 0;
    }

    if(stage!=null && stage == AppConstants.AUTHENTICATION_STAGES.STARTED_AUTHENTICATION){
      this.authService.completeAuthentication();
    }
    else if(stage== AppConstants.AUTHENTICATION_STAGES.STARTED_AUTHENTICATION){
      return true;
    }
    else if(stage==null || (stage!=null && (stage == AppConstants.AUTHENTICATION_STAGES.SIGNED_OUT || (current_date > expires_at_number)))){
      this.authService.startAuthentication();
    }
    
    return false;
  }
}
