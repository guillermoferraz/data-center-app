import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
interface EntryTypes {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  error: { status: boolean, message: string|undefined };
}
interface OnSubmitTypes {
  firstname: string|undefined;
  lastname: string|undefined;
  email: string|undefined;
  conf_email: string|undefined;
  password: string|undefined;
  conf_password: string|undefined;
}
type RegisterDataTypes = Omit<OnSubmitTypes, 'conf_email'| 'conf_password'>

interface MessageType {
  active: boolean;
  type: string;
  message: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  entries: EntryTypes[] = [
    {
      id: 'firstname',
      name: 'firstname',
      type: 'text',
      placeholder: 'Firstname',
      error: { status: false, message: '' }
    },
    {
      id: 'lastname',
      name: 'lastname',
      type: 'text',
      placeholder: 'Lastname',
      error: { status: false, message: '' }
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      error: { status: false, message: '' }
    },
    {
      id: 'conf_email',
      name: 'conf_email',
      type: 'email',
      placeholder: 'Confirm email',
      error: { status: false, message: '' }
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      error: { status: false, message: '' }
    },
    {
      id: 'conf_password',
      name: 'conf_password',
      type: 'password',
      placeholder: 'Confirm password',
      error: { status: false, message: '' }
    }
  ];

  message: MessageType = {
    type: "",
    active: false,
    message: ""
  }

  cleanMessage = () => {
    setTimeout(() => {
      this.message = {
        type: "",
        active: false,
        message: ""
      }
    },2500)
  }

  setMessage(data: any){
    if(data?.status === 409) {
      this.message = {
        type: "error",
        active: true,
        message: data?.error?.message
      }
      this.cleanMessage()
    } else if (data?.status === 200){
      this.message = {
        type: "success",
        active: true,
        message: data.message
      }
      sessionStorage.setItem('tkn', data.token)
      this.cleanMessage()
    }
  }
  

  handleSubmit(formData: OnSubmitTypes){
    this.entries[0].error = { status: Boolean(!formData.firstname), message: 'The firstname is required' }
    this.entries[1].error = { status: Boolean(!formData.lastname), message: 'The lastname is required' }
    this.entries[2].error = {status: Boolean(!formData.email), message: 'The email is required' }
    this.entries[3].error = {status: Boolean(!formData.conf_email || (formData.conf_email !== formData.email)), message: 'The email and cofirmation do not match'}
    this.entries[4].error = {status: Boolean(!formData.password), message: 'The password is required'}
    this.entries[5].error = {status: Boolean(!formData.conf_password || (formData.conf_password !== formData.password)), message: 'The password and confirmation do not match'}

    const registerData: RegisterDataTypes = {
      firstname: formData.firstname || "",
      lastname: formData.lastname || "",
      email: formData.email || "",
      password: formData.password || "",
    }

     const enableSubmit =  this.entries.map(v => !v.error.status ).filter(e => !e)
     if(enableSubmit.length === 0) {
      this.authService
      .register(registerData)
      .subscribe(
        {
          next: (res) => this.setMessage(res),
          error: (error) => this.setMessage(error)
        }
        )
     }

  }

}
