export class QuestionSetup{
    id:number;
    subject:string;
    question:string;
    timer:number;
    isFree:boolean;
    status:boolean;
    questionSummary?:string;
    selectedImage?:any;
    imagePath?:string;
  }

  export class ReadingWritingFillInTheBlanks
  {
    qestion:RequestText[];
    timer:number;
    answers:string[];
  }
  
  export class SelectChoiceQuestions
  {
    qestion:RequestTextForSelectChoice[];
    timer:number;
    answers:string[];
  }

  export class RequestText{
    text:string;
    textType:number;
    requestAnswer:Answers;
  }

  export class RequestTextForSelectChoice{
    text:string;
    textType:number;
    requestAnswer:AnswersForSelectChoice[];
    selectAnswers:AnswersForSelectChoice[];
  }

  export class Answers{
    id:number;
    correctAnswer:string;
    otherAnswer:string[];
    selectAnswer?:string;
  }

export class AnswersForSelectChoice{
    id:number;
    isCorrectAnswers:boolean;
    answerText:string;
    selected:boolean;
  }
  

  export class Question{
    questionId:number;
    questionName: string;
    questionDetails:QuestionSetup;
    fullQuestion: ReadingWritingFillInTheBlanks;
  }

  export class QuestionForSelect{
    questionId:number;
    questionName: string;
    questionDetails:QuestionSetup;
    fullQuestion: SelectChoiceQuestions;
  }

  export class Questions{
    questionList:Question[];
  }

  export class Answer{
    answerName:string;
  }

  export class ApiURL{
    apiURL:string;
    backURL:string;
    title:string;
    istts:boolean;
    placeHolder:string;
    isSummarySetup:boolean;
  }

  export class ReviewEmail{
    reviewText:string;
    reviewQuestion:string;
  }