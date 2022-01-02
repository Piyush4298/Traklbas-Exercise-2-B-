import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentData } from 'src/app/dataUtil';

@Component({
  selector: 'app-add-dept-data',
  templateUrl: './add-dept-data.component.html',
  styleUrls: ['./add-dept-data.component.css']
})
export class AddDeptDataComponent implements OnInit {

  deptId!: number
  deptName!: string
  deptArray!: DepartmentData[]
  deptObj = new DepartmentData()
  
  constructor(private router: Router) {
    if(localStorage.getItem("hasCodeRunBefore2") === null ){
      this.deptArray = [];
      localStorage.setItem("hasCodeRunBefore2", JSON.stringify(true))
      localStorage.setItem("currDeptId", JSON.stringify(0))
    }
    else{
      this.deptArray = JSON.parse(localStorage.getItem("deptArray") || "[]");
    }

  }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem("fromEditDepartment")|| '') === false){
      this.deptId = +JSON.parse(localStorage.getItem("currDeptID")||'0') + 1
      localStorage.setItem("currDeptID", JSON.stringify(this.deptId));
    }
    else{
      this.deptObj = JSON.parse(sessionStorage.getItem("deptObjectToEdit")||'')
      this.deptId = this.deptObj.id
      this.deptName = this.deptObj.name
      sessionStorage.setItem("fromEditDepartment", JSON.stringify(false))
    }
  }

  onClickSubmit(){
    const dept = {
      id: this.deptId,
      name: this.deptName,
    }
    this.deptArray.push(dept)
    localStorage.setItem("deptArray", JSON.stringify(this.deptArray))
  }

  redirect(check: string){
    if(check === 'noSubmission')
    {
      localStorage.setItem("currDeptID", JSON.stringify(JSON.parse(localStorage.getItem('currDeptID')||'')-1))
    }
    this.router.navigate(['/department'])
  }
}