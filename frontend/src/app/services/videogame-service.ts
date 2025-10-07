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

  create(videogame: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append("title", videogame.title),
    body.append("genre", videogame.genre);
    body.append("developer", videogame.developer);
    body.append("price", videogame.price);
    body.append("description", videogame.description);
    body.append("requirements", videogame.requirements);

    return this.httpClient.post(this.endpoint, body.toString(), { headers });
  }

  delete(id: any): Observable<any>{
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    //Sends an update with PUT and the new data
    return this.httpClient.put(`${this.endpoint}/${id}`, data);
  }

  findOne(id: any): Observable<any> {
    //Requests a videogame with an specific ID
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
}
