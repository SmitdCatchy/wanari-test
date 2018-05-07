export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  constructor(
     _id: number, _username: string, _password: string, _role: string
   ) {
    this.id = _id;
    this.username = _username;
    this.password = _password;
    this.role = _role;
  }
}
