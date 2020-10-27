import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OpenSpaceService} from "../open-space.service";
import {first} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {OpenHours} from "../interface/login";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  form: FormGroup;
  hourArray = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00','22:00','23:00'];
  openHours:OpenHours = new OpenHours();
  constructor(private fb: FormBuilder,private openSpace:OpenSpaceService,private router: Router) { }

  ngOnInit(): void {this.form = this.fb.group(
    {
    name: ['', Validators.required],
    description: ['', Validators.required],
    start: ['', Validators.required],
  });
  }



  createOpen(){
      return this.openSpace.post(this.form.controls.name.value, this.form.controls.description.value,this.openHours.convertHourRangeToInt()).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          error => {
            console.log('eheheh');
          });
  }


  endValue(string){
    for(let i =0;i<this.hourArray.length;i++){
      if(parseInt(string) === parseInt(this.hourArray[i])){
        return this.hourArray.slice(i+1);
      }
    }
  }

}
