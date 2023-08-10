import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { skill } from '../../model/resume-form';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {


  resumeForm!: FormGroup
  constructor(
    private _fb: FormBuilder,
    private _resumeService: ResumeService
  ) { }

  ngOnInit(): void {

    this.createResumeForm()


  }

  createResumeForm(): FormGroup {
    return this.resumeForm = this._fb.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      education: this._fb.array(['']),
      schoolUni: this._fb.array(['']),
      skillsArray: this._fb.array([]),
      langEnglish: [null],
      langHindi: [null],
      langMarathi: [null],
      objective: [null, Validators.required],

    })

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  skills: skill[] = [{ name: 'html' }, { name: 'css' }, { name: 'javascript' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {

      this.skills.push({ name: value });
      // console.log(this.skills);
      // console.log(this.f['skills']);

    }


    event.chipInput!.clear();
  }

  remove(sk: skill): void {
    const index = this.skills.indexOf(sk);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  onResumeFormSubmit() {

    if (this.resumeForm.valid && this.skills.length > 0) {
      console.log(this.resumeForm.value);

      this.f['skillsArray'].value.push(...this.skills)
      // console.log(this.resumeForm.controls['skillsArray'].value);
      this._resumeService.addResume(this.resumeForm.value)
        .subscribe(res => {
          console.log(res);

        })
    }
  }

  get f() {
    return this.resumeForm.controls
  }


  get EducationFormsArray() {
    return this.resumeForm.get('education') as FormArray
  }

  get schoolUniFormsArray() {
    return this.resumeForm.get('schoolUni') as FormArray
  }

  addEduction() {
    if ((this.EducationFormsArray && this.schoolUniFormsArray).length < 4) {

      this.EducationFormsArray.push(new FormControl(null))
      this.schoolUniFormsArray.push(new FormControl(null))
    }
  }

  onRemoveEdu(id: number) {
    this.EducationFormsArray.removeAt(id)
    this.schoolUniFormsArray.removeAt(id)
  }
}


