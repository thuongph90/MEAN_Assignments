import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  AllPets={};
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.ShowAll()
  }
  ShowAll(){
    this._httpService.ShowAll().subscribe(data => {
      
      this.AllPets = data['data'];
      console.log(this.AllPets)
     })
  }
  Delete(Pet: object){
    console.log(Pet)
    this._httpService.Delete(Pet).subscribe(data=>{})
    this.ShowAll()
  }
  
  

}

