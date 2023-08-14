import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Iresume, skill } from '../../model/resume-form';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResumeComponent } from '../resume/resume.component';
import { SnackbarService } from '../../services/snackbar.service';
import { DeleteConfirmationComponent } from '../../material/delete-confirmation/delete-confirmation.component';
import { CustomRegex } from '../../const/validators_regexp';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {


  resumeForm!: FormGroup
  skills: skill[] = [];
  employmentArray: Array<string> = ['Fresher', 'Experinced']

  constructor(
    private _fb: FormBuilder,
    private _resumeService: ResumeService,
    private _router: Router,
    private _dialogRef: MatDialogRef<ResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public resObj: Iresume,
    private _snackbarService: SnackbarService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.createResumeForm()
    // this.skills = this.resumeForm.controls['skillsArray'].value as Array<skill>

    // console.log(this.resObj);

    if (this.resObj) {
      // console.log(this.resObj);

      this.resumeForm.patchValue(this.resObj)
      // console.log(this.resObj.skillsArray.length, 'skillarrayapilenght');
      for (let i = 0; i < this.resObj.skillsArray.length; i++) {
        // console.log(this.resObj.skillsArray[i]);
        this.skills.push(this.resObj.skillsArray[i])
        // this.SkillsFormsArray.push(new FormControl({ name: this.resObj.skillsArray[i].name }))
        this.SkillsFormsArray.push(new FormControl(this.resObj.skillsArray[i]))
        // console.log(this.skills, 'afterpushed', this.resumeForm.controls['skillsArray'].value);
      }
      // console.log(this.resObj.education)
      // console.log(this.resObj.board)
      for (let i = 1; i < this.resObj.education.length; i++) {
        this.EducationFormsArray.push(new FormControl(this.resObj.education[i]))

      }
      for (let i = 1; i < this.resObj.board.length; i++) {
        this.boardFormsArray.push(new FormControl(this.resObj.board[i]))

      }
      if (this.resObj.employment.includes('Experinced')) {
        this.resumeForm.addControl('companyName',new FormControl(this.resObj.companyName, Validators.required))
        this.resumeForm.addControl('experience',new FormControl(this.resObj.experience, Validators.required))
        this.resumeForm.addControl('designation',new FormControl(this.resObj.designation, Validators.required))
      }else{
        this.resumeForm.removeControl('companyName')
        this.resumeForm.removeControl('experience')
        this.resumeForm.removeControl('designation')
      }

    }

    this.f['employment'].valueChanges
    .subscribe(res => {
      // console.log(res);
      if (res.includes('Experinced')) {
        
        this.resumeForm.addControl('companyName',new FormControl(null, Validators.required))
        this.resumeForm.addControl('experience',new FormControl(null, Validators.required))
        this.resumeForm.addControl('designation',new FormControl(null, Validators.required))
      }else{
        this.resumeForm.removeControl('companyName')
        this.resumeForm.removeControl('experience')
        this.resumeForm.removeControl('designation')


      }
      // console.log(this.resumeForm.value);
      
    })


  }

  createResumeForm(): FormGroup {
    return this.resumeForm = this._fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(CustomRegex.email)]], 
      phone: [null, [Validators.required, Validators.pattern(CustomRegex.phone)]],
      address: [null, Validators.required],
      education: this._fb.array([null]),
      board: this._fb.array([null]),
      employment:[null, Validators.required], //
      skillsArray: this._fb.array([]),
      langEnglish: [null],
      langHindi: [null],
      langMarathi: [null],
      objective: [null, Validators.required],
      hobby: this._fb.array([this._fb.control(null, Validators.required)])
    })

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      // (this.resumeForm.controls['skillsArray'].value as Array<skill>).push({ name: value });
      this.SkillsFormsArray.push(new FormControl({ name: value }))
      this.skills.push({ name: value });
      // console.log(this.skills, 'localArray');
      // console.log(this.SkillsFormsArray.value, 'formarry');

    }
    event.chipInput!.clear();
  }

  remove(sk: skill): void {
    const index = this.skills.indexOf(sk);

    if (index >= 0) {
      (this.resumeForm.controls['skillsArray'].value as Array<skill>).splice(index, 1)
      this.skills.splice(index, 1);
      // console.log(this.skills, 'localArray');
      // console.log(this.SkillsFormsArray.value, 'formarry');
    }
  }

  onResumeFormSubmit() {

    if (this.resumeForm.valid) {
      console.log(this.resumeForm.value);
      // console.log(this.resumeForm.controls['skillsArray'].value);

      // this.f['skillsArray'].value.push(...this.skills) // no need
      // console.log(this.resumeForm.controls['skillsArray'].value);


      this._resumeService.addResume(this.resumeForm.value)
        .subscribe(res => {
          // console.log(res.name, 'key here');
          this._snackbarService.openSnackBar(`${this.resumeForm.controls['fullName'].value}'s resume Created Successfully`)
          this._dialogRef.close()
          this._router.navigate([res.name])

        })


    }
  }

  onUpdate() {

    if (this.resumeForm.valid) {

      // console.log(this.resObj.id);
      this._resumeService.updateResume(this.resObj.id!, this.resumeForm.value)
        .subscribe(res => {
          // console.log(res);
          this._router.navigate([this.resObj.id])
          this._snackbarService.openSnackBar(`${this.resumeForm.controls['fullName'].value}'s resume Updated Successfully`)

        })

    }

  }
  get f() {
    return this.resumeForm.controls
  }


  get EducationFormsArray() {
    return this.resumeForm.get('education') as FormArray
  }

  get boardFormsArray() {
    return this.resumeForm.get('board') as FormArray
  }

  get SkillsFormsArray() {
    return this.resumeForm.get('skillsArray') as FormArray

  }
  
  get hobbyFormsArray() {
    return this.resumeForm.get('hobby') as FormArray

  }
  addEduction() {
    if ((this.EducationFormsArray && this.boardFormsArray).length < 4) {

      this.EducationFormsArray.push(new FormControl(null, [Validators.required]))
      this.boardFormsArray.push(new FormControl(null, [Validators.required]))
    }
  }

  onRemoveEdu(id: number) {
    this.EducationFormsArray.removeAt(id)
    this.boardFormsArray.removeAt(id)
  }

  addHobby() {
    if (this.hobbyFormsArray.length < 3) {
      this.hobbyFormsArray.push(new FormControl(null, [Validators.required]))
    }
  }

  onRemoveHobby(id: number) {
    this.hobbyFormsArray.removeAt(id)
  }


  onDelete(){
    this._dialog.open(DeleteConfirmationComponent).afterClosed()
        .subscribe(res => {
          // console.log('delete', res, this.resObj.id);
          if (res) {
            this._resumeService.deleteResume$.next(res)
            this._resumeService.deleteResume(this.resObj.id!) 
              .subscribe(res => {
                // console.log(res);
                this._snackbarService.openSnackBar('Delete Successfully.....!!!')
                this._router.navigate([''])
              })
          }
        })
  }
}


