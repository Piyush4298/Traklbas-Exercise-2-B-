import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentData } from 'src/app/dataUtil';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

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
  constructor(private router: Router, private localStore: LocalStorageService, private sessionStore: SessionStorageService) {
    if(this.localStore.retrieve("hasCodeRunBefore2") === null){
      this.deptArray = [];
      this.localStore.store("hasCodeRunBefore2", true);
      this.localStore.store("currDeptID", 0);
    }
    else{
      this.deptArray = this.localStore.retrieve("deptArray");
    }

  }

  ngOnInit(): void {
    if(this.sessionStore.retrieve("fromEditDepartment") === false){
      this.deptId = this.localStore.retrieve("currDeptID") + 1
      this.localStore.store("currDeptID", this.deptId);
    }
    else{
      this.deptObj = this.sessionStore.retrieve("deptObjectToEdit")
      this.deptId = this.deptObj.id
      this.deptName = this.deptObj.name
      this.sessionStore.store("fromEditDepartment", false)
    }
  }

  onClickSubmit(){
    const dept = {
      id: this.deptId,
      name: this.deptName,
    }
    this.deptArray.push(dept);
    this.localStore.store("deptArray", this.deptArray);
  }

  redirect(check: string){
    if(check === 'noSubmission')
    {
      this.localStore.store("currDeptID", this.localStore.retrieve('currDeptID')-1)
    }
    this.router.navigate(['/department'])
  }

}
