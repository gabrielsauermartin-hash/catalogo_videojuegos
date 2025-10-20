import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideogameService } from '../services/videogame-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-videogame-form',
  templateUrl: './videogame-form.page.html',
  styleUrls: ['./videogame-form.page.scss'],
  standalone: false
})
export class VideogameFormPage implements OnInit {

  videogameForm: FormGroup;
  id: string | null = null;
  isAddMode: boolean = true;
  capturedPhoto: string = "";
  isSubmitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private videogameService: VideogameService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private alertController: AlertController
  ) {
    this.videogameForm = this.formBuilder.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      developer: ['', Validators.required],

      price: ['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)]], //solo admite punto decimal con 2 decimales 

      description: ['', Validators.required],
      requirements: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;

    if (!this.isAddMode && this.id) {
      this.videogameService.findOne(this.id).subscribe(videogame => {
        //Load the existing videogame in the form
        this.videogameForm.patchValue({
          title: videogame.title,
          genre: videogame.genre,
          developer: videogame.developer,
          price: videogame.price,
          description: videogame.description,
          requirements: videogame.requirements,
          filename: videogame.filename
        });

        // Asigns the complete URL of the image into the capturedPhoto field


        if (videogame.filename) {
          this.capturedPhoto = `http://localhost:8080/images/${videogame.filename}`;
          // Adjusts this URL to the real path where the image is in the backend
        } else {
          this.videogameForm.reset();
          this.capturedPhoto = '';
        }
        
      });
    } 
  }

  getFormControl(field: string) {
    return this.videogameForm.get(field);
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = "";
  }

  onSubmit() {
    if (this.videogameForm.invalid) {
      if (this.getFormControl('price')?.hasError('pattern')) {
        this.showAlert('Error en Precio', 'El precio debe ser un número decimal con punto. Por ejemplo 19.99');
      }
      return;
    }

    if (this.isAddMode) {
      this.createVideogame();
    } else {
      this.updateVideogame();
    }
  }

  async updateVideogame() {
    this.isSubmitted = true;

    if (!this.videogameForm.valid) {
      console.log('Please provide all the required values')
      return;
    }

    const formData = new FormData();
    formData.append("title", this.videogameForm.get('title')?.value),
      formData.append("genre", this.videogameForm.get('genre')?.value),
      formData.append("developer", this.videogameForm.get('developer')?.value),
      formData.append("price", this.videogameForm.get('price')?.value),
      formData.append("description", this.videogameForm.get('description')?.value),
      formData.append("requirements", this.videogameForm.get('requirements')?.value)

    if (this.capturedPhoto && this.capturedPhoto.startsWith('blob:') || this.capturedPhoto.startsWith('data:')) {
      const response = await fetch(this.capturedPhoto);
      const blob = await response.blob();
      formData.append("file", blob);
    }

    this.videogameService.update(this.id!, formData).subscribe(data => {
      console.log('Videogame updated succesfully!');
      this.router.navigateByUrl('/my-videogames');
    });

    /*
    if (!this.id) return;
    this.videogameService.update(this.id, this.videogameForm.value).subscribe(() => {
      this.router.navigateByUrl("/my-videogames");
    });
    */
  }

  async createVideogame() {
    this.isSubmitted = true;

    if (!this.videogameForm.valid) {
      console.log('Please provide all the required values')
      return;
    } else {
      let blob = null;

      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.videogameService.create(this.videogameForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/my-videogames");
      })
    }

    /*
    this.videogameService.create(this.videogameForm.value, blob).subscribe(() => {
      this.router.navigateByUrl("/my-videogames");
    });
    */
  }

  cancel() {
    this.router.navigateByUrl('/my-videogames');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
