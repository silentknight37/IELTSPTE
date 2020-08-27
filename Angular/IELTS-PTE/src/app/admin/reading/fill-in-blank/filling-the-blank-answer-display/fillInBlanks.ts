export class FillInBlanks{
    qestion:RequestText[];
    answers:string[];
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
    selectAnswer?:string;
    isRemove:boolean;
  }

  export class Question{
    id:number;
    questionName: string;
    questionDetails:QuestionSetup;
    fullQuestion: FillInBlanks;
  }

  export class Questions{
    questionList:Question[];
  }

  export class Answer{
    answerName:string;
  }

  export class QuestionSetup{
    id:number;
    subject:string;
    question:string;
    timer:number;
    isFree:boolean;
    status:boolean;
    answerList:string[];
    modalId?:string;
    targetId?:string;
  }