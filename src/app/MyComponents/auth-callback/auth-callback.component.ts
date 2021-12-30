import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/AppConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //this.authService.completeAuthentication();

    if(sessionStorage.getItem("STAGE") != null && sessionStorage.getItem("STAGE") == AppConstants.AUTHENTICATION_STAGES.COMPLETE_AUTHENTICATION){
      this.router.navigate(['/home']);
    }else if(sessionStorage.getItem("STAGE") != null && sessionStorage.getItem("STAGE") == AppConstants.AUTHENTICATION_STAGES.STARTED_AUTHENTICATION){
      this.authService.completeAuthentication().then(x=>{
        this.router.navigate(['/home']);
      });
    }else if(sessionStorage.getItem("STAGE")!=null && sessionStorage.getItem("STAGE") == AppConstants.AUTHENTICATION_STAGES.SIGNED_OUT){
      //this.authService.logout();
    }
  }

}
