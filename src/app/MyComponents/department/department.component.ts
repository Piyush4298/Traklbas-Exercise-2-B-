import { Component, OnInit } from '@angular/core';
import { DepartmentData} from 'src/app/dataUtil';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { faSort, faAngleDoubleRight, faAngleDoubleLeft, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent extends BaseComponent<DepartmentData> implements OnInit {

  sortIcon = faSort
  singleArrowLeft = faChevronLeft
  singleArrowRight = faChevronRight
  doubleArrowLeft = faAngleDoubleLeft
  doubleArrowRight = faAngleDoubleRight


  totalDeptData: DepartmentData[] = []
  deptData: DepartmentData[] = []
  
  filter: any
  fromSearch: boolean = false

  sortOrder : boolean = true

  page: number = 1
  totalPages: number = 1
  numberOfRecordsPerPage: number = 5

  constructor(private localStore: LocalStorageService, private sessionStore: SessionStorageService, private router: Router) {
    super() // calling constructor of base class
  }


  override ngOnInit(){
    if(this.localStore.retrieve("currPageDept") === null){
      this.localStore.store("currPageDept", 1)
    }

    // Setting the fromEditDepartment variable false
    this.sessionStore.store("fromEditDepartment", false);

    // If ngOnInit() called from search function
    if(!this.fromSearch){
      this.totalDeptData = this.localStore.retrieve("deptArray")
    }

    this.totalPages = Math.ceil(this.totalDeptData.length/this.numberOfRecordsPerPage)
    this.page = this.localStore.retrieve("currPageDept")

    // calling Generic paginate funtion to obtain trimmed data in correspondance to page number.
    this.deptData = this.paginate(this.totalDeptData, this.page, this.numberOfRecordsPerPage)
  }

  /** Pagination Helper Functions */
  first(){
    if(this.page > 1){
      this.localStore.store("currPageDept", 1)
      this.ngOnInit()
    }
  }

  prev(){
    if(this.page > 1){
      this.localStore.store("currPageDept", this.page - 1)
      this.ngOnInit()
    }
  }

  next(){
    if(this.page < this.totalPages){
      this.localStore.store("currPageDept", this.page + 1)
      this.ngOnInit()
    }
  }

  last(){
    if(this.page < this.totalPages){
      this.localStore.store("currPageDept", this.totalPages)
      this.ngOnInit()
    }
  }

  /**
   * Sort function
   * @param key Column name according to which data is to be sorted.
   */
   sort(key: string){
    const arr = this.sortData(this.totalDeptData, this.sortOrder, key)
    this.sortOrder = !this.sortOrder
    this.localStore.store("deptArray", arr)
    this.ngOnInit()
  }

  /**
   * Search function
   */
   search(){
    this.totalDeptData = this.searchData(this.totalDeptData, this.filter)
    this.fromSearch = true
    this.ngOnInit()
  }

  clear(){
    this.filter = ''
    this.fromSearch = false;
    this.ngOnInit()
  }

  /**
   * Delete Function
   * @param dept Department object which is to be deleted.
   */
  onDelete(dept: any){
    if(confirm(`Do you want to delete this record of ${dept.name}`))
    {
      this.totalDeptData = this.deleteData(this.totalDeptData, dept)
      this.localStore.store("deptArray", this.totalDeptData)
      this.ngOnInit()
    }
  }

  /**
   * Edit Function
   * @param dept Department object which is to be edited.
   */
  onEdit(dept: any){
    const idx = this.totalDeptData.indexOf(dept)
    this.totalDeptData.splice(idx, 1)
    this.sessionStore.store("deptObjectToEdit", dept)
    this.sessionStore.store("fromEditDepartment", true);
    this.router.navigate(['/addDeptData'])
  }

}
