import * as React from 'react';
import styles from './TimeIqQuiz.module.scss';
import type { ITimeIqQuizProps } from './ITimeIqQuizProps';
import { useState, useEffect } from 'react';
import { ListCreationService } from '../../../services/ListCreationService';
import { listConfigurations} from '../../../lists/listConfigurations';
import Form from '../../../components/Form/Form';
import Quiz from '../../../components/Quiz/Quiz';
import LoggerService from '../../../services/LoggerService';
import { sp } from '@pnp/sp';

 


const TimeIqQuiz : React.FC<ITimeIqQuizProps> =(props) => {
  const {webUrl,context} = props;
  const[showForm, setShowForm] = useState<boolean>(false);
  const[showQuiz,setShowQuiz] = useState<boolean>(false);
  const[showInstructions,setShowInstructions] = useState<boolean>(true);
  const[userID,setUserID] = useState<number>(0);
  const[userEmail,setUserEmail] = useState<string>('');

  sp.setup({
    sp: { 
      baseUrl: webUrl, 
    },
  });
useEffect(() => {
  const createLists = async () => {
    for (const item of listConfigurations) {
      await ListCreationService.createListWithColumns(item.listName, item.columns, item.Record);
    };
  
  };
createLists();
},[])


//To Show Quiz Functionallity Here..
  const handleQuiz = (UserId:number,userEmail:string) => {
    setUserEmail(userEmail)
    setUserID(UserId);
    setShowForm(false);
    setShowQuiz(true);
    LoggerService.warn(`Showing Quiz`);

  }

//To Show Form Functionallity Here..
  const handleButton = () => {

    setShowForm(true);
    setShowQuiz(false);
    setShowInstructions(false);
    LoggerService.warn(`Showing Form`);
  };

//   const handleApi = () => {
// return <ApiService context={context} baseUrl=''/>
//   };

 
    return (
      <section className={`${styles.timeIqQuiz}`}>

           {!showForm && !showQuiz ? 
           <div className={styles.action}>
          <button className={styles.actionButton} onClick={handleButton}>Get started</button>
          </div>  : 
          showForm && !showQuiz ?
          <Form onNextClick={handleQuiz} webUrl={webUrl}/>
           :
          <Quiz  webUrl={webUrl} userID={userID} context={context} userEmail={userEmail}/>
         }
         {showInstructions ?
        <div className={styles.action}>
        <ul className={styles.instructions}>
        <li>Provide your full name, country, and email in the form.</li>
        <li>For each quiz question, choose only one answer option.</li>
        <li>Quiz results will be shown after completing all questions.</li>
        <li>Ensure to review your answers before submitting the quiz.</li>
        <li>Complete your quiz within the given time.</li>
        <li>The total quiz duration is determined by the number of questions, with each question allocated a fixed time of 10 seconds.</li>
        </ul>
      </div> : ''
         }

      </section>
    );
  }
export default TimeIqQuiz;
