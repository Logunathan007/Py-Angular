import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  list_data:any;
  input_data = new FormGroup({
    name: new FormControl("")
  })

  constructor(private http:HttpClient){  }

  ngOnInit(): void {
    this.getAllData();
    // console.log("worked",this.list_data);
  }

  getAllData(){
    this.http.get<any>("http://127.0.0.1:5000/data").subscribe(data => {
      this.list_data=data;
      // console.log("get",this.list_data);
    },error => {
      // console.error('Error occurred:', error);
    });
  }

  addNewData(e:any){
    e.preventDefault();
    var msg:any;
    this.http.post("http://127.0.0.1:5000/add",{name:this.input_data.controls.name.value}).subscribe(data => {
      msg = data
      // console.log("post",msg);
      this.getAllData();
    });
    this.input_data.controls.name.setValue("");

  }

}
