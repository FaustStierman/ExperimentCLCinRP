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
      this.userInfo.addUserInfo("Ben je kleurenblind?", "Kleurenblind", UserInfo.Type.ComboBox, ["Ja","Nee"], UserInfo.CheckType.Yes);
      this.parseURLParameters();
      this.startUserInfo();
   }

   createExperiment()
   {
      let globals= new Globals(this);
      this.flow.addCode(new Code_Nietkleurenblind(this, null, globals));
      this.flow.addPage(new Page_consent(this, null, globals));
      this.flow.addList(new List_vragen(this, null, globals));
      this.flow.addPage(new Page_uitleg(this, null, globals));
      this.flow.addList(new List_voorbeelden(this, null, globals));
      this.flow.addPage(new Page_startTrail(this, null, globals));
      this.flow.addList(new List_set1(this, null, globals));
      this.flow.addList(new List_set2(this, null, globals));
      this.flow.addList(new List_set3(this, null, globals));
      this.flow.addPage(new Page_einde(this, null, globals));
   }
}

class Globals
{
   constructor(experimentBuild)
   {
      this.experimentBuild= experimentBuild;this.seed= Tools.getRandomNumber(1, 3); 
this.oefenrondeTeller= 1;

   }
}

class Code_Nietkleurenblind extends Code
{
   constructor(experiment, parent, globals)
   {
      super("Nietkleurenblind", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
if(Tools.equals(UserData.getItem("Kleurenblind"), "Ja")){
	this.jumpTo("einde");
	this.jumpToEndTrial();
}

//public static String right(String src, int count)
//example-> this.randInt= Tools.getRandomNumber(1, 10);
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
<center><h1><b>Universiteit van Amsterdam</b></h1></center>

Informatiebrochure voor Kleurherkenning

Geachte participant / Beste deelnemer,

U gaat deelnemen aan het onderzoek kleurherkenning van de Universiteit van Amsterdam, faculteit der Geesteswetenschappen, uitgevoerd door Francijn Keur, Faust Stierman en Joran Paap onder begeleiding van Hern??n Labb?? Grunberg. Voordat het onderzoek begint, is het belangrijk dat u kennis neemt van de procedures die in dit onderzoek worden gevolgd. Leest u deze brochure daarom zorgvuldig door.

<b>Doel van het onderzoek</b>
Perceptie is iets waar al veel onderzoek naar gedaan is. Verschillende aspecten hebben invloed op de snelheid en accuraatheid waarmee je iets waarneemt. Dit onderzoek richt zich specifiek op onze perceptie van kleuren. Eerder onderzoek heeft al aangetoond dat je bijvoorbeeld sneller een kleur categoriseert wanneer je hier een woord voor hebt, in tegenstelling tot wanneer je er geen woord voor hebt. Met dit onderzoek hopen wij meer te leren over kleurperceptie en welke kenmerken mogelijk invloed hebben op de snelheid van kleurcategorisatie.

<b>Wie kan er aan dit onderzoek meedoen</b>
Voor dit onderzoek worden volwassen uitgenodigd die niet kleurenblind zijn. Wij vragen u voorafgaand aan het onderzoek ook naar uw gezichtsvermogen. Gezien de aard van het onderzoek is het van belang dat u goed kunt zien. Het dragen van een bril is wel mogelijk. 

<b>Instructie en procedure</b>
U krijgt per trial drie items te zien op uw scherm. Er staat 1 item bovenaan het scherm en onderaan het scherm staan de 2 andere items. Van u wordt verwacht dat u, door middel van de knoppen op uw toetsenbord ??n zo snel mogelijk, een van de onderste items selecteert die qua kleur het meest lijkt op de kleur van het bovenste item. Het experiment zal beginnen met een aantal vragen naar bijvoorbeeld uw zicht, leeftijd en gender en daarna komt een oefentrial. Na de oefentrial zal het daadwerkelijke experiment van start gaan. In totaal bestaat het experiment uit drie blokken die elk bestaan uit 8 triU krijgt per trial drie items te zien op uw scherm. Er staat 1 item bovenaan het scherm en onderaan het scherm staan de 2 andere items. Van u wordt verwacht dat u, met uw toetsenbord zo snel mogelijk, een van de onderste items selecteert die qua kleur het meest lijkt op de kleur van het bovenste item. Het experiment zal beginnen met een aantal vragen naar bijvoorbeeld uw zicht en gender en daarna komt een oefentrial. Na de oefentrial zal het daadwerkelijke experiment van start gaan. In totaal bestaat het experiment uit drie blokken die elk bestaan uit 8 trials. Na de 24 trials ziet u een eindscherm en kan u de pagina sluiten. Het experiment zal ongeveer 5 minuten duren.als. Na de 24 trials ziet u een eindscherm en kan u de pagina sluiten.

<b>Vrijwilligheid</b>
U doet vrijwillig mee aan dit onderzoek. U kunt dan ook op elk moment gedurende het onderzoek uw deelname stopzetten. Dit zal geen gevolgen voor u hebben en u bent in geen geval verplicht de hierboven beschreven procedures af te ronden. Tevens kunt u tot 8 dagen na het onderzoek uw deelname alsnog intrekken. Als u uw deelname staakt of toestemming intrekt, worden alle tot dan toe verzamelde gegevens definitief verwijderd.

<b>Ongemak, Risico???s en Verzekering </b>
De risico???s van deelname aan dit onderzoek zijn niet groter dan die in dagelijkse situaties thuis. Uit ervaring met voorgaande, vergelijkbare onderzoeken is gebleken dat er van enig ongemak voor de deelnemers niet of nauwelijks sprake is. Bij elk onderzoek van de Universiteit van Amsterdam geldt een standaard aansprakelijkheidsverzekering.

<b>Vertrouwelijkheid van de onderzoeksgegevens</b>
De gegevens die in dit onderzoek worden verzameld, zullen door de onderzoekers alleen worden gebruikt voor nadere analyse en voor publicatie in wetenschappelijke tijdschriften. Hierbij wordt geen gebruik gemaakt van uw persoonlijke gegevens en uw anonimiteit blijft onder alle omstandigheden gewaarborgd.
	De verzamelde onderzoeksgegevens zullen gecodeerd opgeslagen worden, apart van uw persoonlijke gegevens. Alleen medewerkers aan het onderzoek hebben toegang tot deze gegevens en de codering. 

<b>Vergoeding</b>
U ontvangt voor uw deelname geen vergoeding. Als u daar prijs op stelt, ontvangt u te zijner tijd een samenvatting met de algemene resultaten van het onderzoek. 

<b>Nadere inlichtingen</b>
Als u nog verdere informatie wilt over dit onderzoek, dan kunt u zich wenden tot 
Francijn Keur, Faust Stierman of Joran Paap (e-mail: francijn.keur@student.uva.nl, faust.stierman@student.uva.nl, joran.paap@student.uva.nl). 
Met eventuele klachten over dit onderzoek kunt u zich wenden tot de secretaris van de Commissie Ethiek van de Faculteit Geesteswetenschappen van de Universiteit van Amsterdam; email: commissie-ethiek-fgw@uva.nl ; telefoon: +31 20 - 525 3054; Kloveniersburgwal 48, 1012 CX Amsterdam.


<b>Toestemmingsformulier </b>

???Ik verklaar hierbij op voor mij duidelijke wijze te zijn ingelicht over het onderzoek kleurherkenning van de Universiteit van Amsterdam, Faculteit der Geesteswetenschappen uitgevoerd door Francijn Keur, Faust Stierman en  Joran Paap onder begeleiding van Hern??n Labb?? Grunberg, zoals uiteengezet in de informatiebrochure. Mijn vragen zijn naar tevredenheid beantwoord. 

Ik stem geheel vrijwillig in met deelname aan dit onderzoek. Ik behoud daarbij het recht deze instemming weer in te trekken zonder dat ik daarvoor een reden hoef op te geven. Ik besef dat ik op elk moment mag stoppen met het onderzoek en tot 8 dagen na het onderzoek mijn deelname alsnog kan intrekken. In het geval dat ik mijn deelname staak of toestemming intrek zullen alle tot dan toe verzamelde gegevens definitief worden verwijderd. 

Indien mijn onderzoeksresultaten gebruikt zullen worden in wetenschappelijke publicaties, dan wel op een andere manier openbaar worden gemaakt, zal dit volledig geanonimiseerd gebeuren. Mijn persoonsgegevens zullen niet door derden worden ingezien zonder mijn uitdrukkelijke toestemming.

Als ik nog verdere informatie over het onderzoek zou willen krijgen, nu of in de toekomst, kan ik me wenden tot Francijn Keur, Faust Stierman of Joran Paap (e-mail: francijn.keur@student.uva.nl, faust.stierman@student.uva.nl, joran.paap@student.uva.nl). 

Met eventuele klachten over dit onderzoek kan ik me wenden tot de secretaris van de Commissie Ethiek van de Faculteit Geesteswetenschappen van de Universiteit van Amsterdam; email: commissie-ethiek-fgw@uva.nl; telefoon: +31 20 - 525 3054; Kloveniersburgwal 48, 1012 CX Amsterdam.???

`;

this.centerBlockStart();
this.addTextBlockWithConsent(
{
     editable:false,
     consentButtonID:'consent', consentButtonText:'Accepteren', consentButtonColor:'Green', consentButtonBackColor:'White', consentButtonFontSize:24,
     consentButtonWidth:'100px', consentButtonHeight:'30px', consentButtonMargin:'20px 0px 0px 0px;',
     declineButtonID:'decline', declineButtonText:'Weigeren', declineButtonColor:'Red', declineButtonBackColor:'White', declineButtonFontSize:24,
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
           this.setStatus(Page.Status.ENDED);

   }
}

class List_vragen extends UserList
{
   constructor(experiment, parent, globals)
   {
     super("vragen", experiment, parent);
     this.globals = globals;
     this.listParent = this;
this.setRandomization(UserList.Randomization.SEQUENTIAL); //RANDOM, SEQUENTIAL
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
this.setMouseDownEnabled(true);
this.setMouseCanEndPage(false);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);


//this.setKeyboardCanEndPage(false);
//this.setMouseDownEnabled(true);
//this.setMouseCanEndPage(true);
//this.setValidClicksOnly(true);
this.multiSelection1 = new MultiSelectionControl("multiSelection1");
this.multiSelection1.setListParent(this.getParent());
this.multiSelection1.setPageParent(this);
this.multiSelection1.setType("[Type]");
this.multiSelection1.setCount("[Count]");
this.multiSelection1.setFeedback("[Feedback]");

//Question, used for all subcontrols
this.multiSelection1.setQuestion("[Question]");
this.multiSelection1.setQuestionFont("Roboto-Regular", Font.BOLD, 36);
this.multiSelection1.setQuestionForeColor(Color.WHITE);
//this.multiSelection1.setQuestionBackColor(Color.LIGHT_GRAY);
this.multiSelection1.setQuestionBorderWidth(0);
this.multiSelection1.setQuestionBorderColor(Color.BLACK);
this.multiSelection1.setQuestionOffsetY(20);
this.multiSelection1.setQuestionDrawBackColorNarrow(true);
this.multiSelection1.setQuestionBackColorMarginHorizVert(5, 5);

//Selection -> radiobuttons/checkboxes/other (text input)
this.multiSelection1.selection_setX(0.1); this.multiSelection1.selection_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection1.selection_setY(0.2); this.multiSelection1.selection_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection1.setWidth(0.3);
this.multiSelection1.selection_setDirection(SelectionControl.Direction.VERTICAL);
this.multiSelection1.selection_setHorizAlign(TextControl.HorizAlign.LEFT);
this.multiSelection1.selection_setAnswers("Answer"); //Main header of answers, e.g. Answer -> Answer1, Answer2, ...
this.multiSelection1.selection_setAnswersFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection1.selection_setAnswersForeColor(Color.WHITE);
this.multiSelection1.selection_setAnswersOffsetXBefore(20); //space before selection control
this.multiSelection1.selection_setAnswersOffsetXAfter(30); //space between selection and answer control
this.multiSelection1.selection_setAnswersOffsetX(150); //space between answers when Directon = 'Horizontal'
this.multiSelection1.selection_setAnswersOffsetY(30); //line space between answers when Direction = 'Vertical'
this.multiSelection1.selection_setSelRadius(12);
this.multiSelection1.selection_setSelBackColor(Color.WHITE);
this.multiSelection1.selection_setSelLineWidth(1);
this.multiSelection1.selection_setSelLineColor(Color.BLACK);
this.multiSelection1.selection_setSelectedBackColor(Color.BLACK);

//SetOtherxxx -> Last item will be input box
this.multiSelection1.selection_setOtherText("");
this.multiSelection1.selection_setOtherOffsetX(0); //set 0 for x-Alignment with other answers
this.multiSelection1.selection_setOtherOffsetY(15); 
this.multiSelection1.selection_setOtherWidth(0.25);
this.multiSelection1.selection_setOtherFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection1.selection_setOtherForeColor(Color.WHITE);
this.multiSelection1.selection_setOtherBackColor(Color.BLUE);
this.multiSelection1.selection_setOtherBorderWidth(1);
this.multiSelection1.selection_setOtherBorderColor(Color.BLACK);
this.multiSelection1.selection_setOtherBackColorMarginHorizVert(1, 1);

//Button will confirm selection
this.multiSelection1.button_setText("[SubmitText]");
this.multiSelection1.button_setX(0.7); this.multiSelection1.button_setXAlign(BaseControl.XAlign.CENTER);
this.multiSelection1.button_setY(0.8); this.multiSelection1.button_setYAlign(BaseControl.YAlign.CENTER);
this.multiSelection1.button_setWidth(100);
this.multiSelection1.button_setHeight(75);
this.multiSelection1.button_setForeColor(Color.BLACK);
this.multiSelection1.button_setBackColor(Color.LIGHT_GRAY);
this.multiSelection1.button_setSelectedBackColor(Color.BLUE);
this.multiSelection1.button_setFont("Roboto-Regular", Font.PLAIN, 24);

//Dropdown list
this.multiSelection1.list_setList("Answer");
this.multiSelection1.list_setX(0.1); this.multiSelection1.list_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection1.list_setY(0.2); this.multiSelection1.list_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection1.list_setWidth(0.75);
this.multiSelection1.list_setListWidth(0.35);
this.multiSelection1.list_setListFont("Roboto-Regular", Font.PLAIN, 18);
this.multiSelection1.list_setListForeColor(Color.BLACK);
this.multiSelection1.list_setListBackColor(Color.LIGHT_GRAY);
this.multiSelection1.list_setListBorderWidth(1);
this.multiSelection1.list_setListBorderColor(Color.BLACK);
this.multiSelection1.list_setSelectionBackColor(Color.GRAY);
this.multiSelection1.list_setSelectedBackColor(Color.BLUE);

//Rating
this.multiSelection1.rating_setX(0.1); this.multiSelection1.rating_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection1.rating_setY(0.2); this.multiSelection1.rating_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection1.rating_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
this.multiSelection1.rating_setGeometry(RatingControl.Geometry.CIRCLE); //SQUARE, CIRCLE
this.multiSelection1.rating_setRatingLeft("Not sure");
this.multiSelection1.rating_setRatingRight("Very sure");
this.multiSelection1.rating_setRatingFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection1.rating_setRatingForeColor(Color.BLACK);
this.multiSelection1.rating_setRatingOffsetY(50);
this.multiSelection1.rating_setAnswers("Answer"); //no spaces
this.multiSelection1.rating_setAnswersFont("Roboto-Regular", Font.PLAIN, 18);
this.multiSelection1.rating_setAnswersForeColor(Color.BLACK);
this.multiSelection1.rating_setAnswersOffsetX(50); //space between answers
this.multiSelection1.rating_setSelRadius(12);
this.multiSelection1.rating_setSelBackColor(Color.BLUE);
this.multiSelection1.rating_setSelLineWidth(1);
this.multiSelection1.rating_setSelLineColor(Color.BLACK);
this.multiSelection1.rating_setSelectedBackColor(Color.BLACK);

//Slider
this.multiSelection1.slider_setX(0.1); this.multiSelection1.slider_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection1.slider_setY(0.3); this.multiSelection1.slider_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection1.slider_setWidth(0.5);
this.multiSelection1.slider_setHeight(40);
this.multiSelection1.slider_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
this.multiSelection1.slider_setBackColor(Color.DARK_GRAY);
this.multiSelection1.slider_setBeforeSelectColor(Color.WHITE);
this.multiSelection1.slider_setKnobColor(Color.BLUE);
this.multiSelection1.slider_setKnobLineColor(Color.BLACK);
this.multiSelection1.slider_setKnobLineWidth(0);
this.multiSelection1.slider_setLabelShow(true);
this.multiSelection1.slider_setLabelWidth(100);
this.multiSelection1.slider_setLabelHeight(30);
this.multiSelection1.slider_setLabelColor(Color.BLUE);
this.multiSelection1.slider_setLabelFont("Roboto-Regular", Font.PLAIN, 14);
this.multiSelection1.slider_setLabelOffset(20);
this.multiSelection1.slider_setMinValue("[Answer1]");
this.multiSelection1.slider_setMaxValue("[Answer2]");
this.multiSelection1.slider_setPos("[Answer3]");
this.multiSelection1.slider_setUseValidation(true);

//Input textbox
this.multiSelection1.textInput_setText("");
this.multiSelection1.textInput_setX(0.1); this.multiSelection1.textInput_setXAlign(BaseControl.XAlign.LEFT);
this.multiSelection1.textInput_setY(0.3); this.multiSelection1.textInput_setYAlign(BaseControl.YAlign.TOP);
this.multiSelection1.textInput_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
this.multiSelection1.textInput_setWidth(0.35);
this.multiSelection1.textInput_setQuestionOffsetY(5);
this.multiSelection1.textInput_setForeColor(Color.WHITE);
this.multiSelection1.textInput_setBackColor(Color.BLUE);
this.multiSelection1.textInput_setFont("Roboto-Regular", Font.PLAIN, 24);
this.multiSelection1.textInput_setBorderWidth(1);
this.multiSelection1.textInput_setBorderColor(Color.BLACK);
this.multiSelection1.textInput_setEndKey("");
this.multiSelection1.textInput_setBackColorMarginHorizVert(1, 1);

this.addControl(this.multiSelection1);

     

   }

   frameFunc()
   {
   	this.multiSelection1.frame();
   }

   finishFunc()
   {
     this.multiSelection1.finish();
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
this.picture5.setScale(PictureControl.Scale.NONE);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
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
this.loadList("lists/voorbeelden.txt");
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
var temp = this.globals.oefenrondeTeller;
this.text9.setText(String.join("\n",
"Voorbeeld " + this.globals.oefenrondeTeller.toString(),
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
"Dat waren de oefenvragen",
"Druk op Spatie om door te gaan naar de test"
));
this.text12.setX(0.5);
this.text12.setY(0.5);
this.text12.setWidth(0.5);
this.text12.setHeight(0.5);
this.text12.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text12.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text12.setFont("Roboto-Regular", Font.BOLD, 36); //PLAIN, BOLD, ITALIC
this.text12.setForeColor(Color.WHITE);
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

class List_set1 extends UserList
{
   constructor(experiment, parent, globals)
   {
     super("set1", experiment, parent);
     this.globals = globals;
     this.listParent = this;
this.setRandomization(UserList.Randomization.RANDOM); //RANDOM, SEQUENTIAL

//this.setListStatus("TEST1");


if(Tools.modEquals(this.globals.seed, 3, 0)){
	this.loadList("lists/controle.txt");
}

else if(Tools.modEquals(this.globals.seed, 3, 1)){
	this.loadList("lists/abstract.txt");
}

else if(Tools.modEquals(this.globals.seed, 3, 2)){
	this.loadList("lists/iconisch.txt");
}
this.add(new Page_itemSet1(experiment, this, globals));
this.add(new Page_tussenPagina1(experiment, this, globals));
   }
}

class Page_itemSet1 extends Page
{
   constructor(experiment, parent, globals)
   {
      super("itemSet1", experiment, parent);
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

this.picture1= new PictureControl("picture1");
this.picture1.setPicture("pics/[item].bmp");
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

class Page_tussenPagina1 extends Page
{
   constructor(experiment, parent, globals)
   {
      super("tussenPagina1", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(1000);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);
   }
}

class List_set2 extends UserList
{
   constructor(experiment, parent, globals)
   {
     super("set2", experiment, parent);
     this.globals = globals;
     this.listParent = this;
this.setRandomization(UserList.Randomization.RANDOM); //RANDOM, SEQUENTIAL
//this.setListStatus("TEST1");

if(Tools.modEquals(this.globals.seed + 1, 3, 0)){
	this.loadList("lists/controle.txt");
}

else if(Tools.modEquals(this.globals.seed + 1, 3, 1)){
	this.loadList("lists/abstract.txt");
}

else if(Tools.modEquals(this.globals.seed + 1, 3, 2)){
	this.loadList("lists/iconisch.txt");
}
this.add(new Page_itemSet2(experiment, this, globals));
this.add(new Page_tussenPagina2(experiment, this, globals));
   }
}

class Page_itemSet2 extends Page
{
   constructor(experiment, parent, globals)
   {
      super("itemSet2", experiment, parent);
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

this.picture1= new PictureControl("picture1");
this.picture1.setPicture("pics/[item].bmp");
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

class Page_tussenPagina2 extends Page
{
   constructor(experiment, parent, globals)
   {
      super("tussenPagina2", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(1000);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);
   }
}

class List_set3 extends UserList
{
   constructor(experiment, parent, globals)
   {
     super("set3", experiment, parent);
     this.globals = globals;
     this.listParent = this;
this.setRandomization(UserList.Randomization.RANDOM); //RANDOM, SEQUENTIAL
//this.setListStatus("TEST1");

if(Tools.modEquals(this.globals.seed + 2, 3, 0)){
	this.loadList("lists/controle.txt");
}

else if(Tools.modEquals(this.globals.seed + 2, 3, 1)){
	this.loadList("lists/abstract.txt");
}

else if(Tools.modEquals(this.globals.seed + 2, 3, 2)){
	this.loadList("lists/iconisch.txt");
}
this.add(new Page_itemSet3(experiment, this, globals));
this.add(new Page_tussenPagina3(experiment, this, globals));
   }
}

class Page_itemSet3 extends Page
{
   constructor(experiment, parent, globals)
   {
      super("itemSet3", experiment, parent);
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

this.picture1= new PictureControl("picture1");
this.picture1.setPicture("pics/[item].bmp");
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

class Page_tussenPagina3 extends Page
{
   constructor(experiment, parent, globals)
   {
      super("tussenPagina3", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   load()
   {
this.setDuration(1000);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);
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
if(Tools.equals(UserData.getItem("Kleurenblind"), "Ja")){
	this.text8.setText(String.join("\n",
	"Ons onderzoek gaat over kleurherkenning.", 
	"",
	"Het is daarom niet mogelijk om mee te doen als je kleurenblind bent,", 
	"excuses.",
	"",
	"voor vragen of op merkingen kan je mailen naar:", 
	"",
	"Faust.stierman@student.uva.nl", 
	"",
	"Francijn.Keur@student.uva.nl", 
	"", 
	"en", 
	"",
	"Joran.Paap@student.uva.nl",
	"",
	"Druk op spatie het experiment te beeindigen"));
}

//this.text8.setText("");
//this.text8.setText(this.globals.allText.get("instr1Text"));
else{
	this.text8.setText(String.join("\n",
	"Namens Faust, Francijn en Joran", 
	"",
	"Bedankt voor het meedoen aan ons experiment", 
	"", 
	"voor vragen of op merkingen kan je mailen naar:", 
	"",
	"Faust.stierman@student.uva.nl", 
	"",
	"Francijn.Keur@student.uva.nl", 
	"", 
	"en", 
	"",
	"Joran.Paap@student.uva.nl",
	"",
	"Druk op spatie het experiment te beeindigen"));
	
}

this.text8.setX(0.5);
this.text8.setY(0.5);
this.text8.setWidth(0.5);
this.text8.setHeight(0.5);
this.text8.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
this.text8.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
this.text8.setFont("Roboto-Regular", Font.PLAIN, 36); //PLAIN, BOLD, ITALIC
this.text8.setForeColor(Color.WHITE);
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