import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface ITimeIqQuizProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  webUrl:string;
}
