import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

type UserType = {
  Id: string | undefined;
  Email: string | undefined;
  Lastname: string | undefined;
  Firstname: string | undefined;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private userService: UserService) { }
  user: UserType = {
    Id: undefined,
    Email: undefined,
    Firstname: undefined,
    Lastname: undefined,
  }
  ngOnInit(): void {
    const user: UserType | any = this.userService
    .getUser()
    .subscribe(
      {
        next: (res: UserType | any ) => {
          console.log('res home:', res)
          if(res.status === 200){
           this.setUser({
              Id: res.Id,
              Email: res.Email,
              Firstname: res.Firstname,
              Lastname: res.Lastname,
            })
          }
        },
        error: (error) => {
          console.log(error)
          this.route.navigate(['/login'])
        }
      }
      );
    }
    
    setUser(userData: UserType){
      this.user = {...userData}
    }
    
}
