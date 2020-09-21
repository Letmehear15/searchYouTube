export const required = (value:string):string|undefined =>  {
    if(!value) return 'The field is required';
}