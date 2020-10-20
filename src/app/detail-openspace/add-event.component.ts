import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OpenSpaceService} from "../open-space.service";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent implements OnInit{
  fileToUpload: File = null;
  form: FormGroup;
  date:Date;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {this.form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    file: ['', Validators.required],
    date:['',Validators.required]
  });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  myFilter = (d: Date | null): boolean => {
    // Prevent Saturday and Sunday from being selected.
    return d > new Date();
  };

  orgValueChange(value: string) {
    if(value!==null){
      this.date = new Date(value);
      return;
    }
  }
}
