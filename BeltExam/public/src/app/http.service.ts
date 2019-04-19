import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}
  CreatePet(body){
    return this._http.post("/pets", body)
  }
  ShowAll(){
    return this._http.get("/pets")
  }
  Delete(pet){
    // console.log(pet._id)
    return this._http.delete(`pets/${pet['_id']}`)
  }
  Detail(id){
    return this._http.get(`/pets/${id}`)
  }
  Update(body){
    return this._http.put("pets/"+body['_id'], body)
  }
}