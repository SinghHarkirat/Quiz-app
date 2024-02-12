import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QnaService {
 
  constructor(private http:HttpClient) { 
  }
  getQuestions(){
    return this.http.get('assets/qna.json');
  }
 
}
