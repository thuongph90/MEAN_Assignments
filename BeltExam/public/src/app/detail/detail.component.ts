import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  petID= "";
  OnePet={};
  click= true;
  // Likes =0;
  // errormessage: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.petID=params['id'];
      console.log(params['id']);
    });
      this.Detail()
  }
  Detail(){
    this._httpService.Detail(this.petID).subscribe(data=>{
      this.OnePet= data['data'][0]
      console.log(this.OnePet)
    })
  }
  Delete(pet: object){
    console.log("ID of item want to delete")
    console.log(pet)
    this._httpService.Delete(pet).subscribe(data=>{})
    this._router.navigate(['/home'])
    
  }
  Like(){
    this.OnePet['likes'] +=1;
    console.log(this.OnePet['likes'])
    this.click= false;
    this._httpService.Update(this.OnePet).subscribe(data=>{
      console.log(data)
      
    })
  }
}
