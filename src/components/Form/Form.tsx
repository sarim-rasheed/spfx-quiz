import * as React from 'react';
import styles from './Form.module.scss';
import { useState } from 'react';
import {addItem} from '../../webparts/timeIqQuiz/services/ListService';
import LoggerService from '../../services/LoggerService';



export interface IComponent1Props {
	onNextClick: (UserId:number,userEmail:string) => void;
	webUrl : string;
}

const Form: React.FC<IComponent1Props> = ({ onNextClick,webUrl}) => {

const [formInput,setFormInput] = useState({
	Title:'',
	Country:'',
	Email:''
});

//To Handle User Information Functionallity Here...
const handleInput  = (event:any) => {
const name = event.target.name;
const value = event.target.value;
setFormInput((prev) => {
    return { ...prev, [name]: value };
  });
}

//To Check Validation & User Information Submiting Functionallity Here...
const handleSubmit  = async () =>{
const isValid = formInput.Title != '' && formInput.Email != '' && formInput.Country != '' ? true:false;
  if(isValid)
  {
	const addedItemId: number = await  addItem(webUrl,'Users',formInput);
		onNextClick(addedItemId,formInput.Email);
	
  }
  else
  {
	alert('All Fields Are Required!');
	LoggerService.warn('All Fields are Required');
}
}


return (
<div>
	<div className={styles.card}>
	
		<div className={styles.cardForm}>
			<div className={styles.input}>
				<input type="text" className={styles.inputField} name='Title'  onChange={handleInput} />
				<label className={styles.inputLabel}>Full Name<span> *</span></label>
			</div>
						<div className={styles.input}>
				<input type="text" className={styles.inputField} name='Country' onChange={handleInput} />
				<label className={styles.inputLabel}>Country<span> *</span></label>
			</div>
						<div className={styles.input}>
       <input type="text" className={styles.inputField} name='Email' onChange={handleInput} />
				<label className={styles.inputLabel}>Email<span> *</span></label>
			</div>
			<div className={styles.action}>
				<button className={styles.actionButton} onClick={handleSubmit}>Start Quiz</button>
			</div>
		</div>
	</div>
</div>
)
}


export default Form;