import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empData } from 'src/app/dataUtil';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage'

@Component({
  selector: 'app-add-emp-data',
  templateUrl: './add-emp-data.component.html',
  styleUrls: ['./add-emp-data.component.css']
})
export class AddEmpDataComponent implements OnInit {

  empId!: number
  empName!: string
  empAge!: number
  empArray!: empData[]
  empObj = new empData()
  constructor(private router: Router, private localStore: LocalStorageService, private sessionStore: SessionStorageService) {
    if(this.localStore.retrieve("hasCodeRunBefore1") === null){
      this.empArray = [];
      this.localStore.store("hasCodeRunBefore1", true);
      this.localStore.store("currEmpID", 0);
    }
    else{
      this.empArray = this.localStore.retrieve("empArray");
    }

  }

  ngOnInit(): void {
    if(this.sessionStore.retrieve("fromEditEmployee") === false){
      this.empId = this.localStore.retrieve("currEmpID") + 1
      this.localStore.store("currEmpID", this.empId);
    }
    else{
      this.empObj = this.sessionStore.retrieve("empObjectToEdit")
      this.empId = this.empObj.id
      this.empName = this.empObj.name
      this.empAge = this.empObj.age
      this.sessionStore.store("fromEditEmployee", false)
    }
  }

  onClickSubmit(){
    const emp = {
      id: this.empId,
      name: this.empName,
      age: this.empAge
    }
    this.empArray.push(emp);
    this.localStore.store("empArray", this.empArray);
  }

  redirect(check: string){
    if(check === 'noSubmission')
    {
      this.localStore.store("currEmpID", this.localStore.retrieve('currEmpID')-1)
    }
    this.router.navigate(['/employee'])
  }
}
