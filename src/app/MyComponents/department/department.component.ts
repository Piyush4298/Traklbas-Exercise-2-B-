import { Component, OnInit } from '@angular/core';
import { DepartmentData} from 'src/app/dataUtil';
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


  page: number = 1
  totalPages: number = 1
  numberOfRecordsPerPage: number = 5

  constructor(private router: Router) {
    super() // calling constructor of base class
  }


   ngOnInit(){
    if(localStorage.getItem("currPageDept") === null){
      localStorage.setItem("currPageDept", JSON.stringify(1))
    }

    // Setting the fromEditDepartment variable false
    sessionStorage.setItem("fromEditDepartment", JSON.stringify(false));

  
    this.totalDeptData = JSON.parse(localStorage.getItem("deptArray") || "[]")
    this.setPageData()
  }

  setPageData() {
    this.totalPages = Math.ceil(this.totalDeptData.length/this.numberOfRecordsPerPage)
    this.page = JSON.parse(localStorage.getItem("currPageDept")||'1')

    // calling Generic paginate funtion to obtain trimmed data in correspondance to page number.
    this.deptData = this.paginate(this.totalDeptData, this.page, this.numberOfRecordsPerPage)
  }
  

  /** Pagination Helper Functions */
  first(pageLabel: string){
    this.firtPage(pageLabel, this.page)
    this.setPageData()
  }

  prev(pageLabel: string){
    this.prevPage(pageLabel, this.page)
    this.setPageData()
  }

  next(pageLabel: string){
    this.nextPage(pageLabel, this.page, this.totalPages)
    this.setPageData()

  }

  last(pageLabel: string){
    this.lastPage(pageLabel, this.page, this.totalPages)
    this.setPageData()
  }

  /**
   * Sort function
   * @param key Column name according to which data is to be sorted.
   */
   sort(key: string){
    const arr = this.sortData(this.totalDeptData, key)
    this.deptData = arr
  }

  /**
   * Search function
   */
   search(){
    this.totalDeptData = this.searchData(this.totalDeptData, this.filter)
    this.setPageData()
  }

  clear(){
    this.filter = ''
    this.totalDeptData = JSON.parse(localStorage.getItem("deptArray") || "[]")
    this.setPageData()
  }

  /**
   * Delete Function
   * @param dept Department object which is to be deleted.
   */
  onDelete(dept: DepartmentData, arrayName: string){
    this.deleteData(this.totalDeptData, dept, arrayName)
    this.setPageData()
  }

  /**
   * Edit Function
   * @param dept Department object which is to be edited.
   */
  onEdit(dept: DepartmentData){
    const idx = this.totalDeptData.indexOf(dept)
    this.totalDeptData.splice(idx, 1)
    sessionStorage.setItem("deptObjectToEdit", JSON.stringify(dept))
    sessionStorage.setItem("fromEditDepartment", JSON.stringify(true))
    this.router.navigate(['/addDeptData'])
  }

}
