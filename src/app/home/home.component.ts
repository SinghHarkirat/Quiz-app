import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QnaService } from '../services/qna.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('openClose', [
      // ...
      state('open', style({
        height: '30px',
        opacity: 1,
      })),
      state('closed', style({
       height:'0px',
       opacity: 0,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  teamA: string[]=[];
  teamB: string[]=[];
  isOpen: boolean=false;


  constructor(private router:Router,private qnaService:QnaService) { }

  ngOnInit(): void {
 
    this.teamA=['Abhijeet Kumar','Keshav Singh','Robin','Sushmita','Ajay']
    this.teamB=['Abhishek Tiwari','Anup','Manpreet','Sandeep','Meenal']
 
   
  }
  startPlay(){
    // some animation
    setTimeout(()=>{
      this.router.navigate(['/qna'])
    },1000);
  }
  toggle(){
    this.isOpen=!this.isOpen;
  
  }

}
