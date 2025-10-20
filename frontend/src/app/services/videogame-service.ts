import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideogameService {

  endpoint = 'http://localhost:8080/api/videogames';

  constructor (private httpClient: HttpClient) {}
  
  getAllVideogames(){
    return this.httpClient.get(this.endpoint);
  }

  create(videogame: any, blob: any){

    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    */

    let formData = new FormData();

    formData.append("title", videogame.title),
    formData.append("genre", videogame.genre),
    formData.append("developer", videogame.developer),
    formData.append("price", videogame.price),
    formData.append("description", videogame.description),
    formData.append("requirements", videogame.requirements),
    formData.append("file", blob);

    /*
    const body = new URLSearchParams();
    body.append("title", videogame.title),
    body.append("genre", videogame.genre);
    body.append("developer", videogame.developer);
    body.append("price", videogame.price);
    body.append("description", videogame.description);
    body.append("requirements", videogame.requirements);
    */

    return this.httpClient.post(this.endpoint, formData);
    //return this.httpClient.post(this.endpoint, body.toString(), { headers });
  }

  //Delete a videogame by an ID
  delete(id: any): Observable<any>{
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  /*
  update(id: any, data: any): Observable<any> {
    //Sends an update with PUT and the new data
    return this.httpClient.put(`${this.endpoint}/${id}`, data);
  }
  */

  //Update a videogame by an ID
  update(id: any, formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.endpoint}/${id}`, formData);
  }

  //Search one videogame by an ID
  findOne(id: any): Observable<any> {
    //Requests a videogame with an specific ID
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
}
