import { Component, OnInit } from '@angular/core';
import { empData, functionUtils } from 'src/app/dataUtil';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { faSort, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends functionUtils implements OnInit {

  /* font-awesome Icons */
  sortIcon = faSort
  singleArrowLeft = faChevronLeft
  singleArrowRight = faChevronRight
  doubleArrowLeft = faAngleDoubleLeft
  doubleArrowRight = faAngleDoubleRight

  totalEmpData: empData[] = []
  empData: empData[] = []
  
  filter: any
  fromSearch: boolean = false

  sortOrder : boolean = true

  page: number = 1
  totalPages: number = 1
  numberOfRecordsPerPage: number = 5 

  
  constructor(private localStore: LocalStorageService, private sessionStore: SessionStorageService, private router: Router) {
    super() // calling constructor of base class
  }


  ngOnInit(){
    if(this.localStore.retrieve("currPageEmp") === null){
      this.localStore.store("currPageEmp", 1)
    }
    // Setting the fromEditEmployee variable false
    this.sessionStore.store("fromEditEmployee", false);

    // If ngOnInit() called from search function
    if(!this.fromSearch){
      this.totalEmpData = this.localStore.retrieve("empArray")
    }

    this.totalPages = Math.ceil(this.totalEmpData.length/this.numberOfRecordsPerPage)
    this.page = this.localStore.retrieve("currPageEmp")

    // calling Generic paginate funtion to obtain trimmed data in correspondance to page number.
    this.empData = this.paginate(this.totalEmpData, this.page, this.numberOfRecordsPerPage)
  }

  /** Pagination Helper Functions */
  first(){
    if(this.page > 1){
      this.localStore.store("currPageEmp", 1)
      this.ngOnInit()
    }
  }

  prev(){
    if(this.page > 1){
      this.localStore.store("currPageEmp", this.page - 1)
      this.ngOnInit()
    }
  }

  next(){
    if(this.page < this.totalPages){
      this.localStore.store("currPageEmp", this.page + 1)
      this.ngOnInit()
    }
  }

  last(){
    if(this.page < this.totalPages){
      this.localStore.store("currPageEmp", this.totalPages)
      this.ngOnInit()
    }
  }

  /**
   * Sort function
   * @param key Column name according to which data is to be sorted.
   */
  sort(key: string){
    const arr = this.sortData(this.totalEmpData, this.sortOrder, key)
    this.sortOrder = !this.sortOrder
    this.localStore.store("empArray", arr)
    this.ngOnInit()
  }

  /**
   * Search function
   */
  search(){
    this.totalEmpData = this.searchData(this.totalEmpData, this.filter)
    this.fromSearch = true
    this.ngOnInit()
  }

  clear(){
    this.filter = ''
    this.fromSearch = false
    this.ngOnInit()
  }

  /**
   * Delete Function
   * @param emp Employee object which is to be deleted.
   */
  onDelete(emp: any){
    if(confirm(`Do you want to delete this record of Mr./Mrs. ${emp.name}`))
    {
      this.totalEmpData = this.deleteData(this.totalEmpData, emp)
      this.localStore.store("empArray", this.totalEmpData)
      this.ngOnInit()
    }
  }

  /**
   * Edit Function
   * @param emp Employee object which is to be edited.
   */
  onEdit(emp: any){
    const idx = this.totalEmpData.indexOf(emp)
    this.totalEmpData.splice(idx, 1)
    this.sessionStore.store("empObjectToEdit", emp)
    this.sessionStore.store("fromEditEmployee", true);
    this.router.navigate(['/addEmpData'])
  }
}
