import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface EntryTypes {
  id: string;
  name: string;
  type: string;
  placeholder: string;
}
interface OnSubmitTypes {
  email: string | undefined;
  password: string | undefined;
}
interface MessageType {
  active: boolean;
  type: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
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
  message: MessageType = {
    type: "",
    active: false,
    message: ""
  }

  cleanMessage = (status: number) => {
    setTimeout(() =>
    {
      this.message = {
        type: "",
        active: false,
        message: ""
      }
      status === 200 && this.router.navigate([''])    
    } 
     ,2500)
  }

  setMessage(data: any){
    if(data?.status === 401) {
      this.message = {
        type: "error",
        active: true,
        message: data?.error?.message
      }
      this.cleanMessage(401)
    } else if (data?.status === 200){
      this.message = {
        type: "success",
        active: true,
        message: data.message
      }
      this.cleanMessage(200)
    }
  }
  


  handleSubmit(formData: OnSubmitTypes) {
    if (formData?.email && formData?.password) {
      this.authService.login(formData)
        .subscribe(
          {
            next: (res) => {
              const token: string | undefined = res?.user?.Token;
              token && sessionStorage.setItem('tkn', token)
              this.setMessage(res)
            },
            error: (error) => this.setMessage(error)
          }
        )

    }
  }
}
