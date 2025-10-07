import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideogameService } from '../services/videogame-service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    public formBuilder: FormBuilder,
    private videogameService: VideogameService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.videogameForm = this.formBuilder.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      developer: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;

    if(!this.isAddMode && this.id) {
      this.videogameService.findOne(this.id).subscribe(videogame => {
        //Load the existing videogame in the form
        this.videogameForm.patchValue({
          title: videogame.title,
          genre: videogame.genre,
          developer: videogame.developer,
          price: videogame.price,
          description: videogame.description,
          requirements: videogame.requirements
        });
      });
    }
  }

  onSubmit(){
    if(this.videogameForm.invalid){
      //If there are validation errors, don't do anything or show a message
      return;
    }

    if(this.isAddMode){
      this.createVideogame();
    } else {
      this.updateVideogame();
    }
  }

  updateVideogame(){
    if (!this.id) return;
    this.videogameService.update(this.id, this.videogameForm.value).subscribe(() => {
      this.router.navigateByUrl("/my-videogames");
    });
  }

  createVideogame(){
    this.videogameService.create(this.videogameForm.value).subscribe(() => {
      this.router.navigateByUrl("/my-videogames");
    });
  }

  cancel() {
  this.router.navigateByUrl('/my-videogames');
  }

  getFormControl(field: string){
    return this.videogameForm.get(field);
  }

}
