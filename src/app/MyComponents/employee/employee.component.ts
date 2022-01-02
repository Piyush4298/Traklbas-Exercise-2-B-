import { Component, OnInit } from '@angular/core';
import { EmployeeData } from 'src/app/dataUtil';
import { faSort, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends BaseComponent<EmployeeData> implements OnInit {

  /* font-awesome Icons */
  sortIcon = faSort
  singleArrowLeft = faChevronLeft
  singleArrowRight = faChevronRight
  doubleArrowLeft = faAngleDoubleLeft
  doubleArrowRight = faAngleDoubleRight

  totalEmpData: EmployeeData[] = []
  empData: EmployeeData[] = []
  
  filter: any

  page: number = 1
  totalPages: number = 1
  numberOfRecordsPerPage: number = 5 

  
  constructor(private router: Router) {
    super() // calling constructor of base class
  }


    ngOnInit(){
    if(localStorage.getItem("currPageEmp") === null){
      localStorage.setItem("currPageEmp", JSON.stringify(1))
    }
  
    // Setting the fromEditEmployee variable false
    sessionStorage.setItem("fromEditEmployee", JSON.stringify(false));
    this.totalEmpData = JSON.parse(localStorage.getItem("empArray") || "[]")

    this.setPageData();
  }

  setPageData(){
    this.totalPages = Math.ceil(this.totalEmpData.length/this.numberOfRecordsPerPage)
    this.page = JSON.parse(localStorage.getItem("currPageEmp")||'1')

    // calling Generic paginate funtion to obtain trimmed data in correspondance to page number.
    this.empData = this.paginate(this.totalEmpData, this.page, this.numberOfRecordsPerPage)
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
    const arr = this.sortData(this.totalEmpData, key)
    this.empData = arr
  }

  /**
   * Search function
   */
  search(){
    this.totalEmpData = this.searchData(this.totalEmpData, this.filter)
    this.setPageData()
  }

  clear(){
    this.filter = ''
    this.totalEmpData = JSON.parse(localStorage.getItem("empArray") || "[]")
    this.setPageData()
  }

  /**
   * Delete Function
   * @param emp Employee object which is to be deleted.
   */
  onDelete(emp: EmployeeData, arrayName: string){
    this.deleteData(this.totalEmpData, emp, arrayName)
    this.setPageData()
  }

  /**
   * Edit Function
   * @param emp Employee object which is to be edited.
   */
  onEdit(emp: EmployeeData){
    const idx = this.totalEmpData.indexOf(emp)
    this.totalEmpData.splice(idx, 1)
    sessionStorage.setItem("empObjectToEdit", JSON.stringify(emp))
    sessionStorage.setItem("fromEditEmployee", JSON.stringify(true))
    this.router.navigate(['/addEmpData'])
  }
}