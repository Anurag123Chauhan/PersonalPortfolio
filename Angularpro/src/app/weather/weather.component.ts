import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SignupComponent } from "../login/signup/signup.component";
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { ElementRef } from '@angular/core';
@Component({
    selector: 'app-weather',
    standalone: true,
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.css',
    imports: [SignupComponent, HttpClientModule]
})
// export class WeatherComponent {
//   loggedIn = false;
//   constructor(private titleService:Title, private el: ElementRef, private http: HttpClient){
//     this.titleService.setTitle("Weather Forcasting");
//   }
  
//   city:String = "Delhi";
//   async onSub(ev: Event) {
//     function formatTime(date: Date): string {
//       const hours: number = date.getHours();
//       const minutes: string = ('0' + date.getMinutes()).slice(-2);
//       const seconds: string = ('0' + date.getSeconds()).slice(-2);
//       return hours + ':' + minutes + ':' + seconds;
//     }
//     ev.preventDefault();
//     this.city = (document.getElementById('searchCity') as HTMLInputElement).value;
//       try {
//         const response = await fetch("http://localhost:3000/weather", {
//           method: "POST",
//           headers: {
//             'Allow-Acess-Control-Credentials': "true",
//             'Cookie': ` token=${window.localStorage.getItem('token')}`
//           },
//           body: JSON.stringify({
//             city: this.city
//           }),
//         });
//         console.log(response);
//       } catch (error) {
//         console.error(error);
//       }
//   }
//   ngOnInit(): void {
//     function formatTime(date: Date): string {
//       const hours: number = date.getHours();
//       const minutes: string = ('0' + date.getMinutes()).slice(-2);
//       const seconds: string = ('0' + date.getSeconds()).slice(-2);
//       return hours + ':' + minutes + ':' + seconds;
//     }
//     let cities: Array<HTMLCollection> = [...this.el.nativeElement.querySelectorAll("#cityName")];
//     cities.forEach(async (city: any) => {
//       const options = {
//         headers: {
//           'X-RapidAPI-Key': '30b75c3bdbmsh10ab4b5aa3dbcd9p1583dcjsnd225eafef772',
//           'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
//         }
//       };
//       try {
//         this.http.get(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city.textContent}`, options)
//         .subscribe(async(response:any) => {
//         const resultObj = response;
//         city.parentElement.children[1].textContent = resultObj.cloud_pct;
//         city.parentElement.children[2].textContent = resultObj.temp;
//         city.parentElement.children[3].textContent = resultObj.feels_like;
//         city.parentElement.children[4].textContent = resultObj.humidity;
//         city.parentElement.children[5].textContent = resultObj.min_temp;
//         city.parentElement.children[6].textContent = resultObj.max_temp;
//         city.parentElement.children[7].textContent = resultObj.wind_speed;
//         city.parentElement.children[8].textContent = resultObj.wind_degrees;
//         const sunriseTimestamp: number = resultObj.sunrise;
//         const sunsetTimestamp: number = resultObj.sunset;
//         const sunriseDate: Date = new Date(sunriseTimestamp * 1000);
//         const sunsetDate: Date = new Date(sunsetTimestamp * 1000);
//         const sunrise: string = formatTime(sunriseDate);
//         const sunset: string = formatTime(sunsetDate);
//         city.parentElement.children[9].textContent = sunrise;
//         city.parentElement.children[10].textContent = sunset;
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   }
// }
export class WeatherComponent {
  constructor(private titleService:Title, private el: ElementRef, private http: HttpClient){
    this.titleService.setTitle("Weather Forcasting");
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