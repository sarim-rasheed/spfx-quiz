import * as React from 'react';
import styles from './Quiz.module.scss';
import { useState, useEffect } from 'react';
import { getItems, getItem, addItem } from '../../webparts/timeIqQuiz/services/ListService';
import { v4 as uuid } from "uuid";
import sendEmail from '../../services/EmailService';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import LoggerService from '../../services/LoggerService';


export interface IComponent2Props {
  webUrl : string;
  userID:number;
  context:WebPartContext;
  userEmail:string;
}

const Quiz: React.FC<IComponent2Props> = ({ webUrl,userID,context,userEmail }) => {


  const [quizData, setQuizData] = useState<any[]>([]);
  const [quizQues, setQuizQues] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<any[]>([]);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [selected,setSelected] = useState<string>('');
  const [timerEnd,setTimerEnd] = useState(false);
  const [seconds,setSeconds] = useState(0);
  const [minutes,setMinutes] = useState(0);
  const [GUID,setGUID] = useState<string>('');
  

  var timer:any;

//To Fetch All Answers Functionallity Here...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems(webUrl, 'Answers');
  // Calculate seconds and minutes based on data length...
        const length = data.length;
        const totalSeconds = length * 10; 
        const calculatedMinutes = Math.floor(totalSeconds / 60);
        const calculatedSeconds = totalSeconds % 60;
        setSeconds(calculatedSeconds);
        setMinutes(calculatedMinutes);
        const filtered = data.map((item: any) => ({
          questionId: item.QuestionId,
          options: [item.OptionA, item.OptionB, item.OptionC, item.OptionD],
          answer: item.RightOption,
        }));
        setQuizData(filtered);
        LoggerService.log('Data Fetch Sucessfully');
      } catch (error) {
        LoggerService.error(`Error While Fetch Data ${error}`);
      }
    };
  
    fetchData();
    setGUID(uuid());

  }, []);
  
// To Set Timer Functionallity Here..
  useEffect(() => {
    timer = setInterval(()=>{
      if(currentQuestion >= quizData.length || ( seconds === 0 && minutes === 0))
      {
        clearInterval(timer);
        setTimerEnd(true);
      }
      else
      {
      setSeconds(seconds - 1);
      if(seconds === 0 && minutes != 0)
      {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      }
    },1000)
  
    return ()=> clearInterval(timer);
  });
  


//To Get Specific Question base on Question ID Functionallity Here...
  const handleQues = async (Id: number) => {
    try {
      const data = await getItem(webUrl, 'Questions', Id);
      setQuizQues(data.Title);
    } catch (error) {
      LoggerService.error(`Error fetching data: ${error}`)
    }
  };
  

//To Display Result Functionallity Here...
  const displayResult = () => {
    setResultMessage(`You scored ${score} out of ${quizData.length}!`);
    saveData();
  };

//To Display Question Functionallity Here...
  const displayQuestion = () => {
    const questionData = quizData[currentQuestion];
    handleQues(questionData.questionId)
    return (
      <div>
        <label className={styles.question}>{quizQues}</label><br/><br/>
        <div className={styles.options}>
          {questionData.options.map((option: string, index: number) => (
            <label key={index} className={styles.option}>
              <input
                type="radio"
                name="quiz"
                value={option}
                onChange={() => setSelected(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };

//To Handle User Choice Functionallity Here...
  const handleSubmit = (selectedOption: string) => {
    let response = { UserId:userID, QuestionId:quizData[currentQuestion].questionId, UserSelection:selectedOption, Right: true,QuizID:GUID}
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
      response.Right = true;
    } else {
      response.Right = false;
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          question: quizData[currentQuestion].questionId,
          incorrectAnswer: selectedOption,
          correctAnswer: quizData[currentQuestion].answer,
        },
      ]);
    }
    addItem(webUrl,'User Responses',response);
    // if(timerEnd || currentQuestion + 1>= quizData.length)
    // {
    //   saveData();
    // }
    setCurrentQuestion(currentQuestion + 1);
    setSelected('');
  };


//To Save Result In SP Functionallity Here...
  const  saveData = () => {
    let item = { UserId:userID, TotalAttempt: quizData.length, Score: score,QuizID:GUID}
    addItem(webUrl,'Quiz Reports',item);
sendEmail("Hey Applicant",userEmail,score,quizData.length);
   
    }


//For Retry Quiz Functionallity Here...    
const retryQuiz = () => {
  setCurrentQuestion(0);
  setGUID(uuid());
  setIncorrectAnswers([]);
  setResultMessage('');
  setTimerEnd(false);
  setScore(0);

  const length = quizData.length;
  const totalSeconds = length * 10; 
  const calculatedMinutes = Math.floor(totalSeconds / 60);
  const calculatedSeconds = totalSeconds % 60;
  setSeconds(calculatedSeconds);
  setMinutes(calculatedMinutes);
}
      
      
  return (
    <div>
      <div className={styles.card}>
        <h1 className={styles.h1}>Quiz {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        {currentQuestion < quizData.length && !timerEnd && displayQuestion()}
        <div className={styles.result}>{resultMessage}</div>
        <div className={styles.action}>
        {!timerEnd && currentQuestion < quizData.length  &&(
          <button className={styles.actionButton} onClick={() => handleSubmit(selected)}>
            Submit
          </button>
        )}
        {(timerEnd || currentQuestion >= quizData.length) && (
            <button className={styles.actionButton} onClick={() => displayResult()}>
            View Results
          </button>
          )}
          {(timerEnd || currentQuestion >= quizData.length) && (
            <button className={styles.actionButton} onClick={() => retryQuiz()}>
            Retry
          </button>
          ) 
        }
        </div>
      </div>
    </div>
  );
};

export default Quiz;

