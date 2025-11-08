import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  title: string = "Clair Obscur Expedition 33";
  genre: string = "RPG por turnos";
  developer: string = "SandFall Interactive";
  price: Number = 49.99
  description: string = "eee";
  requirements: string = "qqq";

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  loginOrJustEnter(){
    this.authService.isLoggedIn().then(loggedIn => {

      if(loggedIn){
        this.router.navigateByUrl("/my-videogames");
        return;
      } 
      this.router.navigateByUrl("/login");
    })
  }

  /*
  goToMyVideogames(){
    this.router.navigateByUrl("/my-videogames");
  }
  */

}
