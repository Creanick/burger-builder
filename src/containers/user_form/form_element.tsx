import React, { Fragment } from "react";
import styled from "styled-components";
import Input from "../../components/input/input";
abstract class FormElement{
    private _value: string;
    protected touched:boolean = false;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this.touched = true;
        this._value = value;
    }
    public id:string;
    constructor(id:string,value:string){
        this.id = id;
        this._value = value;
    }
    abstract get isValid():boolean;
    abstract build(onChange:(newValue:string,id:string)=>void):JSX.Element;
}

export class InputElement extends FormElement{
    public type:string;
    public placeholder:string;
    public name: string;
    public validityCheck?:(value:string)=>boolean
    constructor(props:{type:string,id:string,placeholder:string,name:string,value:string},validityCheck?:(value:string)=>boolean){
        super(props.id,props.value);
        this.type = props.type;
        this.placeholder = props.placeholder;
        this.name = props.name;
        this.validityCheck = validityCheck;
    }
    get isValid(): boolean {
        if(this.validityCheck){
            return this.validityCheck(this.value);
        }
        return true;
    }
    get showError():boolean{
        return !this.isValid && this.touched;
    }
    build(onChange:(newValue:string,id:string)=>void): JSX.Element {
       return (
           <Fragment key={this.id+"fragment"}>
               <Input 
               isValid={!this.showError}
               onChange={event=>onChange(event.target.value,this.id)}
               key={this.id}
               name={this.name}
               type={this.type} 
               placeholder={this.placeholder} 
               value={this.value}/>
               {this.showError && <ErrorText>{this.name} is invalid</ErrorText>}
           </Fragment>
       );
    }
}
export class Option{
    public value:string;
    public displayValue: string;
    constructor(value:string,display:string){
        this.value = value;
        this.displayValue = display;
    }
}
export class SelectElement extends FormElement{
    public name: string;
    public options:Option[];
    public label:string;
    constructor(obj:{id:string,name:string,value:string,options:Option[],label?:string}){
        super(obj.id,obj.value);
        this.name = obj.name;
        this.options = obj.options;
        this.label = obj.label || this.name;
    }
    get isValid(): boolean {
        return true;
    }
    build(onChange:(newValue:string,id:string)=>void): JSX.Element {
       return (
           <div key={this.id+'wrapper'}>
               <label key={this.label+"label"}>
                    {this.label}
               </label>
           <Select key={this.id} name={this.name} id={this.id}
           value={this.value}
           onChange={event=>onChange(event.target.value,this.id)}
           >
               {this.options.map(option=>(<option key={option.value} value={option.value}
               >
                   {option.displayValue}
               </option>))}
           </Select>
           </div>
       );
    }
}
const Select = styled.select`
    padding: 10px 10px;
    margin: 10px;
`;
const ErrorText = styled.p`
    color: red;
    text-align: left;
    width: 60%;
    margin: auto;
`;

export default FormElement;