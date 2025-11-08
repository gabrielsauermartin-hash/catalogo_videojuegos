import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideogameService {

  //endpoint = 'http://localhost:8080/api/videogames';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000/api/videogames';

  constructor (private httpClient: HttpClient) {}

  private getOptions(token: string){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: new HttpHeaders({
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      })
      //, withCredentials: true
    };

    return options;
  }
  
  getAllVideogames(token: string){
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS, myOptions);
    //return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/videogames`, myOptions);
  }

  /*
  getAllVideogames(){
    return this.httpClient.get(this.endpoint);
  }
  */

  create(videogame: any, blob: any, token: string): Observable<any> {

    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    */

    let formData = new FormData();

    formData.append("title", videogame.title);
    formData.append("genre", videogame.genre);
    formData.append("developer", videogame.developer);
    formData.append("price", videogame.price.toString());
    formData.append("description", videogame.description);
    formData.append("requirements", videogame.requirements);

    if(blob){
      formData.append("file", blob);
    }
    
    //formData.append("file", blob);

    /*
    const body = new URLSearchParams();
    body.append("title", videogame.title),
    body.append("genre", videogame.genre);
    body.append("developer", videogame.developer);
    body.append("price", videogame.price);
    body.append("description", videogame.description);
    body.append("requirements", videogame.requirements);
    */

    return this.httpClient.post(this.AUTH_SERVER_ADDRESS, formData, this.getOptions(token));
    //return this.httpClient.post(this.endpoint, body.toString(), { headers });
  }

  //Delete a videogame by an ID
  delete(id: any, token: string): Observable<any>{
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/${id}`, this.getOptions(token));
  }

  /*
  update(id: any, data: any): Observable<any> {
    //Sends an update with PUT and the new data
    return this.httpClient.put(`${this.endpoint}/${id}`, data);
  }
  */

  //Update a videogame by an ID
  update(id: any, formData: FormData, token: string): Observable<any> {
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/${id}`, formData, this.getOptions(token));
  }

  //Search one videogame by an ID
  findOne(id: any, token: string): Observable<any> {
    //Requests a videogame with an specific ID
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/${id}`, this.getOptions(token));
  }
}
