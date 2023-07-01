import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
//import { FormControl, Validators} from '@angular/forms'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { UserService } from "./helper/user.service";
import { User } from "./helper/user.interface";
import { DBOperations } from "./helper/dboperation";
import { mustMatch } from "./helper/must-matchvalidators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "registrationapp";
  //registrationform : FormGroup = new formGroup{()};
  Regform: FormGroup;
  users: User[];
  submitted: boolean = false;
  dbops: DBOperations;
  butttonText: string = "submit";
  constructor(
    private toastr: ToastrService,
    private abc: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.setFromState();
    this.getUsers();
  }
  setFromState() {
    //   this.Regform = this.abc.group((
    // id : [0],
    // title : ['',Validators.required],
    // firstname : ['',[Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])]],
    // lastname  : ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
    // email: ['', [Validators.required, Validators.email]],
    // dob : ['',Validators.compose,([Validators.required,Validators.pattern])]
    this.butttonText = "submit";
    this.dbops = DBOperations.create;
    this.Regform = this.abc.group(
      {
        firstName: [
          "",
          [
            Validators.required,
            Validators.compose,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.compose,
            Validators.minLength(2),
            Validators.maxLength(10),
          ],
        ],
        email: [
          "",
          [
            Validators.required,
            Validators.compose,
            Validators.email,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
        dob: [
          "",
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: mustMatch("password", "confirmPassword"),
      }
    );
  }
  get f() {
    return this.Regform.controls;
  }
  onSubmit() {
    this.submitted = true;
    // console.log(this.Regform.invalid)
    if (this.Regform.invalid) {
      return;
    }

    switch (this.dbops) {
      case DBOperations.create:
        this._userService.addUser(this.Regform.value).subscribe((res) => {
          this.toastr.success("user added", "user registration");
          this.getUsers();
          this.onCancel();
        });
        break;
      case DBOperations.update:
        this._userService.updateUser(this.Regform.value).subscribe((res) => {
          this.toastr.success("user updated", "user registration");
          this.getUsers();
          this.onCancel();
        });
        break;
    }
  }
  onCancel() {
    this.Regform.reset();
    this.butttonText = "submit";
    this.dbops = DBOperations.create;
    this.submitted = false;
  }
  getUsers() {
    this._userService.getUsers().subscribe((res:any) => {
      this.users = res;
      console.log(res);
      debugger;
    });
  }
  Edit(userId: Number) {
    this.butttonText = "update";
    this.dbops = DBOperations.update;
    let user = this.users.find((u: User) => user.id === userId);
    // this.Regform.patchValue(user);
    // this.Regform.get('password').setValue('');
    // this.Regform.get('confirmpassword').setValue('');
    // this.Regform.get('AcceptTerms').setValue('false');
  }
  Delete(userId: Number) {
    // this._userService.deleteUser(userId).subscribe(res=>{
    //   this.getUsers();
    //   this.abc.success("deleted successfully !!","user registration")

    // });
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to leave this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "yes,delete it",
      cancelButtonText: "so,keep it",
    }).then((result) => {
      if (result.value) {
        //   this._userService.deleteUser(userId).subscribe(res=>{
        // this.getUsers();
        //   // this.abc.success("deleted successfully !!","user registration")

        // });
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your recordis safe :)", "error");
      }
    });
  }
}
