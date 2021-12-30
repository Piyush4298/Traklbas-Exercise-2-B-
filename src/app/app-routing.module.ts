import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddDeptDataComponent } from './MyComponents/add-dept-data/add-dept-data.component';
import { AddEmpDataComponent } from './MyComponents/add-emp-data/add-emp-data.component';
import { AuthCallbackComponent } from './MyComponents/auth-callback/auth-callback.component';
import { DepartmentComponent } from './MyComponents/department/department.component';
import { EmployeeComponent } from './MyComponents/employee/employee.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { AuthguardService } from './services/authguard.service';
//import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService]},
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthguardService]},
  { path: 'department', component: DepartmentComponent, canActivate: [AuthguardService] },
  { path: 'addEmpData', component: AddEmpDataComponent, canActivate: [AuthguardService]},
  { path: 'addDeptData', component: AddDeptDataComponent, canActivate: [AuthguardService]}
  // { path: 'home', component: HomeComponent},
  // { path: 'auth-callback', component: AuthCallbackComponent },
  // { path: 'employee', component: EmployeeComponent},
  // { path: 'department', component: DepartmentComponent},
  // { path: 'addEmpData', component: AddEmpDataComponent},
  // { path: 'addDeptData', component: AddDeptDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
