import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iextra } from 'src/Interfaces/iextra';
import { ExtraService } from 'src/Services/extra.service';

@Component({
  selector: 'app-extra-details',
  templateUrl: './extra-details.component.html',
  styleUrls: ['./extra-details.component.css']
})
export class ExtraDetailsComponent implements OnInit{
  ExtraId = 0 ;
Extra:Iextra|undefined;
constructor(private activeted:ActivatedRoute, private extraService:ExtraService){}
  ngOnInit(): void {
    this.ExtraId = this.activeted.snapshot.params['id'];
    this.extraService.getbyid(this.ExtraId).subscribe((data) => {this.Extra =  data})
  }

}
