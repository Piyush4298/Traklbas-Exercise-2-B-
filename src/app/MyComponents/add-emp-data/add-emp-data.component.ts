import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/dataUtil';


@Component({
  selector: 'app-add-emp-data',
  templateUrl: './add-emp-data.component.html',
  styleUrls: ['./add-emp-data.component.css']
})
export class AddEmpDataComponent implements OnInit {

  empId!: number
  empName!: string
  empAge!: number
  empArray!: EmployeeData[]
  empObj = new EmployeeData()

  constructor(private router: Router) {
    if(localStorage.getItem("hasCodeRunBefore1") === null ){
      this.empArray = [];
      localStorage.setItem("hasCodeRunBefore1", JSON.stringify(true))
      localStorage.setItem("currEmpId", JSON.stringify(0))
    }
    else{
      this.empArray = JSON.parse(localStorage.getItem("empArray") || "[]");
    }

  }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem("fromEditEmployee")|| '') === false){
      
      this.empId = +JSON.parse(localStorage.getItem("currEmpID")||'0') + 1
      localStorage.setItem("currEmpID", JSON.stringify(this.empId));
    }
    else{
      this.empObj = JSON.parse(sessionStorage.getItem("empObjectToEdit")||'')
      this.empId = this.empObj.id
      this.empName = this.empObj.name
      this.empAge = this.empObj.age
      sessionStorage.setItem("fromEditEmployee", JSON.stringify(false))
    }
  }

  onClickSubmit(){
    const emp = {
      id: this.empId,
      name: this.empName,
      age: this.empAge
    }
    this.empArray.push(emp);
    localStorage.setItem("empArray", JSON.stringify(this.empArray))
  }

  redirect(check: string){
    if(check === 'noSubmission')
    {
      localStorage.setItem("currEmpID", JSON.stringify(JSON.parse(localStorage.getItem("currEmpID")||'')-1))
    }
    this.router.navigate(['/employee'])
  }
}