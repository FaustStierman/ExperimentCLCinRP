import {UserInfo, UserData} from '../../../edWeb/v2022.01/libInt/UserInfo.js';
import {ExperimentBuild} from '../../../edWeb/v2022.01/libInt/ExperimentBuild.js';
import {Page} from '../../../edWeb/v2022.01/libInt/controls/Page.js';
import {TextControl, Font} from '../../../edWeb/v2022.01/libInt/controls/TextControl.js';
import {TextInputControl} from '../../../edWeb/v2022.01/libInt/controls/TextInputControl.js';
import {TextLeftRightControl} from '../../../edWeb/v2022.01/libInt/controls/TextLeftRightControl.js';
import {RatingControl} from '../../../edWeb/v2022.01/libInt/controls/RatingControl.js';
import {GraphicsControl} from '../../../edWeb/v2022.01/libInt/controls/GraphicsControl.js';
import {GraphicsContainerControl} from '../../../edWeb/v2022.01/libInt/controls/GraphicsContainerControl.js';
import {PictureControl} from '../../../edWeb/v2022.01/libInt/controls/PictureControl.js';
import {VideoControl} from '../../../edWeb/v2022.01/libInt/controls/VideoControl.js';
import {Timing} from '../../../edWeb/v2022.01/libInt/Timing.js';
import {UserList} from '../../../edWeb/v2022.01/libInt/controls/UserList.js';
import {BaseControl} from '../../../edWeb/v2022.01/libInt/controls/BaseControl.js';
import {SoundControl} from '../../../edWeb/v2022.01/libInt/controls/SoundControl.js';
import {SliderControl} from '../../../edWeb/v2022.01/libInt/controls/SliderControl.js';
import {Code} from '../../../edWeb/v2022.01/libInt/controls/Code.js';
import {Graphics} from '../../../edWeb/v2022.01/libInt/Graphics.js';
import {RecordControl} from '../../../edWeb/v2022.01/libInt/controls/RecordControl.js';
import {VUControl} from '../../../edWeb/v2022.01/libInt/controls/VUControl.js';
import {HtmlPage} from '../../../edWeb/v2022.01/libInt/controls/HtmlPage.js';
import {SelectionControl} from '../../../edWeb/v2022.01/libInt/controls/SelectionControl.js';
import {MultiSelectionControl} from '../../../edWeb/v2022.01/libInt/controls/MultiSelectionControl.js';
import {ButtonControl} from '../../../edWeb/v2022.01/libInt/controls/ButtonControl.js';
import {Color} from '../../../edWeb/v2022.01/libInt/tools/Color.js';
import {String, Integer, Double, Character} from '../../../edWeb/v2022.01/libInt/tools/Conversions.js';
import {Results} from '../../../edWeb/v2022.01/libInt/Results.js';
import {Tools} from '../../../edWeb/v2022.01/libInt/Tools.js';
import {Table} from '../../../edWeb/v2022.01/libInt/Table.js';

class Experiment extends ExperimentBuild
{

   constructor({serverVersion, edWebVersion})
   {
      super(serverVersion, edWebVersion);
      this.setParent(this);
      this.events.setExitKey("{ESCAPE}");
      this.showBeginText= "Welcome to this experiment";
      this.showBeginTitle= "Participant info";
      this.showEndText= "<br><b>Thanks for participating!</b><br>";
      this.showEndTitle= "Closing";
      this.showFinishedText= "<br><b>Experiment is finished.<br>Browser can be closed.</b><br>";
      this.showCancelText= "<br><b>Experiment is cancelled.<br>Browser can be closed.</b><br>";
      this.showUpdateText= "Busy updating results to server, please wait.";
      this.showUpdateTitle= "Updating to server";
      this.showSubmitButtonText= "Submit";
      this.showCancelButtonText= "Cancel";
      this.showDownloadingStimuli= "Downloading stimuli completed.";
      this.setTruncateListsEnabled(true);
      this.setSelectedResultHeaders("");
      this.userInfo.addUserInfo("Subject number", "subject", UserInfo.Type.Integer, "", UserInfo.CheckType.Yes);
      this.parseURLParameters();
      this.startUserInfo();
   }

