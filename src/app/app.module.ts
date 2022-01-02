import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './MyComponents/employee/employee.component';
import { DepartmentComponent } from './MyComponents/department/department.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { FormsModule } from '@angular/forms';
import { AddEmpDataComponent } from './MyComponents/add-emp-data/add-emp-data.component';
import { AddDeptDataComponent } from './MyComponents/add-dept-data/add-dept-data.component';

import { AuthguardService } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './MyComponents/auth-callback/auth-callback.component';
import { BaseComponent } from './MyComponents/base/base.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent,
    HomeComponent,
    AddEmpDataComponent,
    AddDeptDataComponent,
    AuthCallbackComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [AuthguardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
