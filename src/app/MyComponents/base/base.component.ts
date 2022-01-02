import { Component, OnInit } from '@angular/core';
import { ModelBase } from 'src/app/dataUtil';

@Component({
  selector: 'app-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
export class BaseComponent<TModel extends ModelBase> {

    sortOrder : boolean = true
    constructor() { }


    /**
     * Pagiantion Data Extraction
     * @param objArray Array of objects.
     * @param page Page number .
     * @param numberOfRecords Number of records per page.
     * @returns Data(Array of objects) extracted for particular page number.
     */
    public paginate(objArray:Array<TModel>, page:number, numberOfRecords: number) : Array<TModel>{

        const trimStart = (page - 1) * numberOfRecords
        const trimEnd = trimStart + numberOfRecords
        const trimmedData = objArray.slice(trimStart, trimEnd)
        return trimmedData
    }

    ///////////////////// Pagination helper function /////////////////////////
    /**
     * 
     * @param pageLabel Localstorage key name
     * @param page Page number
     */
    firtPage(pageLabel: string, page: number): void{
        if(page > 1){
            localStorage.setItem(pageLabel, JSON.stringify(1))
        }
    }

    /**
     * 
     * @param pageLabel Localstorage key name
     * @param page Page number
     */
    prevPage(pageLabel: string, page: number){
        if(page > 1){
            localStorage.setItem(pageLabel, JSON.stringify(page - 1))
        }
    }

    /**
     * 
     * @param pageLabel Localstorage key name
     * @param page Page number
     * @param totalPages number of pages
     */
    nextPage(pageLabel: string, page: number, totalPages: number){
        if(page < totalPages){
            localStorage.setItem(pageLabel, JSON.stringify(page + 1))
        }
    }

    /**
     * 
     * @param pageLabel Localstorage key name
     * @param page Page number
     * @param totalPages number of pages
     */
    lastPage(pageLabel: string, page: number, totalPages: number){
        if(page < totalPages){
            localStorage.setItem(pageLabel, JSON.stringify(totalPages))
        }
    }
    /////////////////////////////////////////////////////////////////////////

    /**
     * Sort Function
     * @param objArray Array of objects.
     * @param sortOrder order(ascending/descending) to sort data.
     * @param key Column name according to which data is to be sorted.
     * @returns sorted array of objects
     */
    public sortData(objArray:Array<any>, key = 'id'): Array<TModel>{
        /** If passed key is a numerical parameter*/
        if(typeof objArray[0][key] === "number"){
            if(this.sortOrder){
                objArray.sort((a, b)=>{
                    return a[key] - b[key]
                })
            }
            else{
                objArray.sort((a, b)=>{
                    return b[key] - a[key]
                })
            }
        }
        /** If passed key is a string parameter*/
        else if(typeof objArray[0][key] === "string"){
            if(this.sortOrder){
                objArray.sort((a, b)=>{
                    if (a[key] < b[key]) return -1
                    return a[key] > b[key] ? 1 : 0
                })
            }
            else{
                objArray.sort((a, b)=>{
                    if (a[key] > b[key]) return -1
                    return a[key] < b[key] ? 1 : 0
                })
            }
        }

        this.sortOrder = !this.sortOrder
        return objArray
    }

    /**
     * Search Function
     * @param objArray Array of objects.
     * @param searchValue value to be searched in given array of objects.
     * @returns resultant array with matching values.
     */
    public searchData(objArray:Array<any>, searchValue: string): Array<TModel>{
        const searchRegExp = new RegExp(searchValue , 'i');
        if(searchValue.match(/^[a-z]/i)){
            const result = objArray.filter((obj)=>{ 
                return searchRegExp.test(obj.name)
            })
            return result
        }

        const result = objArray.filter((obj)=>{ 
            return searchRegExp.test(obj.age)
        })
        return result
    }

    /**
     * 
     * @param objArray Array of objects.
     * @param obj object to be deleted.
     */
    public deleteData(objArray:Array<TModel>, obj: TModel, arrayName: string){
        if(confirm("Do you want to delete this record ?")){
            const idx = objArray.indexOf(obj)
            objArray.splice(idx, 1)
            localStorage.setItem(arrayName, JSON.stringify(objArray))
        }
    }

}
