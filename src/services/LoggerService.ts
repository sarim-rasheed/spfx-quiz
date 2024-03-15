// LoggerService.ts

class LoggerService {
    static log(message: string): void {
      console.log(`[INFO] ${getTimestamp()} - ${message}`);
    }
  
    static warn(message: string): void {
      console.warn(`[WARN] ${getTimestamp()} - ${message}`);
    }
  
    static error(message: string): void {
      console.error(`[ERROR] ${getTimestamp()} - ${message}`);
    }
  }
  
  const getTimestamp = (): string => {
    return new Date().toISOString();
  };
  
  export default LoggerService;
  