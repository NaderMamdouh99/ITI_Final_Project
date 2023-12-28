import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/Services/offers.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  imgshow:string="";
 
  offersForm: FormGroup = new FormGroup({
    id:new FormControl(0),
    name:new FormControl('', [Validators.required, Validators.minLength(3)]),
    photo: new FormControl('',Validators.required),
    details: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startdate : new FormControl('', Validators.required),
    enddate:new  FormControl('', Validators.required),
    price:new FormControl(0, Validators.required)

  });
  offerId: number = 0;
  constructor(private activatedroute: ActivatedRoute, private offerservice: OffersService, private router:Router ){}
 
 
 
  ngOnInit(): void {
    this.offerId = this.activatedroute.snapshot.params['id']
    if(this.offerId >0)
    {
      this.offerservice.getById(this.offerId).subscribe((data)=>{
        this.offersForm.controls['name'].setValue(data.name);
        this.offersForm.controls['details'].setValue(data.details);
        this.offersForm.controls['startdate'].setValue(data.startdate.substring(0, 9));
        this.offersForm.controls['enddate'].setValue(data.enddate.substring(0, 9));
        this.offersForm.controls['price'].setValue(data.price);
        this.offersForm.controls['photo'].setValue(data.photo);
        this.imgshow = data.photo 


      });
    }
  }
  GetData(e: Event) {
    e.preventDefault();

    this.offersForm.controls['photo'].setValue(this.imgshow);
   
    if (this.offersForm.valid) {

      
      
      if (this.offerId > 0) {
        // Edit existing item
      
        this.offerservice.edit(this.offerId, this.offersForm.value).subscribe({complete:()=>{this.router.navigate(['/offer/admin']);}});

      }
       
     else {
   

        // Add new item
     
        this.offerservice.add(this.offersForm.value).subscribe({complete:()=>{this.router.navigate(['/offer/admin']);}});
        
        }
        
      }
    }

    
     //////////////////////////////
     
     /*      read image as bytes               **/
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
 /******/

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
/******/

/**  read image file from device   ***/


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