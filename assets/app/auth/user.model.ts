export class User{
  constructor(
    public email: string,
    public password: string,
    //Question marks means the arguments are NOT Required.
    //This is for sign in so we dont need 4 arguments to do it
    public firstName?: string,
    public lastName?: string){

  }
}