   createExperiment()
   {
      let globals= new Globals(this);
      this.flow.addPage(new Page_ID(this, null, globals));
      this.flow.addPage(new Page_consent(this, null, globals));
      this.flow.addList(new List_vragen(this, null, globals));
      this.flow.addPage(new Page_uitleg(this, null, globals));
      this.flow.addList(new List_voorbeelden(this, null, globals));
      this.flow.addPage(new Page_startTrail(this, null, globals));
      this.flow.addCode(new Code_preTrail(this, null, globals));
      this.flow.addPage(new Page_fixatieKruis(this, null, globals));
      this.flow.addPage(new Page_testItemN(this, null, globals));
      this.flow.addCode(new Code_code2(this, null, globals));
      this.flow.addPage(new Page_einde(this, null, globals));
   }
}

class Globals
{
   constructor(experimentBuild)
   {
      this.experimentBuild= experimentBuild;this.setsCompleted= 0; 

this.itemInSet= 1;

this.currentSet;

this.seed= Tools.getRandomNumber(1, 3); 
this.oefenrondeTeller= 1;
this.currentItem; 

   }
}

class Page_ID extends Page
{
   constructor(experiment, parent, globals)
   {
      super("ID", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.text2= new TextControl("text2");
this.text2.setText("ID");
//this.text2.setText(this.globals.allText.get("instr1Text"));
this.text2.setText(String.join("\n",
"ID"
));
this.text2.setX(0.5);
this.text2.setY(0.5);
this.text2.setWidth(0.5);
this.text2.setHeight(0.5);
this.text2.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text2.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text2.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
this.text2.setForeColor(Color.WHITE);
//this.text2.setBackColor(Color.WHITE);
this.text2.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
this.text2.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
this.text2.setBorderWidth(0);
this.text2.setBorderColor(Color.BLACK);
this.text2.setDrawBackColorNarrow(false);
this.text2.setBackColorMarginHorizVert(0, 0);
this.text2.setValidClick(false);
this.addControl(this.text2);
   }
}

class Page_consent extends HtmlPage
{
   constructor(experiment, parent, globals)
   {
      super("consent", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("");
this.setMouseDownEnabled(true);
this.setMouseCanEndPage(false);
this.setValidClicksOnly(false);
this.setBackColor(Color.GRAY);
this.setTransparent(false);


//Take care that backtick is at begin/end -> `
//Remove text, copy/paste from text/Word document and use toString in menu to format it correctly (appending <br>)
//Use rightclick->Formatting->Remove linebreaks to put the checkboxes on a single line.
let text= `
<center><h1><b>University of Amsterdam</b></h1></center>

Dear participant

You will be taking part in a research project conducted by <---> under supervision of <---> at the University of Amsterdam rMA Linguistics – Amsterdam Centre for Language and Communication. Before the research project can begin, it is important that you read about the procedures we will be applying. Make sure to read this brochure carefully.

<b>Purpose of the research project</b>
At this stage of the project, we cannot provide any further information on the factors we will be examining. You will receive further details after the experiment has ended.

<b>Who can take part in this research?</b>
<label><input type="checkbox" id="adult"> I am an adult.</label>
<label><input type="checkbox" id="native"> I am a navite speaker of English</label>
<label><input type="checkbox" id="education"> I have completed university.</label>
We are investigating <--->. In the view of nature of the research, it is important that you have good hearing. Headphones or earphones are not necessary, but advisable. You can take part in this research project if <--->.

<b>Instructions and procedure</b>
Before the experiment, make sure that you are in a quiet space, that you are wearing headphones and that the volume of the computer is at a comfortable hearing level. During the experiment <--->.
The task will take approximately between 5 and 10 minutes.

<b>Voluntary participation</b>
You will be participating in this research project on a voluntary basis. This means you are free to stop taking part at any stage. This will not have any personal consequences and you will not be obliged to finish the procedures described above. You can also decide to withdraw your participation up to 8 days after the research has ended. If you decide to stop or withdraw your consent, all the information gathered up until then will be permanently deleted.

<b>Discomfort, Risks & Insurance</b>
The risks of participating in this research are no greater than in everyday situations at home. Previous experience in similar research has shown that no or hardly any discomfort is to be expected for participants. For all research at the University of Amsterdam, a standard liability insurance applies.

<b>Confidential treatment of your details</b>
The information gathered over the course of this research will be used for further analysis and publication in scientific journals only. Your personal details will not be used in these publications, and we guarantee that you will remain anonymous under all circumstances.
The data gathered during the research will be encrypted and stored separately from your personal details. These personal details and the encryption key are only accessible to members of the research staff.

<b>Further information</b>
For further information on the research project, please contact <---> phone number:<--->; email: <--->
If you have any complaints regarding this research project, you can contact the secretary of the Ethics Committee of the Faculty of Humanities of the University of Amsterdam, <-->
`;

this.centerBlockStart();
this.addTextBlockWithConsent(
{
     editable:false,
     consentButtonID:'consent', consentButtonText:'Accept', consentButtonColor:'Green', consentButtonBackColor:'White', consentButtonFontSize:24,
     consentButtonWidth:'100px', consentButtonHeight:'30px', consentButtonMargin:'20px 0px 0px 0px;',
     declineButtonID:'decline', declineButtonText:'Decline', declineButtonColor:'Red', declineButtonBackColor:'White', declineButtonFontSize:24,
     declineButtonWidth:'100px', declineButtonHeight:'30px', declineButtonMargin:'20px 100px 0px 0px;',

     controlMargin:this.cY(0.1).toString() + 'px auto 0px auto', id:'textInputConsent1',
     controlText: text, controlWidth:this.cX(0.3) + 'px', controlHeight:this.cY(0.7)+'px', controlForeColor:'Black', controlBackColor:'WhiteSmoke',
     controlHorizAlign:'left', controlPadding:'10px 10px 10px 10px'
});

this.centerBlockEnd();
this.insertHTML();

   }

   finishFunc()
   {
   if (this.getButtonPressed()=== 'decline')
   {
        this.setUserData('declined', 'true');
        this.saveResults();
        this.experiment.save();
   }
   else
   {
   if (document.getElementById("adult").checked &&
        document.getElementById("native").checked &&
        document.getElementById("education").checked)
           this.setStatus(Page.Status.ENDED);
        else throw "<br><br>Not all checkboxes where populated, participant can't take part, so experiment will end.";
   }
   }
}

class List_vragen extends UserList
{
   constructor(experiment, parent, globals)
   {
     super("vragen", experiment, parent);
     this.globals = globals;
     this.listParent = this;
this.setRandomization(UserList.Randomization.RANDOM); //RANDOM, SEQUENTIAL
this.loadList("lists/vragen.txt");
//this.setListStatus("TEST1");
this.add(new Page_toonVragen(experiment, this, globals));
   }
}

class Page_toonVragen extends Page
{
   constructor(experiment, parent, globals)
   {
      super("toonVragen", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);


//this.setKeyboardCanEndPage(false);
//this.setMouseDownEnabled(true);
//this.setMouseCanEndPage(true);
//this.setValidClicksOnly(true);
this.multiSelection2 = new MultiSelectionControl("multiSelection2");
this.multiSelection2.setListParent(this.getParent());
this.multiSelection2.setPageParent(this);
this.multiSelection2.setType("[Type]");
this.multiSelection2.setCount("[Count]");
this.multiSelection2.setFeedback("[Feedback]");

//Question, used for all subcontrols
this.multiSelection2.setQuestion("[Question]");
this.multiSelection2.setQuestionFont("Roboto-Regular", Font.BOLD, 36);
this.multiSelection2.setQuestionForeColor(Color.WHITE);
//this.multiSelection2.setQuestionBackColor(Color.LIGHT_GRAY);
this.multiSelection2.setQuestionBorderWidth(0);
this.multiSelection2.setQuestionBorderColor(Color.BLACK);
this.multiSelection2.setQuestionOffsetY(20);
this.multiSelection2.setQuestionDrawBackColorNarrow(true);
this.multiSelection2.setQuestionBackColorMarginHorizVert(5, 5);

//Selection -> radiobuttons/checkboxes/other (text input)
this.multiSelection2.selection_setX(0.1); this.multiSelection2.selection_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection2.selection_setY(0.2); this.multiSelection2.selection_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection2.setWidth(0.3);
this.multiSelection2.selection_setDirection(SelectionControl.Direction.VERTICAL);
this.multiSelection2.selection_setHorizAlign(TextControl.HorizAlign.LEFT);
this.multiSelection2.selection_setAnswers("Answer"); //Main header of answers, e.g. Answer -> Answer1, Answer2, ...
this.multiSelection2.selection_setAnswersFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection2.selection_setAnswersForeColor(Color.LIGHT_GRAY);
this.multiSelection2.selection_setAnswersOffsetXBefore(20); //space before selection control
this.multiSelection2.selection_setAnswersOffsetXAfter(30); //space between selection and answer control
this.multiSelection2.selection_setAnswersOffsetX(150); //space between answers when Directon = 'Horizontal'
this.multiSelection2.selection_setAnswersOffsetY(30); //line space between answers when Direction = 'Vertical'
this.multiSelection2.selection_setSelRadius(12);
this.multiSelection2.selection_setSelBackColor(Color.WHITE);
this.multiSelection2.selection_setSelLineWidth(1);
this.multiSelection2.selection_setSelLineColor(Color.WHITE);
this.multiSelection2.selection_setSelectedBackColor(Color.BLACK);

//SetOtherxxx -> Last item will be input box
this.multiSelection2.selection_setOtherText("");
this.multiSelection2.selection_setOtherOffsetX(0); //set 0 for x-Alignment with other answers
this.multiSelection2.selection_setOtherOffsetY(15); 
this.multiSelection2.selection_setOtherWidth(0.25);
this.multiSelection2.selection_setOtherFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection2.selection_setOtherForeColor(Color.WHITE);
this.multiSelection2.selection_setOtherBackColor(Color.BLUE);
this.multiSelection2.selection_setOtherBorderWidth(1);
this.multiSelection2.selection_setOtherBorderColor(Color.BLACK);
this.multiSelection2.selection_setOtherBackColorMarginHorizVert(1, 1);

//Button will confirm selection
this.multiSelection2.button_setText("[SubmitText]");
this.multiSelection2.button_setX(0.7); this.multiSelection2.button_setXAlign(BaseControl.XAlign.CENTER);
this.multiSelection2.button_setY(0.8); this.multiSelection2.button_setYAlign(BaseControl.YAlign.CENTER);
this.multiSelection2.button_setWidth(100);
this.multiSelection2.button_setHeight(75);
this.multiSelection2.button_setForeColor(Color.BLACK);
this.multiSelection2.button_setBackColor(Color.LIGHT_GRAY);
this.multiSelection2.button_setSelectedBackColor(Color.BLUE);
this.multiSelection2.button_setFont("Roboto-Regular", Font.PLAIN, 24);

//Dropdown list
this.multiSelection2.list_setList("Answer");
this.multiSelection2.list_setX(0.1); this.multiSelection2.list_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection2.list_setY(0.2); this.multiSelection2.list_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection2.list_setWidth(0.75);
this.multiSelection2.list_setListWidth(0.35);
this.multiSelection2.list_setListFont("Roboto-Regular", Font.PLAIN, 18);
this.multiSelection2.list_setListForeColor(Color.BLACK);
this.multiSelection2.list_setListBackColor(Color.LIGHT_GRAY);
this.multiSelection2.list_setListBorderWidth(1);
this.multiSelection2.list_setListBorderColor(Color.BLACK);
this.multiSelection2.list_setSelectionBackColor(Color.GRAY);
this.multiSelection2.list_setSelectedBackColor(Color.BLUE);

//Rating
this.multiSelection2.rating_setX(0.1); this.multiSelection2.rating_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection2.rating_setY(0.2); this.multiSelection2.rating_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection2.rating_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
this.multiSelection2.rating_setGeometry(RatingControl.Geometry.CIRCLE); //SQUARE, CIRCLE
this.multiSelection2.rating_setRatingLeft("Not sure");
this.multiSelection2.rating_setRatingRight("Very sure");
this.multiSelection2.rating_setRatingFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection2.rating_setRatingForeColor(Color.BLACK);
this.multiSelection2.rating_setRatingOffsetY(50);
this.multiSelection2.rating_setAnswers("Answer"); //no spaces
this.multiSelection2.rating_setAnswersFont("Roboto-Regular", Font.PLAIN, 18);
this.multiSelection2.rating_setAnswersForeColor(Color.BLACK);
this.multiSelection2.rating_setAnswersOffsetX(50); //space between answers
this.multiSelection2.rating_setSelRadius(12);
this.multiSelection2.rating_setSelBackColor(Color.BLUE);
this.multiSelection2.rating_setSelLineWidth(1);
this.multiSelection2.rating_setSelLineColor(Color.BLACK);
this.multiSelection2.rating_setSelectedBackColor(Color.BLACK);

//Slider
this.multiSelection2.slider_setX(0.1); this.multiSelection2.slider_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection2.slider_setY(0.3); this.multiSelection2.slider_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection2.slider_setWidth(0.5);
this.multiSelection2.slider_setHeight(40);
this.multiSelection2.slider_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
this.multiSelection2.slider_setBackColor(Color.DARK_GRAY);
this.multiSelection2.slider_setBeforeSelectColor(Color.WHITE);
this.multiSelection2.slider_setKnobColor(Color.BLUE);
this.multiSelection2.slider_setKnobLineColor(Color.BLACK);
this.multiSelection2.slider_setKnobLineWidth(0);
this.multiSelection2.slider_setLabelShow(true);
this.multiSelection2.slider_setLabelWidth(100);
this.multiSelection2.slider_setLabelHeight(30);
this.multiSelection2.slider_setLabelColor(Color.BLUE);
this.multiSelection2.slider_setLabelFont("Roboto-Regular", Font.PLAIN, 14);
this.multiSelection2.slider_setLabelOffset(20);
this.multiSelection2.slider_setMinValue("[Answer1]");
this.multiSelection2.slider_setMaxValue("[Answer2]");
this.multiSelection2.slider_setPos("[Answer3]");
this.multiSelection2.slider_setUseValidation(true);

//Input textbox
this.multiSelection2.textInput_setText("");
this.multiSelection2.textInput_setX(0.1); this.multiSelection2.textInput_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection2.textInput_setY(0.3); this.multiSelection2.textInput_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection2.textInput_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
this.multiSelection2.textInput_setWidth(0.35);
this.multiSelection2.textInput_setQuestionOffsetY(5);
this.multiSelection2.textInput_setForeColor(Color.WHITE);
this.multiSelection2.textInput_setBackColor(Color.BLUE);
this.multiSelection2.textInput_setFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection2.textInput_setBorderWidth(1);
this.multiSelection2.textInput_setBorderColor(Color.BLACK);
this.multiSelection2.textInput_setEndKey("");
this.multiSelection2.textInput_setBackColorMarginHorizVert(1, 1);

this.addControl(this.multiSelection2);

     

   }

