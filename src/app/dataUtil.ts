/**
 * Employee Object
 */
export class empData{
    id!: number
    name!: string
    age!: number
}

/**
 * Department Object
 */
export class deptData{
    id!: number
    name!: string
}

export class functionUtils{
    constructor(){

    }

    /**
     * Pagiantion Data Extraction
     * @param objArray Array of objects.
     * @param page Page number .
     * @param numberOfRecords Number of records per page.
     * @returns Data(Array of objects) extracted for particular page number.
     */
    public paginate(objArray:Array<any>, page:number, numberOfRecords: number){

        const trimStart = (page - 1) * numberOfRecords
        const trimEnd = trimStart + numberOfRecords
        const trimmedData = objArray.slice(trimStart, trimEnd)
        return trimmedData
    }

    /**
     * Sort Function
     * @param objArray Array of objects.
     * @param sortOrder order(ascending/descending) to sort data.
     * @param key Column name according to which data is to be sorted.
     * @returns sorted array of objects
     */
    public sortData(objArray:Array<any>, sortOrder:boolean, key = 'id'){
        /** If passed key is a numerical parameter*/
        if(typeof objArray[0][key] === "number"){
            if(sortOrder){
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
            if(sortOrder){
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

        return objArray
    }

    /**
     * Search Function
     * @param objArray Array of objects.
     * @param searchValue value to be searched in given array of objects.
     * @returns resultant array with matching values.
     */
    public searchData(objArray:Array<any>, searchValue: string){
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
     * @returns Array of objects after successful deletion.
     */
    public deleteData(objArray:Array<any>, obj: any){
        const idx = objArray.indexOf(obj)
        objArray.splice(idx, 1)
        return objArray
    }

}