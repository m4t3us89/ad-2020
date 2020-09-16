
export interface IMail{
    sendEmail(from : string, to : string, subject : string , html : string) : Promise<void>
}