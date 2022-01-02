/**
 * ModelBase
 */
export class ModelBase{
    id!: number
    name!: string
    constructor() {}
}

/**
 * Employee Object
 */
 export class EmployeeData extends ModelBase{
    age!: number
    constructor() {super()}
}

/**
 * Department Object
 */
export class DepartmentData extends ModelBase{
    constructor() {super()}
}