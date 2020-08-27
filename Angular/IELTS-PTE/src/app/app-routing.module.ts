import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FillingTheBlankAnswerDisplayComponent } from './admin/reading/fill-in-blank/filling-the-blank-answer-display/filling-the-blank-answer-display.component';
import { UsersDisplayComponent } from './user/users-display/users-display.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { ReadingWritingFillInTheBlanksQuestionSetupComponent } from './admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks-question-setup/reading-writing-fill-in-the-blanks-question-setup.component';
import { ReadingWritingFillInTheBlanksAnswerDisplayComponent } from './admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks-answer-display/reading-writing-fill-in-the-blanks-answer-display.component';
import { QuestionListAdminComponent } from './admin/pages/question-list-admin/question-list-admin.component';
import { FillingTheBlankListingComponent } from './admin/reading/fill-in-blank/filling-the-blank-listing/filling-the-blank-listing.component';
import { FillingTheBlankQuestionSetupWithHeadersComponent } from './admin/reading/fill-in-blank/filling-the-blank-question-setup/filling-the-blank-question-setup-with-headers/filling-the-blank-question-setup-with-headers.component';
import { ReadingWritingFillInTheBlanksAnswerListingComponent } from './admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks-answer-listing/reading-writing-fill-in-the-blanks-answer-listing.component';
import { ReOrderParagaphListComponent } from './admin/reading/re-order-paragaph/re-order-paragaph-list/re-order-paragaph-list.component';
import { ReOrderParagaphSetupComponent } from './admin/reading/re-order-paragaph/re-order-paragaph-setup/re-order-paragaph-setup.component';
import { ReOrderParagaphDisplayComponent } from './admin/reading/re-order-paragaph/re-order-paragaph-display/re-order-paragaph-display.component';
import { RepeatSentenceListComponent } from './admin/speaking/repeat-sentence/repeat-sentence-list/repeat-sentence-list.component';
import { RepeatSentenceSetupComponent } from './admin/speaking/repeat-sentence/repeat-sentence-setup/repeat-sentence-setup.component';
import { RepeatSentenceDisplayComponent } from './admin/speaking/repeat-sentence/repeat-sentence-display/repeat-sentence-display.component';
import { TestComComponent } from './pages/test-com/test-com.component';
import { ReadAloadListComponent } from './admin/speaking/read-aload/read-aload-list/read-aload-list.component';
import { ReadAloadSetupComponent } from './admin/speaking/read-aload/read-aload-setup/read-aload-setup.component';
import { ReadAloadDisplayComponent } from './admin/speaking/read-aload/read-aload-display/read-aload-display.component';
import { AnswerShortQuestionListComponent } from './admin/speaking/answer-short-question/answer-short-question-list/answer-short-question-list.component';
import { AnswerShortQuestionSetupComponent } from './admin/speaking/answer-short-question/answer-short-question-setup/answer-short-question-setup.component';
import { AnswerShortQuestionDisplayComponent } from './admin/speaking/answer-short-question/answer-short-question-display/answer-short-question-display.component';
import { WriteFromDictationListComponent } from './admin/listening/write-from-dictation/write-from-dictation-list/write-from-dictation-list.component';
import {UserAlertComponent} from './user/alert/user-alert.component';
import { WriteFromDictationSetupComponent } from './admin/listening/write-from-dictation/write-from-dictation-setup/write-from-dictation-setup.component';
import { WriteFromDictationDisplayComponent } from './admin/listening/write-from-dictation/write-from-dictation-display/write-from-dictation-display.component';
import { FillInBlanksListComponent } from './admin/listening/fill-in-blanks/fill-in-blanks-list/fill-in-blanks-list.component';
import { FillInBlanksSetupComponent } from './admin/listening/fill-in-blanks/fill-in-blanks-setup/fill-in-blanks-setup.component';
import { FillInBlanksDisplayComponent } from './admin/listening/fill-in-blanks/fill-in-blanks-display/fill-in-blanks-display.component';
import { HighlightIncorrectWordsListComponent } from './admin/listening/highlight-incorrect-words/highlight-incorrect-words-list/highlight-incorrect-words-list.component';
import { HighlightIncorrectWordsSetupComponent } from './admin/listening/highlight-incorrect-words/highlight-incorrect-words-setup/highlight-incorrect-words-setup.component';
import { HighlightIncorrectWordsDisplayComponent } from './admin/listening/highlight-incorrect-words/highlight-incorrect-words-display/highlight-incorrect-words-display.component';
import { HighlightCorrectSummaryListComponent } from './admin/listening/highlight-correct-summary/highlight-correct-summary-list/highlight-correct-summary-list.component';
import { HighlightCorrectSummarySetupComponent } from './admin/listening/highlight-correct-summary/highlight-correct-summary-setup/highlight-correct-summary-setup.component';
import { HighlightCorrectSummaryDisplayComponent } from './admin/listening/highlight-correct-summary/highlight-correct-summary-display/highlight-correct-summary-display.component';
import { SelectMissingWordSetupComponent } from './admin/listening/select-missing-word/select-missing-word-setup/select-missing-word-setup.component';
import { SelectMissingWordDisplayComponent } from './admin/listening/select-missing-word/select-missing-word-display/select-missing-word-display.component';
import { SelectMissingWordListComponent } from './admin/listening/select-missing-word/select-missing-word-list/select-missing-word-list.component';
import { SummariesSpokenTextListComponent } from './admin/listening/summaries-spoken-text/summaries-spoken-text-list/summaries-spoken-text-list.component';
import { SummariesSpokenTextSetupComponent } from './admin/listening/summaries-spoken-text/summaries-spoken-text-setup/summaries-spoken-text-setup.component';
import { SummariesSpokenTextDisplayComponent } from './admin/listening/summaries-spoken-text/summaries-spoken-text-display/summaries-spoken-text-display.component';
import { ReTellLectureListComponent } from './admin/speaking/re-tell-lecture/re-tell-lecture-list/re-tell-lecture-list.component';
import { ReTellLectureSetupComponent } from './admin/speaking/re-tell-lecture/re-tell-lecture-setup/re-tell-lecture-setup.component';
import { ReTellLectureDisplayComponent } from './admin/speaking/re-tell-lecture/re-tell-lecture-display/re-tell-lecture-display.component';
import { DescribeImageListComponent } from './admin/speaking/describe-image/describe-image-list/describe-image-list.component';
import { DescribeImageSetupComponent } from './admin/speaking/describe-image/describe-image-setup/describe-image-setup.component';
import { DescribeImageDisplayComponent } from './admin/speaking/describe-image/describe-image-display/describe-image-display.component';
import { EssayWritingListComponent } from './admin/writing/essay-writing-list/essay-writing-list.component';
import { EssayWritingSetupComponent } from './admin/writing/essay-writing-setup/essay-writing-setup.component';
import { EssayWritingDisplayComponent } from './admin/writing/essay_writing/essay-writing-display/essay-writing-display.component';
import { SummariseWritteTextDisplayComponent } from './admin/writing/summarise_written_text/summarise-writte-text-display/summarise-writte-text-display.component';
import { SummariseWritteTextListComponent } from './admin/writing/summarise_written_text/summarise-writte-text-list/summarise-writte-text-list.component';
import { SummariseWritteTextSetupComponent } from './admin/writing/summarise_written_text/summarise-writte-text-setup/summarise-writte-text-setup.component';
import { ReadingMultipleChoiceListComponent } from './admin/reading/multiple-choice/reading-multiple-choice-list/reading-multiple-choice-list.component';
import { ReadingMultipleChoiceSetupComponent } from './admin/reading/multiple-choice/reading-multiple-choice-setup/reading-multiple-choice-setup.component';
import { ReadingMultipleChoiceDisplayComponent } from './admin/reading/multiple-choice/reading-multiple-choice-display/reading-multiple-choice-display.component';
import { ReadingSingleChoiceListComponent } from './admin/reading/single-choice/reading-single-choice-list/reading-single-choice-list.component';
import { ReadingSingleChoiceSetupComponent } from './admin/reading/single-choice/reading-single-choice-setup/reading-single-choice-setup.component';
import { ReadingSingleChoiceDisplayComponent } from './admin/reading/single-choice/reading-single-choice-display/reading-single-choice-display.component';
import { ListeningMultipleChoiceListComponent } from './admin/listening/multiple-choice/listening-multiple-choice-list/listening-multiple-choice-list.component';
import { ListeningMultipleChoiceSetupComponent } from './admin/listening/multiple-choice/listening-multiple-choice-setup/listening-multiple-choice-setup.component';
import { ListeningMultipleChoiceDisplayComponent } from './admin/listening/multiple-choice/listening-multiple-choice-display/listening-multiple-choice-display.component';
import { ListeningSingleChoiceListComponent } from './admin/listening/single-choice/listening-single-choice-list/listening-single-choice-list.component';
import { ListeningSingleChoiceSetupComponent } from './admin/listening/single-choice/listening-single-choice-setup/listening-single-choice-setup.component';
import { ListeningSingleChoiceDisplayComponent } from './admin/listening/single-choice/listening-single-choice-display/listening-single-choice-display.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'register-success', component: UserAlertComponent },
  
  //QuestionList
  { path: 'admin/questions', component: QuestionListAdminComponent },

  //Reading
  //Fill in the blank
  { path: 'admin/filling-the-blanks/list', component: FillingTheBlankListingComponent },
  { path: 'admin/filling-the-blanks', component: FillingTheBlankQuestionSetupWithHeadersComponent },
  { path: 'admin/filling-the-blanks/:id', component: FillingTheBlankQuestionSetupWithHeadersComponent },
  { path: 'filling-the-blanks', component: FillingTheBlankAnswerDisplayComponent },

  //reading writing fill in the blanks
  { path: 'admin/reading-writing-fill-in-blanks/list', component: ReadingWritingFillInTheBlanksAnswerListingComponent },
  { path: 'admin/reading-writing-fill-in-blanks', component: ReadingWritingFillInTheBlanksQuestionSetupComponent },
  { path: 'admin/reading-writing-fill-in-blanks/:id', component: ReadingWritingFillInTheBlanksQuestionSetupComponent },
  { path: 'reading-writing-fill-in-blanks', component: ReadingWritingFillInTheBlanksAnswerDisplayComponent },

  //re-order-paragraph
  { path: 'admin/re-order-paragraph/list', component: ReOrderParagaphListComponent },
  { path: 'admin/re-order-paragraph', component: ReOrderParagaphSetupComponent },
  { path: 'admin/re-order-paragraph/:id', component: ReOrderParagaphSetupComponent },
  { path: 're-order-paragraph', component: ReOrderParagaphDisplayComponent },

  
  //repeat-sentence
  { path: 'admin/repeat-sentence/list', component: RepeatSentenceListComponent },
  { path: 'admin/repeat-sentence', component: RepeatSentenceSetupComponent },
  { path: 'admin/repeat-sentence/:id', component: RepeatSentenceSetupComponent },
  { path: 'repeat-sentence', component: RepeatSentenceDisplayComponent },

  //repeat-sentence
  { path: 'admin/read-aloud/list', component: ReadAloadListComponent },
  { path: 'admin/read-aloud', component: ReadAloadSetupComponent },
  { path: 'admin/read-aloud/:id', component: ReadAloadSetupComponent },
  { path: 'read-aloud', component: ReadAloadDisplayComponent },

  //answer-short-question
  { path: 'admin/answer-short-question/list', component: AnswerShortQuestionListComponent },
  { path: 'admin/answer-short-question', component: AnswerShortQuestionSetupComponent },
  { path: 'admin/answer-short-question/:id', component: AnswerShortQuestionSetupComponent },
  { path: 'answer-short-question', component: AnswerShortQuestionDisplayComponent },

  //Listening
  //write-from-dictation
  { path: 'admin/write-from-dictation/list', component: WriteFromDictationListComponent },
  { path: 'admin/write-from-dictation', component: WriteFromDictationSetupComponent },
  { path: 'admin/write-from-dictation/:id', component: WriteFromDictationSetupComponent },
  { path: 'write-from-dictation', component: WriteFromDictationDisplayComponent },

  //fillinBlanks
  { path: 'admin/fill-in-blanks/list', component: FillInBlanksListComponent },
  { path: 'admin/fill-in-blanks', component: FillInBlanksSetupComponent },
  { path: 'admin/fill-in-blanks/:id', component: FillInBlanksSetupComponent },
  { path: 'fill-in-blanks', component: FillInBlanksDisplayComponent },

  //highlight-incorrect-words
  { path: 'admin/highlight-incorrect-words/list', component: HighlightIncorrectWordsListComponent },
  { path: 'admin/highlight-incorrect-words', component: HighlightIncorrectWordsSetupComponent },
  { path: 'admin/highlight-incorrect-words/:id', component: HighlightIncorrectWordsSetupComponent },
  { path: 'highlight-incorrect-words', component: HighlightIncorrectWordsDisplayComponent },

  //highlight-correct-summary
  { path: 'admin/highlight-correct-summary/list', component: HighlightCorrectSummaryListComponent },
  { path: 'admin/highlight-correct-summary', component: HighlightCorrectSummarySetupComponent },
  { path: 'admin/highlight-correct-summary/:id', component: HighlightCorrectSummarySetupComponent },
  { path: 'highlight-correct-summary', component: HighlightCorrectSummaryDisplayComponent },

  //highlight-correct-summary
  { path: 'admin/select-missing-word/list', component: SelectMissingWordListComponent },
  { path: 'admin/select-missing-word', component: SelectMissingWordSetupComponent },
  { path: 'admin/select-missing-word/:id', component: SelectMissingWordSetupComponent },
  { path: 'select-missing-word', component: SelectMissingWordDisplayComponent },

  //highlight-correct-summary
  { path: 'admin/summaries-spoken-text/list', component: SummariesSpokenTextListComponent },
  { path: 'admin/summaries-spoken-text', component: SummariesSpokenTextSetupComponent },
  { path: 'admin/summaries-spoken-text/:id', component: SummariesSpokenTextSetupComponent },
  { path: 'summaries-spoken-text', component: SummariesSpokenTextDisplayComponent },

  //re-tell-lecture
  { path: 'admin/re-tell-lecture/list', component: ReTellLectureListComponent },
  { path: 'admin/re-tell-lecture', component: ReTellLectureSetupComponent },
  { path: 'admin/re-tell-lecture/:id', component: ReTellLectureSetupComponent },
  { path: 're-tell-lecture', component: ReTellLectureDisplayComponent },

  //describe-image
  { path: 'admin/describe-image/list', component: DescribeImageListComponent },
  { path: 'admin/describe-image', component: DescribeImageSetupComponent },
  { path: 'admin/describe-image/:id', component: DescribeImageSetupComponent },
  { path: 'describe-image', component: DescribeImageDisplayComponent },

  //essay-writing
  { path: 'admin/essay-writing/list', component: EssayWritingListComponent },
  { path: 'admin/essay-writing', component: EssayWritingSetupComponent },
  { path: 'admin/essay-writing/:id', component: EssayWritingSetupComponent },
  { path: 'essay-writing', component: EssayWritingDisplayComponent },

  //summarise-writte-text
  { path: 'admin/summarise-writte-text/list', component: SummariseWritteTextListComponent },
  { path: 'admin/summarise-writte-text', component: SummariseWritteTextSetupComponent },
  { path: 'admin/summarise-writte-text/:id', component: SummariseWritteTextSetupComponent },
  { path: 'summarise-writte-text', component: SummariseWritteTextDisplayComponent },

  //reading-multiple-choice
  { path: 'admin/reading-multiple-choice/list', component: ReadingMultipleChoiceListComponent },
  { path: 'admin/reading-multiple-choice', component: ReadingMultipleChoiceSetupComponent },
  { path: 'admin/reading-multiple-choice/:id', component: ReadingMultipleChoiceSetupComponent },
  { path: 'reading-multiple-choice', component: ReadingMultipleChoiceDisplayComponent },

  //reading-single-choice
  { path: 'admin/reading-single-choice/list', component: ReadingSingleChoiceListComponent },
  { path: 'admin/reading-single-choice', component: ReadingSingleChoiceSetupComponent },
  { path: 'admin/reading-single-choice/:id', component: ReadingSingleChoiceSetupComponent },
  { path: 'reading-single-choice', component: ReadingSingleChoiceDisplayComponent },

  //listening-multiple-choice
  { path: 'admin/listening-multiple-choice/list', component: ListeningMultipleChoiceListComponent },
  { path: 'admin/listening-multiple-choice', component: ListeningMultipleChoiceSetupComponent },
  { path: 'admin/listening-multiple-choice/:id', component: ListeningMultipleChoiceSetupComponent },
  { path: 'listening-multiple-choice', component: ListeningMultipleChoiceDisplayComponent },

  //listening-single-choice
  { path: 'admin/listening-single-choice/list', component: ListeningSingleChoiceListComponent },
  { path: 'admin/listening-single-choice', component: ListeningSingleChoiceSetupComponent },
  { path: 'admin/listening-single-choice/:id', component: ListeningSingleChoiceSetupComponent },
  { path: 'listening-single-choice', component: ListeningSingleChoiceDisplayComponent },

  //User Managments
  { path: 'admin/user-management-list', component: UsersDisplayComponent },
  { path: 'admin/user-management-form', component: UsersFormComponent },
  { path: 'admin/user-management-reg', component: UserRegistrationComponent },

  { path: 'test-com', component: TestComComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//,{ useHash: true }
  exports: [RouterModule],
  //providers:[{provide:APP_BASE_HREF,useValue:'/IELTS-PTE'}]
})
export class AppRoutingModule { }
