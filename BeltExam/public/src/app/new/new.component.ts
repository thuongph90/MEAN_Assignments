import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet={name: '', type:'', description:'', skill1:'', skill2:'',skill3:'',}
  errorname: any;
  errortype: any;
  errordescription: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  }
  OnNewPet(){
    console.log(this.newPet)
    this._httpService.CreatePet(this.newPet).subscribe(data => { 
      console.log(data)
      if(data['error']!=null){
        console.log("Error from data")
        this.errorname= data['error']['errors']['name']['message']
        this.errortype= data['error']['errors']['type']['message']
        this.errordescription= data['error']['errors']['description']['message']
        console.log(this.errorname)
      }
      else{
        console.log("Success, create", data)
        // this.newPet={name:''}
        
        this._router.navigate(['/home'])
      }
    })
    
  }

}

