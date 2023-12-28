import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraService } from 'src/Services/extra.service';

@Component({
  selector: 'app-extra-form',
  templateUrl: './extra-form.component.html',
  styleUrls: ['./extra-form.component.css']
})
export class ExtraFormComponent implements OnInit{
  imgshow:string='';

  extraFormGroup : FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    price:new FormControl(0,Validators.required),
    photo:new FormControl('',Validators.required)
  })

  extraId:number = 0 ;

  get nameControl(){
    return this.extraFormGroup.controls['name'];
  }

  get priceControl(){
    return this.extraFormGroup.controls['price'];
  }

  get photoeControl(){
    return this.extraFormGroup.controls['photo'];
  }

  constructor(private activeRoute:ActivatedRoute, private extraService:ExtraService,private router:Router){}

  ngOnInit(): void {
    this.extraId = this.activeRoute.snapshot.params['id'];
    if(this.extraId> 0 ){
      this.extraService.getbyid(this.extraId).subscribe((data)=> {
        this.extraFormGroup.controls['name'].setValue(data.name);
        this.extraFormGroup.controls['price'].setValue(data.price);
        this.extraFormGroup.controls['photo'].setValue(data.photo);
        this.imgshow=data.photo;
      })
    }
  }
  GetData(e:Event){
    e.preventDefault()
    console.log(this.extraFormGroup.value);
    this.extraFormGroup.controls['photo'].setValue(this.imgshow)
    if(this.extraFormGroup.valid){
      console.log("asasa");

      if (this.extraId > 0 ) {
        // Edit
       
      this.extraService.edit(this.extraId,this.extraFormGroup.value).subscribe({complete:()=>{this.router.navigate(['/extras'])}})
      }else{
        // Add
       
        this.extraService.add(this.extraFormGroup.value).subscribe({complete:()=>{this.router.navigate(['/extras'])}});
      }
      
    }
  }




  image:Uint8Array[]=[];
  convertImageToByteArray(file: File): Promise<Uint8Array> {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onloadend = () => {
       const arrayBuffer = reader.result as ArrayBuffer;
       const byteArray = new Uint8Array(arrayBuffer);
       resolve(byteArray);
     };
     reader.onerror = reject;
     reader.readAsArrayBuffer(file);
   });
 }
 /**/

/*      convert image to from bytes to url               **/
 byteArrayToBlob(byteArray: Uint8Array, contentType: string): Blob {
   return new Blob([byteArray], { type: contentType });
                  }

 blobToDataURL(blob: Blob): Promise<string> {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onloadend = () => {
       const dataURL = reader.result as string;
       resolve(dataURL);
     };
     reader.onerror = reject;
     reader.readAsDataURL(blob);
   });
 }
/**/

/*  read image file from device   **/


async handleImageUpload(event:any) {
   const File = event.target.files[0]
   if (File) {
     const byteArray = await this.convertImageToByteArray(File);

     this.image[0]=byteArray;

   const  lob = this.byteArrayToBlob(this.image[0], "");
   this.blobToDataURL(lob).then(_dataURL => {

     this.imgshow= _dataURL;

     });

   }

 }






}
