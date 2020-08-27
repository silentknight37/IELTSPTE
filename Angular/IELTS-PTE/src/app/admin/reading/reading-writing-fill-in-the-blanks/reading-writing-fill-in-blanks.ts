export class QuestionSetup{
    id:number;
    subject:string;
    question:string;
    timer:number;
    isFree:boolean;
    status:boolean;
  }

  export class ReadingWritingFillInTheBlanks
  {
    qestion:RequestText[];
    timer:number;
  }

  export class RequestText{
    text:string;
    textType:number;
    requestAnswer:Answers;
  }

  export class Answers{
    id:number;
    correctAnswer:string;
    otherAnswer:string[];
    selectAnswer?:string;
  }

  export class Question{
    questionId:number;
    questionName: string;
    questionDetails:QuestionSetup;
    fullQuestion: ReadingWritingFillInTheBlanks;
  }

  export class Questions{
    questionList:Question[];
  }

  export class Answer{
    answerName:string;
  }