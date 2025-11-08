import { Component, OnInit } from '@angular/core';
import { VideogameService } from '../services/videogame-service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-my-videogames',
  templateUrl: './my-videogames.page.html',
  styleUrls: ['./my-videogames.page.scss'],
  standalone: false
})
export class MyVideogamesPage implements OnInit {
  
  videogames: any = [];

  selectedVideogame: any = null; //This property is for saving the selected videogame

  constructor(private videogameService: VideogameService, 
    private router: Router, 
    private alertCtrl: AlertController, 
    private authService: AuthService, 
    private storage: Storage) { }

  ngOnInit() {
    this.getAllVideogames();
  }

  //This is for, when you enter this view, it will re-sync by itself
  ionViewWillEnter(){
    this.getAllVideogames();
  }

  async getAllVideogames(){
    let token = await this.storage.get("token");
    this.videogameService.getAllVideogames(token).subscribe({
      next: res => {
        console.log("User logged in. This is the videogames list:");
        console.log(res);
        this.videogames = res;
      }, error: error => {
        console.log(error);
        console.log("User not authenticated. Please log in");
        this.router.navigateByUrl("/home")
      }
    })
  }

  /*
  getAllVideogames(){
    this.videogameService.getAllVideogames().subscribe(response => {
      this.videogames = response;
    });
  }
    */

  async deleteVideogame(id: any){
    const token = await this.storage.get("token");
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas borrar este videojuego?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {text: 'Borrar',
          handler: () => {
            this.videogameService.delete(id, token).subscribe(() => {
              this.getAllVideogames();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  gotToEditVideogame(id: any) {
    this.router.navigateByUrl(`/videogame-form/${id}`);
  }

  goToAddVideogame() {
    this.router.navigate(['/videogame-form']);
  }

  async updateVideogame(id: any, updatedData: any){
    // updatedData is an object with the new data of the videogame
    const token = await this.storage.get("token");
    this.videogameService.update(id, updatedData, token).subscribe(response => {
      this.getAllVideogames();
    });
  }

  async getOneVideogame(id: any){
    const token = await this.storage.get("token");
    this.videogameService.findOne(id, token).subscribe(response => {
      this.selectedVideogame = response;
    });
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }

}
