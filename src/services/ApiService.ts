import * as React from 'react';
import { useState, useEffect } from 'react';
// import {HttpClient,HttpClientResponse} from '@microsoft/sp-http';
import { ITimeIqQuizProps } from '../webparts/timeIqQuiz/components/ITimeIqQuizProps';
import { HttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';
// import { sp } from '@pnp/sp';



interface ApiServiceProps {
  baseUrl: string;
  context: ITimeIqQuizProps['context'];
}

const ApiService: React.FC<ApiServiceProps> = ({ baseUrl ,context}) => {
  const [data] = useState<any>(null);
  // const [currentTime, setCurrentTime] = useState<string>('Loading...');

  useEffect(() => {
    alert('In');


    const fetchData = async () => {

      const url = 'https://timeapi.io/api/Time/current/zone?timezone=UTC';
const httpClientOptions: IHttpClientOptions = {
    headers: new Headers(),
    method: "GET",
    mode: "cors"};
     
      try {
        const response: HttpClientResponse = await context.httpClient.get(url, HttpClient.configurations.v1, httpClientOptions);
        const data = await response.json();
   
        // Process the data received from the API
        console.log(data);
        alert('Done');
      } catch (error) {
        // Handle errors
        console.error('Error making HTTP request:', error);
      }
    };
   
 
    fetchData();
  }, []);

  return data;
};









export default ApiService;