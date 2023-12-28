import { Component, OnInit } from '@angular/core';
import { Iextra } from 'src/Interfaces/iextra';
import { ExtraService } from 'src/Services/extra.service';

@Component({
  selector: 'app-extra-admin',
  templateUrl: './extra-admin.component.html',
  styleUrls: ['./extra-admin.component.css']
})
export class ExtraAdminComponent implements OnInit {
  extra:Iextra[] = [];
  constructor(private extraService:ExtraService){}
  ngOnInit(): void {
    this.extraService.getall().subscribe({
      next:(data) => {this.extra = data},
      error:(err) => console.log('Error' + err),
      complete:() =>{}
    })
  }
  Delete(id:number){
    var result = confirm('Do You Need Delete This Product');
    if (result) {
      this.extraService.delete(id).subscribe(
        {
        complete:()=>{ this.extraService.getall().subscribe({ next: (data) => {this.extra = data}}) }
        });
    }
  }

}
