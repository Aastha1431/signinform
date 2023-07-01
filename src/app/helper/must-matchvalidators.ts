import { FormGroup } from "@angular/forms"
export function mustMatch(password:string,confirmpassword:string){
return(FormGroup:FormGroup)=>{
    const passwordControls = FormGroup.controls[password];
    const confirmpasswordControls = FormGroup.controls[confirmpassword];
    if(passwordControls.value  !== confirmpasswordControls.value){
        confirmpasswordControls.setErrors({mustMatch:true})
    }
    else{
        confirmpasswordControls.setErrors({mustMatch:null})
    }
}
};
