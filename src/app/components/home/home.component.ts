import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { AutenticationService } from 'src/app/services/autentication.service';
import { PostNoticesService } from 'src/app/services/post-notices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFile } from 'src/app/shared/models/Ifile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  atentication = '';
  userName = '';

  hideprogressBar: boolean = false;
  percentDone: number = 0;
  selectedFiles: IFile[] = [];
  formData: FormData = new FormData();
  @ViewChild("imageContainer") imageContainer: ElementRef;
  constructor(
    private router: Router,
    private srvAuth: AutenticationService,
    private srvPostNotice: PostNoticesService,
    private snackbar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.atentication = JSON.parse(localStorage.getItem('Autentication'));
  }

  ngOnInit(): void {
    this.stateAutentication();
    if(this.atentication != undefined) {
      this.myUser();
    }    
  }

  stateAutentication() {
    console.log('Autentificando=',this.atentication );
    if(this.atentication == undefined) {
      console.log('Sorry, return to login');
      this.router.navigate(['/login']);
    } else {
      console.log('Welcome to the page');
    }
  }

  signOut() {
    localStorage.removeItem('Autentication');
    this.router.navigate(['/login']);
  }
  myUser() {
    this.srvAuth.getLoggedInUser().subscribe(data=> {
      this.userName = data['fullName'];
    });
  }
  get fileName() {
    let name: string = "";
    Array.from(this.selectedFiles).forEach((file: IFile) => {
      name = name.concat(file.name, " ");
    })
    return name;
  }
  onSelectFile(event: any) {

    Array.from(event.target.files).forEach((file: any) => {
      //this.formData.append(file.name, file);
      //get Base64 string    
      this.getBase64(file, (res: any) => {
        this.formData.append(file.name, res);
        // display image preview
        this.selectedFiles.push({ name: file.name, value: res });
      })
      console.log('imagen=', this.selectedFiles);
    });
  }

  getBase64(file: any, callBack: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callBack(reader.result);
    };
    reader.onerror = (error) => {
      callBack(null);
      this.snackbar.open('Error', "error", { duration: 5000 });

    };
  }
  onUploadClick() {
    this.hideprogressBar = false;
    console.log('Entre al click');
    this.srvPostNotice.uploadFile(this.formData).subscribe((res: any) => {
      if (res.type === HttpEventType.Response) {
        this.snackbar.open('Upload complete', "Okay", { duration: 5000 });
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * res.loaded / res.total);
      }

    })
    /*this.fileUploadService.uploadFile(this.formData).subscribe((res: any) => {
      if (res.type === HttpEventType.Response) {
        this.snackbar.open('Upload complete', "Okay", { duration: 5000 });
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * res.loaded / res.total);
      }
    })*/
  }
}
