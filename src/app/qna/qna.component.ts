import { Component, OnInit } from '@angular/core';
import { QnaService } from '../services/qna.service';
import party from "party-js";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {
  questions: any[]=[];
  answers: any;
  selectedOptions: any[]=[];
  questionCount: number=0;
  isTeamA: boolean=false;
  scoreA: number=0;
  scoreB: number=0;
  isAttempted: boolean=false;
  isLastQuestion: boolean=false;
  winner: string='';
  isTie: boolean=false;
  tieQues:any;
  myForm!:FormGroup;
  constructor(private qnaService:QnaService,private fb : FormBuilder) {

  }

  ngOnInit(): void {
    // validations
    this.myForm=this.fb.group({
      tieBreakerOption:['',Validators.required],
      selectedTeam:['',Validators.required]
    });

    var questObservable=this.qnaService.getQuestions().subscribe((data: any) => {
      this.questions = data.questions.map((x: any) => {
        return {
          question: x.question,
          options: x.options,
          tieBreaker:x.isTieBreaker
        };
      });
      this.answers=data.questions.map((x:any)=>x.answer);
      this.questionCount=this.questions.length;
      console.log(this.questionCount);
      setTimeout(()=>{
        this.displayQuestions(0);
      },1000);
    }, (error: Error) => console.error(error))


  }
  displayQuestions(index:number){
    debugger;
    let questionsDiv=document.getElementsByClassName("questionsDiv");
    console.log("questDiv",questionsDiv);
    questionsDiv[index].classList.remove('d-none');
  }


  findAnswer(qno:any){
    debugger;
    if(qno==(this.questionCount-1))
      this.isLastQuestion=true;
    if(qno%2==0){
      this.isTeamA=true;
    }
    else{
      this.isTeamA=false;
    }
    this.findWinner(qno,false);
    // display next question
    this.displayQuestions(qno+1);
  }

  isOptionSelected(index: number): boolean {
    return !!this.selectedOptions[index];
  }

  showConfetti(source:any){
    if(!this.isTie)
    {
      setInterval(()=>{
        party.confetti(source);
      },600)
    }

  }
  // tieBreakerResult(){
  //   debugger;
  //   if(this.myForm.controls['selectedTeam'].value=="A")
  //    this.isTeamA=true;
  //   else
  //    this.isTeamA=false;
  //   this.isLastQuestion=true;
  //   this.selectedOptions[this.tieQues.index]=this.myForm.controls['tieBreakerOption'].value;
  //   this.findWinner(this.tieQues.index,true);
  // }

  findWinner(qno:number,isTieBreakerRound:boolean){
    if(this.selectedOptions[qno]==this.answers[qno])
    {
      if(this.isTeamA)
        this.scoreA=this.scoreA+1;
      else
        this.scoreB=this.scoreB+1;
      alert('Correct');
    }

    else
    {
      alert('Incorrect');
      if(isTieBreakerRound)
      {
        if(this.isTeamA)
          this.scoreA=this.scoreA-1;
        else
          this.scoreB=this.scoreB-1;
      }
    }
    this.questions[qno].isAttempted=true;
    if(this.isLastQuestion && this.questions[qno].isAttempted==true){
      if(this.scoreA>this.scoreB){
        this.winner="Team A";
        this.isTie=false;
      }
      else if(this.scoreB>this.scoreA){
        this.winner="Team B";
        this.isTie=false;
      }
      else{
        if(isTieBreakerRound) return;
        this.isTie=true;
        // show tie breaker question
        // this.tieQues=this.questions.filter(x=>x.tieBreaker)[0];
        // this.tieQues.answer=this.answers[qno+1];
        // this.tieQues.index=qno+1;
        // return;


      }
      var winnerDiv:any=document.getElementById("winnerDiv");
      winnerDiv?.classList.remove("d-none");
      document.getElementById("scoreDiv")?.classList.add("d-none");
      this.showConfetti(winnerDiv);

    }
  }




}
