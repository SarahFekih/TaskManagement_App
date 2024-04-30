import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  alert:string;
  username: string;
  password: string;
  message: any

  constructor(private service: LoginService,private router:Router) { }

  ngOnInit() {
  }

  doLogin() {
    let resp = this.service.login(this.username, this.password);
    resp.subscribe(data => {
      this.message = data;
     this.router.navigate(["/kanban"])
    },
    error=>{
      this.alert="erreur";
    });
  }

}
