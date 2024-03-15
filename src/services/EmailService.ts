// import { SPHttpClient, SPHttpClientResponse , ISPHttpClientOptions} from '@microsoft/sp-http';
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import LoggerService from './LoggerService';
import * as emailjs from 'emailjs-com';
import LoggerService from './LoggerService';



// const  sendEmail = async(to: string, subject: string, body: string,webUrl:string,context:WebPartContext): Promise<void> => {
//     const endpointUrl = `${webUrl}/_api/SP.Utilities.Utility.SendEmail`;
  
//     const emailProperties = {
//       To: [to],
//       Subject: subject,
//       Body: body,
//       From: '',
//     };
  
//     const headers: Headers = new Headers();
//     headers.append('Accept', 'application/json;odata=nometadata');
//     headers.append('Content-Type', 'application/json');
  
//     const spHttpClientOptions: ISPHttpClientOptions = {
//       body: JSON.stringify({
//         properties: emailProperties,
//       }),
//       headers: headers,
//     };
  
//     const response: SPHttpClientResponse = await context.spHttpClient.post(endpointUrl, SPHttpClient.configurations.v1, spHttpClientOptions);
  
//     if (response.ok) {
//       // Email sent successfully
//       LoggerService.log(` sending email Sucess`);
//     } else {
//       // Handle the error
//       LoggerService.error(`Error sending email: ${response.statusText}`);
//     }
  
  
    
//   }

const  sendEmail = async(toName:string,toEmail:string,toScore:number,toTotal:number): Promise<void> => {

  const Data = {
    to_name: toName,
    to_email: toEmail,
    to_score:toScore,
    to_total:toTotal
  }
const serviceID = 'service_68tzaoh';
const templateID = 'template_0uovg8f';
const userID = 'qHWqbeGv0FqXDpmH2';
  
emailjs.send(serviceID,templateID,Data,userID).then((response) => {
if(response)
{
  LoggerService.log(`Email Sent Sucessfully`);
}
else{
  LoggerService.error('Error Sending Email');
}
})
}


  export default sendEmail;