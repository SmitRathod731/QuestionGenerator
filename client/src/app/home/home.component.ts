import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private https: HttpClient) { }

  totalmark: number = 0;
  easy: number = 0;
  medium: number = 0;
  hard: number = 0;
  error: boolean = false;
  questions: any;

  Generate() {
    let sum = this.easy + this.medium + this.hard;

    if (this.totalmark == 0 || this.easy == 0 || this.hard == 0 || this.medium == 0) {
      window.alert("Null value is not allowed")
    }
    else if (this.totalmark % 5) {
      window.alert("Total marks must be multiple of 5.")

    }
    else if (sum != 100) {
      window.alert("Sum of difficulty must be 100.");

    }
    else {
      this.fun();

    }

  }
  async fun() {
    const url = "http://localhost:5000/questions";
    const params = {
      totalMarks: this.totalmark.toString(),
      easy: this.easy.toString(),
      medium: this.medium.toString(),
      hard: this.hard.toString()
    };

    try {
      this.questions = await this.https.get(url, { params }).toPromise();
      this.error = true;
      console.log("Response:", this.questions);
    } catch (err) {
      this.error = false;
      console.error("Error fetching questions:", err);
    }
  }
}
