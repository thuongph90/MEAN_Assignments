import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  PetID= "";
  OnePet={};
  errorname: any;
  errortype: any;
  errordescription: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.PetID=params['id'];
      console.log(params['id'])
    });
    this.Detail()
  }
  Detail(){
    this._httpService.Detail(this.PetID).subscribe(data=>{
      this.OnePet= data['data'][0]
      console.log(this.OnePet)
    })
  }
  Update(){
    this._httpService.Update(this.OnePet).subscribe(data=>{
      console.log(data)
      if(data['error']!= null){
        console.log("Error from data")
        this.errorname= data['error']['errors']['name']['message']
        this.errortype= data['error']['errors']['type']['message']
        this.errordescription= data['error']['errors']['description']['message']
        console.log(this.errorname)
      }
      else{
        console.log("Success, update", data);
        this.OnePet={}
        this._router.navigate(['/home'])
      }
    })
  }
 
}
