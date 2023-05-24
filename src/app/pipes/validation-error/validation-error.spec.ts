import { FormControl, Validators } from '@angular/forms';
import { regexList } from 'src/app/shared/constants/constants';
import { ValidationErrorPipe } from './validation-error.pipe';

fdescribe('ValidationErrorPipe', () => {
  let pipe:ValidationErrorPipe

  beforeEach(() => {
    pipe = new ValidationErrorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return passed message',()=>{
    let control = new FormControl('',[Validators.required]);
    let message = 'email is required'
    expect(pipe.transform(control,'',message)).toBe(message);
  })

  it('should return field is required message',()=>{
    let control = new FormControl('',[Validators.required]);
    expect(pipe.transform(control,'email')).toBe('email is required.');
  })

  it('should return email not valid',()=>{
    let control = new FormControl('sdsds',[Validators.pattern(regexList.email)]);
    expect(pipe.transform(control,'email')).toBe('Enter a valid Email');
  })
  
  it('should return email not valid',()=>{
    let control = new FormControl('sdsds',[Validators.email]);
    expect(pipe.transform(control,'email')).toBe('email is not valid.');
  })

  it('should return milength message',()=>{
    let control = new FormControl('sdsds',[Validators.minLength(6)]);
    expect(pipe.transform(control,'username')).toBe('username length must be at least 6');
  })

  it('should return maxlength message',()=>{
    let control = new FormControl('sdsdsss2',[Validators.maxLength(7)]);
    expect(pipe.transform(control,'username')).toBe('username length must be less than 7');
  })

  it('should return not valid url message',()=>{
    let control = new FormControl('https://gmail',[Validators.pattern(regexList.url)]);
    expect(pipe.transform(control,'url')).toBe('url is not a valid url.');
  })


  it('should return not valid url message',()=>{
    let control = new FormControl('https://gmail',[Validators.pattern(regexList.url)]);
    expect(pipe.transform(control,'wesbite')).toBe('');
  })

});
