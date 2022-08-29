import { Component, OnInit, Input } from '@angular/core';

interface EntryTypes {
  id: string;
  name: string;
  type: string;
  placeholder: string;
}
interface OnSubmitTypes {
  email: string|undefined;
  password: string|undefined;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  
  entries: EntryTypes[] = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
    }
  ];
  handleSubmit(formData: OnSubmitTypes){
    console.log('FormData:', formData)
  }
}