   frameFunc()
   {
   	this.multiSelection2.frame();
   }

   finishFunc()
   {
     this.multiSelection2.finish();
   }
}

class Page_uitleg extends Page
{
   constructor(experiment, parent, globals)
   {
      super("uitleg", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.picture5= new PictureControl("picture5");
this.picture5.setPicture("pics/uitleg.png");
this.picture5.setX(0.5);
this.picture5.setY(0.5);
this.picture5.setWidth(1);
this.picture5.setHeight(1);
//this.picture5.setRadius(15);
this.picture5.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.picture5.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.picture5.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
this.picture5.setBorderWidth(0);
this.picture5.setBorderColor(Color.BLUE);
this.picture5.setZOrder(10);
this.picture5.setValidClick(false);
this.addControl(this.picture5);
   }
}

class List_voorbeelden extends UserList
{
   constructor(experiment, parent, globals)
   {
     super("voorbeelden", experiment, parent);
     this.globals = globals;
     this.listParent = this;
this.setRandomization(UserList.Randomization.SEQUENTIAL); //RANDOM, SEQUENTIAL
this.loadList("lists/voorbeelden.tsv");
//this.setListStatus("TEST1");
this.add(new Page_toonVoorbeeld(experiment, this, globals));
   }
}

class Page_toonVoorbeeld extends Page
{
   constructor(experiment, parent, globals)
   {
      super("toonVoorbeeld", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("ad{RIGHT}{LEFT}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(false);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.picture2= new PictureControl("picture2");
this.picture2.setPicture("pics/[afbeelding].bmp");
this.picture2.setX(0.5);
this.picture2.setY(0.5);
this.picture2.setWidth(0.8);
this.picture2.setHeight(0.8);
//this.picture2.setRadius(15);
this.picture2.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.picture2.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.picture2.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
this.picture2.setBorderWidth(0);
this.picture2.setBorderColor(Color.BLUE);
this.picture2.setZOrder(10);
this.picture2.setValidClick(false);
this.addControl(this.picture2);

this.text9= new TextControl("text9");
//this.text9.setText("");
//this.text9.setText(this.globals.allText.get("instr1Text"));
this.text9.setText(String.join("\n",
"Voorbeeld " + String.format("%d",this.globals.oefenrondeTeller),
"Match deze kleur met rechts of links"
));
this.text9.setX(0.5);
this.text9.setY(0.05);
this.text9.setWidth(0.5);
this.text9.setHeight(0.5);
this.text9.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text9.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text9.setFont("Roboto-Regular", Font.BOLD, 36); //PLAIN, BOLD, ITALIC
this.text9.setForeColor(Color.WHITE);
//this.text9.setBackColor(Color.WHITE);
this.text9.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
this.text9.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
this.text9.setBorderWidth(0);
this.text9.setBorderColor(Color.BLACK);
this.text9.setDrawBackColorNarrow(false);
this.text9.setBackColorMarginHorizVert(0, 0);
this.text9.setValidClick(false);
this.addControl(this.text9);

this.text11= new TextControl("text11");
//this.text11.setText("");
//this.text11.setText(this.globals.allText.get("instr1Text"));
this.text11.setText(String.join("\n",
"A of <-                                                      D of ->"
));
this.text11.setX(0.5);
this.text11.setY(0.6);
this.text11.setWidth(0.5);
this.text11.setHeight(0.5);
this.text11.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text11.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text11.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
this.text11.setForeColor(Color.WHITE);
//this.text11.setBackColor(Color.WHITE);
this.text11.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
this.text11.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
this.text11.setBorderWidth(0);
this.text11.setBorderColor(Color.BLACK);
this.text11.setDrawBackColorNarrow(false);
this.text11.setBackColorMarginHorizVert(0, 0);
this.text11.setValidClick(false);
this.addControl(this.text11);

this.globals.oefenrondeTeller++;
   }
}

class Page_startTrail extends Page
{
   constructor(experiment, parent, globals)
   {
      super("startTrail", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.text12= new TextControl("text12");
//this.text12.setText("");
//this.text12.setText(this.globals.allText.get("instr1Text"));
this.text12.setText(String.join("\n",
"Druk op Spatie om door te gaan naar de echte test"
));
this.text12.setX(0.5);
this.text12.setY(0.5);
this.text12.setWidth(0.5);
this.text12.setHeight(0.5);
this.text12.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text12.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text12.setFont("Roboto-Regular", Font.BOLD, 36); //PLAIN, BOLD, ITALIC
this.text12.setForeColor(Color.BLACK);
//this.text12.setBackColor(Color.WHITE);
this.text12.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
this.text12.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
this.text12.setBorderWidth(0);
this.text12.setBorderColor(Color.BLACK);
this.text12.setDrawBackColorNarrow(false);
this.text12.setBackColorMarginHorizVert(0, 0);
this.text12.setValidClick(false);
this.addControl(this.text12);
   }
}

class Code_preTrail extends Code
{
   constructor(experiment, parent, globals)
   {
      super("preTrail", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {


if (Tools.modEquals(this.globals.seed + this.globals.setsCompleted, 3, 0)){
	this.globals.currentItem = "controle" + String.format("%d", this.globals.itemInSet);
	
}

else if (Tools.modEquals(this.globals.seed + this.globals.setsCompleted, 3, 1)){
	this.globals.currentItem = "abstract" + String.format("%d", this.globals.itemInSet);
	
}

else if (Tools.modEquals(this.globals.seed + this.globals.setsCompleted, 3, 2)){
	this.globals.currentItem = "iconisch" + String.format("%d", this.globals.itemInSet);
	
}
   }
}

class Page_fixatieKruis extends Page
{
   constructor(experiment, parent, globals)
   {
      super("fixatieKruis", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(500);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(false);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(false);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.picture4= new PictureControl("picture4");
this.picture4.setPicture("pics/fixatieKruis.bmp");
this.picture4.setX(0.5);
this.picture4.setY(0.5);
this.picture4.setWidth(0.8);
this.picture4.setHeight(0.8);
//this.picture4.setRadius(15);
this.picture4.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.picture4.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.picture4.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
this.picture4.setBorderWidth(0);
this.picture4.setBorderColor(Color.BLUE);
this.picture4.setZOrder(10);
this.picture4.setValidClick(false);
this.addControl(this.picture4);
   }
}

class Page_testItemN extends Page
{
   constructor(experiment, parent, globals)
   {
      super("testItemN", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("ad{RIGHT}{LEFT}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.picture1= new PictureControl("picture1");
this.picture1.setPicture("pics/" + this.globals.currentItem + ".bmp");
this.picture1.setX(0.5);
this.picture1.setY(0.5);
this.picture1.setWidth(0.8);
this.picture1.setHeight(0.8);
//this.picture1.setRadius(15);
this.picture1.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.picture1.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.picture1.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
this.picture1.setBorderWidth(0);
this.picture1.setBorderColor(Color.BLUE);
this.picture1.setZOrder(10);
this.picture1.setValidClick(false);
this.addControl(this.picture1);
   }
}

class Code_code2 extends Code
{
   constructor(experiment, parent, globals)
   {
      super("code2", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.globals.itemInSet += 1; 

if(Tools.equals(this.globals.itemInSet, 8))
{
	//If a set has been completed 
	this.globals.setsCompleted += 1;
	this.globals.itemInSet = 1; 
	Debug.writeLine(Tools.modEquals(this.globals.setsCompleted, 3, 0));
	if(Tools.modEquals(this.globals.setsCompleted, 3, 0))
	{
		Debug.writeLine("here");
		// If three trails completed: jump to end 
		this.jumpTo("einde");
		this.jumpToEndTrial();
	}
	else{
		this.jumpTo("preTrail");
	}
}

//Jump to next item
else{
	this.jumpTo("preTrail");
}
   }
}

class Page_einde extends Page
{
   constructor(experiment, parent, globals)
   {
      super("einde", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

this.text8= new TextControl("text8");
//this.text8.setText("");
//this.text8.setText(this.globals.allText.get("instr1Text"));

this.text8.setText(String.join("\n",
"Einde"
));
this.text8.setX(0.5);
this.text8.setY(0.5);
this.text8.setWidth(0.5);
this.text8.setHeight(0.5);
this.text8.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text8.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text8.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
this.text8.setForeColor(Color.BLACK);
//this.text8.setBackColor(Color.WHITE);
this.text8.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
this.text8.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
this.text8.setBorderWidth(0);
this.text8.setBorderColor(Color.BLACK);
this.text8.setDrawBackColorNarrow(false);
this.text8.setBackColorMarginHorizVert(0, 0);
this.text8.setValidClick(false);
this.addControl(this.text8);
   }
}

var experiment = new Experiment({serverVersion: "v2020.9", edWebVersion: "v2022.01"});