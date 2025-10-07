import { Component, OnInit } from '@angular/core';
import { VideogameService } from '../services/videogame-service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getAllVideogames();
  }

  //This is for, when you enter this view, it will re-sync by itself
  ionViewWillEnter(){
    this.getAllVideogames();
  }

  getAllVideogames(){
    this.videogameService.getAllVideogames().subscribe(response => {
      this.videogames = response;
    });
  }

  async deleteVideogame(id: any){
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas borrar este videojuego?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {text: 'Borrar',
          handler: () => {
            this.videogameService.delete(id).subscribe(() => {
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

  updateVideogame(id: any, updatedData: any){
    // updatedData is an object with the new data of the videogame
    this.videogameService.update(id, updatedData).subscribe(response => {
      this.getAllVideogames();
    });
  }

  getOneVideogame(id: any){
    this.videogameService.findOne(id).subscribe(response => {
      this.selectedVideogame = response;
    });
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
