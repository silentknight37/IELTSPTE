import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FillingTheBlankQuestionSetupComponent } from './admin/reading/fill-in-blank/filling-the-blank-question-setup/filling-the-blank-question-setup.component';
import { FillingTheBlankAnswerDisplayComponent } from './admin/reading/fill-in-blank/filling-the-blank-answer-display/filling-the-blank-answer-display.component';
import { UsersDisplayComponent } from './user/users-display/users-display.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { ReadingWritingFillInTheBlanksQuestionSetupComponent } from './admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks-question-setup/reading-writing-fill-in-the-blanks-question-setup.component';
import { ReadingWritingFillInTheBlanksAnswerDisplayComponent } from './admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks-answer-display/reading-writing-fill-in-the-blanks-answer-display.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AppConfigService } from './shared/services/app-config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import{DragulaModule} from 'ng2-dragula';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { BlankDragDropComponent } from './shared/component/blank-drag-drop/blank-drag-drop.component';
import { ReadingModule } from './admin/reading/reading.module';
import { QuestionListAdminComponent } from './admin/pages/question-list-admin/question-list-admin.component';
import { FillingTheBlankListingComponent } from './admin/reading/fill-in-blank/filling-the-blank-listing/filling-the-blank-listing.component';
import { FillingTheBlankQuestionSetupWithHeadersComponent } from './admin/reading/fill-in-blank/filling-the-blank-question-setup/filling-the-blank-question-setup-with-headers/filling-the-blank-question-setup-with-headers.component';
import { ReadingWritingFillInTheBlanksAnswerListingComponent } from './admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks-answer-listing/reading-writing-fill-in-the-blanks-answer-listing.component';
import { BlankDropDownComponent } from './shared/component/blank-drop-down/blank-drop-down.component';
import { ReOrderParagaphDisplayComponent } from './admin/reading/re-order-paragaph/re-order-paragaph-display/re-order-paragaph-display.component';
import { ReOrderParagaphSetupComponent } from './admin/reading/re-order-paragaph/re-order-paragaph-setup/re-order-paragaph-setup.component';
import { ReOrderParagaphListComponent } from './admin/reading/re-order-paragaph/re-order-paragaph-list/re-order-paragaph-list.component';
import { QuestionSetupComponent } from './shared/component/question-setup/question-setup.component';
import { QuestionListComponent } from './shared/component/question-list/question-list.component';
import { RepeatSentenceListComponent } from './admin/speaking/repeat-sentence/repeat-sentence-list/repeat-sentence-list.component';
import { RepeatSentenceSetupComponent } from './admin/speaking/repeat-sentence/repeat-sentence-setup/repeat-sentence-setup.component';
import { RepeatSentenceDisplayComponent } from './admin/speaking/repeat-sentence/repeat-sentence-display/repeat-sentence-display.component';
import { TextToSpeechComponent } from './shared/component/text-to-speech/text-to-speech.component';
import { SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis'
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { TestComComponent } from './pages/test-com/test-com.component';
import { SafePipe } from './shared/safe.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReadAloadDisplayComponent } from './admin/speaking/read-aload/read-aload-display/read-aload-display.component';
import { ReadAloadListComponent } from './admin/speaking/read-aload/read-aload-list/read-aload-list.component';
import { ReadAloadSetupComponent } from './admin/speaking/read-aload/read-aload-setup/read-aload-setup.component';
import { AnswerShortQuestionSetupComponent } from './admin/speaking/answer-short-question/answer-short-question-setup/answer-short-question-setup.component';
import { AnswerShortQuestionListComponent } from './admin/speaking/answer-short-question/answer-short-question-list/answer-short-question-list.component';
import { AnswerShortQuestionDisplayComponent } from './admin/speaking/answer-short-question/answer-short-question-display/answer-short-question-display.component';
import { WriteFromDictationSetupComponent } from './admin/listening/write-from-dictation/write-from-dictation-setup/write-from-dictation-setup.component';
import{ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import { WriteFromDictationListComponent } from './admin/listening/write-from-dictation/write-from-dictation-list/write-from-dictation-list.component';
import { WriteFromDictationDisplayComponent } from './admin/listening/write-from-dictation/write-from-dictation-display/write-from-dictation-display.component';
import { FillInBlanksDisplayComponent } from './admin/listening/fill-in-blanks/fill-in-blanks-display/fill-in-blanks-display.component';
import { FillInBlanksListComponent } from './admin/listening/fill-in-blanks/fill-in-blanks-list/fill-in-blanks-list.component';
import { FillInBlanksSetupComponent } from './admin/listening/fill-in-blanks/fill-in-blanks-setup/fill-in-blanks-setup.component';
import { BlankTextBoxComponent } from './shared/component/blank-text-box/blank-text-box.component';
import { HighlightIncorrectWordsSetupComponent } from './admin/listening/highlight-incorrect-words/highlight-incorrect-words-setup/highlight-incorrect-words-setup.component';
import { HighlightIncorrectWordsListComponent } from './admin/listening/highlight-incorrect-words/highlight-incorrect-words-list/highlight-incorrect-words-list.component';
import { HighlightIncorrectWordsDisplayComponent } from './admin/listening/highlight-incorrect-words/highlight-incorrect-words-display/highlight-incorrect-words-display.component';
import { HighlightWordComponent } from './shared/component/highlight-word/highlight-word.component';
import { HighlightCorrectSummarySetupComponent } from './admin/listening/highlight-correct-summary/highlight-correct-summary-setup/highlight-correct-summary-setup.component';
import { HighlightCorrectSummaryListComponent } from './admin/listening/highlight-correct-summary/highlight-correct-summary-list/highlight-correct-summary-list.component';
import { HighlightCorrectSummaryDisplayComponent } from './admin/listening/highlight-correct-summary/highlight-correct-summary-display/highlight-correct-summary-display.component';
import { SelectSingleRedioComponent } from './shared/component/select-single-redio/select-single-redio.component';
import { SelectMissingWordListComponent } from './admin/listening/select-missing-word/select-missing-word-list/select-missing-word-list.component';
import { SelectMissingWordSetupComponent } from './admin/listening/select-missing-word/select-missing-word-setup/select-missing-word-setup.component';
import { SelectMissingWordDisplayComponent } from './admin/listening/select-missing-word/select-missing-word-display/select-missing-word-display.component';
import { SummariesSpokenTextSetupComponent } from './admin/listening/summaries-spoken-text/summaries-spoken-text-setup/summaries-spoken-text-setup.component';
import { SummariesSpokenTextListComponent } from './admin/listening/summaries-spoken-text/summaries-spoken-text-list/summaries-spoken-text-list.component';
import { SummariesSpokenTextDisplayComponent } from './admin/listening/summaries-spoken-text/summaries-spoken-text-display/summaries-spoken-text-display.component';
import { ReTellLectureDisplayComponent } from './admin/speaking/re-tell-lecture/re-tell-lecture-display/re-tell-lecture-display.component';
import { ReTellLectureListComponent } from './admin/speaking/re-tell-lecture/re-tell-lecture-list/re-tell-lecture-list.component';
import { ReTellLectureSetupComponent } from './admin/speaking/re-tell-lecture/re-tell-lecture-setup/re-tell-lecture-setup.component';
import { DescribeImageListComponent } from './admin/speaking/describe-image/describe-image-list/describe-image-list.component';
import { DescribeImageDisplayComponent } from './admin/speaking/describe-image/describe-image-display/describe-image-display.component';
import { DescribeImageSetupComponent } from './admin/speaking/describe-image/describe-image-setup/describe-image-setup.component';
import { EssayWritingDisplayComponent } from './admin/writing/essay_writing/essay-writing-display/essay-writing-display.component';
import { EssayWritingListComponent } from './admin/writing/essay-writing-list/essay-writing-list.component';
import { EssayWritingSetupComponent } from './admin/writing/essay-writing-setup/essay-writing-setup.component';
import { SummariseWritteTextSetupComponent } from './admin/writing/summarise_written_text/summarise-writte-text-setup/summarise-writte-text-setup.component';
import { SummariseWritteTextDisplayComponent } from './admin/writing/summarise_written_text/summarise-writte-text-display/summarise-writte-text-display.component';
import { SummariseWritteTextListComponent } from './admin/writing/summarise_written_text/summarise-writte-text-list/summarise-writte-text-list.component';
import { ReadingMultipleChoiceDisplayComponent } from './admin/reading/multiple-choice/reading-multiple-choice-display/reading-multiple-choice-display.component';
import { ReadingMultipleChoiceSetupComponent } from './admin/reading/multiple-choice/reading-multiple-choice-setup/reading-multiple-choice-setup.component';
import { ReadingMultipleChoiceListComponent } from './admin/reading/multiple-choice/reading-multiple-choice-list/reading-multiple-choice-list.component';
import { MultipleChoiceComponent } from './shared/component/multiple-choice/multiple-choice.component';
import { ListeningMultipleChoiceDisplayComponent } from './admin/listening/multiple-choice/listening-multiple-choice-display/listening-multiple-choice-display.component';
import { ListeningMultipleChoiceSetupComponent } from './admin/listening/multiple-choice/listening-multiple-choice-setup/listening-multiple-choice-setup.component';
import { ListeningMultipleChoiceListComponent } from './admin/listening/multiple-choice/listening-multiple-choice-list/listening-multiple-choice-list.component';
import { ListeningSingleChoiceListComponent } from './admin/listening/single-choice/listening-single-choice-list/listening-single-choice-list.component';
import { ListeningSingleChoiceSetupComponent } from './admin/listening/single-choice/listening-single-choice-setup/listening-single-choice-setup.component';
import { ListeningSingleChoiceDisplayComponent } from './admin/listening/single-choice/listening-single-choice-display/listening-single-choice-display.component';
import { ReadingSingleChoiceDisplayComponent } from './admin/reading/single-choice/reading-single-choice-display/reading-single-choice-display.component';
import { ReadingSingleChoiceListComponent } from './admin/reading/single-choice/reading-single-choice-list/reading-single-choice-list.component';
import { ReadingSingleChoiceSetupComponent } from './admin/reading/single-choice/reading-single-choice-setup/reading-single-choice-setup.component';
import { SingleChoiceComponent } from './shared/component/single-choice/single-choice.component';


@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    FillingTheBlankQuestionSetupComponent,
    FillingTheBlankAnswerDisplayComponent,
    UsersDisplayComponent,
    UsersFormComponent,
    UserRegistrationComponent,
    ReadingWritingFillInTheBlanksQuestionSetupComponent,
    ReadingWritingFillInTheBlanksAnswerDisplayComponent,
    EscapeHtmlPipe,
    BlankDragDropComponent,
    QuestionListAdminComponent,
    FillingTheBlankListingComponent,
    FillingTheBlankQuestionSetupWithHeadersComponent,
    ReadingWritingFillInTheBlanksAnswerListingComponent,
    BlankDropDownComponent,
    ReOrderParagaphDisplayComponent, 
    ReOrderParagaphSetupComponent, 
    ReOrderParagaphListComponent,
    QuestionSetupComponent,
    QuestionListComponent,
    RepeatSentenceListComponent,
    RepeatSentenceSetupComponent,
    RepeatSentenceDisplayComponent,
    TextToSpeechComponent,
    TestComComponent,
    SafePipe,
    ReadAloadDisplayComponent,
    ReadAloadListComponent,
    ReadAloadSetupComponent,
    AnswerShortQuestionSetupComponent,
    AnswerShortQuestionListComponent,
    AnswerShortQuestionDisplayComponent,
    AnswerShortQuestionDisplayComponent,
    WriteFromDictationSetupComponent,
    ConfirmEqualValidatorDirective,
    WriteFromDictationListComponent,
    WriteFromDictationDisplayComponent,
    FillInBlanksDisplayComponent,
    FillInBlanksListComponent,
    FillInBlanksSetupComponent,
    BlankTextBoxComponent,
    HighlightIncorrectWordsSetupComponent,
    HighlightIncorrectWordsListComponent,
    HighlightIncorrectWordsDisplayComponent,
    HighlightWordComponent,
    HighlightCorrectSummarySetupComponent,
    HighlightCorrectSummaryListComponent,
    HighlightCorrectSummaryDisplayComponent,
    SelectSingleRedioComponent,
    SelectMissingWordListComponent,
    SelectMissingWordSetupComponent,
    SelectMissingWordDisplayComponent,
    SummariesSpokenTextSetupComponent,
    SummariesSpokenTextListComponent,
    SummariesSpokenTextDisplayComponent,
    ReTellLectureDisplayComponent,
    ReTellLectureListComponent,
    ReTellLectureSetupComponent,
    DescribeImageSetupComponent,
    DescribeImageListComponent,
    DescribeImageDisplayComponent,
    EssayWritingDisplayComponent,
    EssayWritingListComponent,
    EssayWritingSetupComponent,
    SummariseWritteTextSetupComponent,
    SummariseWritteTextDisplayComponent,
    SummariseWritteTextListComponent,
    ReadingMultipleChoiceDisplayComponent,
    ReadingMultipleChoiceSetupComponent,
    ReadingMultipleChoiceListComponent,
    MultipleChoiceComponent,
    ListeningMultipleChoiceDisplayComponent,
    ListeningMultipleChoiceSetupComponent,
    ListeningMultipleChoiceListComponent,
    ListeningSingleChoiceListComponent,
    ListeningSingleChoiceSetupComponent,
    ListeningSingleChoiceDisplayComponent,
    ReadingSingleChoiceSetupComponent, 
    ReadingSingleChoiceListComponent, 
    ReadingSingleChoiceDisplayComponent,
    SingleChoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragulaModule.forRoot(),
    ReadingModule,
    SpeechSynthesisModule.forRoot({
      lang:'en-GB',
      volume:1.0,
      pitch:1.0,
      rate:1.0
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      showSubtitle:false,
      showUnits:false,
      showBackground:false
    }),
    MatProgressBarModule,
    NgxSpinnerModule
  ],
  providers: 
  [
    AppConfigService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
