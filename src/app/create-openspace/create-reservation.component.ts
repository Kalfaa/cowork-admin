import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OpenSpaceService} from "../open-space.service";
import {first} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,private openSpace:OpenSpaceService,private router: Router) { }

  ngOnInit(): void {this.form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  }



  createOpen(){
      console.log("ouou");
      return this.openSpace.post(this.form.controls.name.value, this.form.controls.description.value).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {
            console.log('eheheh');
          });;
  }
}
