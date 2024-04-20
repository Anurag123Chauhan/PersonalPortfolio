import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse} from '@angular/common/http';
import { json } from 'stream/consumers';
import { ServerResponse } from 'http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private el: ElementRef, private http: HttpClient) { }
  async login(ev: Event) {
    ev.preventDefault();
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Acess-Control-Credentials": "true"
        },
        body: JSON.stringify({
          userName: this.el.nativeElement.querySelectorAll('#login-username')[0].value,
          password: this.el.nativeElement.querySelectorAll('#login-password')[0].value,
        }),
      });
      const data = JSON.parse(await res.text());
      console.log(data);
      window.localStorage.setItem("token", data.token);
  }

  signUp(ev: Event) {
    ev.preventDefault();  
    const password = this.el.nativeElement.querySelectorAll('#signup-password')[0].value;
    const confirmPassword = this.el.nativeElement.querySelectorAll('#signup-confirm-password')[0].value;
    if(password !== confirmPassword) {
      alert('Password not match');
      return;
    }
    this.http.post('http://localhost:3000/register',{
      userName: this.el.nativeElement.querySelectorAll('#signup-username')[0].value,
      password: password,
    }, {}).subscribe((res:any) => {
      // res.cookie('token', res.token);
      window.localStorage.setItem("token", res.token);
      console.log(res);
    });
  }
  ngOnInit(): void {
    const signupButton = this.el.nativeElement.querySelectorAll('#signup-button')[0],
    loginButton = this.el.nativeElement.querySelectorAll('#login-button')[0],
    userForms = this.el.nativeElement.querySelectorAll('#user_options-forms')[0];

    signupButton?.addEventListener('click', () => {
    userForms?.classList.remove('bounceRight')
    userForms?.classList.add('bounceLeft')
    }, false)

    loginButton?.addEventListener('click', () => {
    userForms?.classList.remove('bounceLeft')
    userForms?.classList.add('bounceRight')
    }, false)
  }
}
