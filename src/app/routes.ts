import { Component } from "@angular/core";
import { QnaComponent } from "./qna/qna.component";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const routes: Routes=[
    {path:'',component:HomeComponent},
    {path:'qna',component:QnaComponent}
];