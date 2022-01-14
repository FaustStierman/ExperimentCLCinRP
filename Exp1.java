package experiment;

import edrun.engine.*;
import edrun.engine.controls.*;
import edrun.engine.controls.recordDevice.*;
import edrun.engine.controls.recordDevice.IRecord.*;
import edrun.engine.controls.recordDevice.IVURecord.*;
import edrun.engine.controls.soundDevice.*;
import edrun.engine.controls.soundDevice.ISound.*;
import edrun.engine.controls.videoDevice.*;
import edrun.engine.controls.videoDevice.IVideo.*;
import edrun.engine.controls.eyeTracking.*;
import edrun.engine.graphics.*;
import edrun.engine.graphics.Graphics;
import edrun.engine.graphics.IGraphics.*;
import edrun.engine.userdata.*;
import edrun.engine.utils.*;
import edrun.engine.Events.*;
import edrun.engine.Test.Test;
import eventbox.EventBox;
import eyetracking.tobii.*;
import eyetracking.tobii.Tobii.*;
import eyetracking.tobii.TobiiData.*;
import java.awt.*;
import java.util.*;

public class Exp1 extends ExperimentBuild
{
   public static void main(String[] args)
   {
        Thread.currentThread().setPriority(Thread.MAX_PRIORITY);
        new Exp1().run();
   }

   public void run()
   {
      try
      {
         new Init();
         UserData userData= new UserData("[Type=Integer;Variable=subject;Question=Subject number;Min=1;Max=10000;DefaultValue=]");
         this.setTruncateListsEnabled(true);
         if (this.setup(this, "Exp1", userData))
         {
             this.setSelectedResultHeaders("");
             this.startExperiment();
         }
      }
      catch(Exception ex)
      {
		 this.showError(ex);
		 this.exit();
      }
   }

class Globals
{
int setsCompleted = 0; 

int itemInSet = 1;

String currentSet;

int seed = Tools.getRandomNumber(1, 3); 
int oefenrondeTeller = 1;
String currentItem; 
    public Globals(IGraphics graphics) throws Exception
    {
    }

}

class Init extends Graphics
{
   public Init() throws Exception
   {
setGraphicsDriver(GraphicsDriver.OPENGL_NVG);

setFullScreen(true);
//setFullScreen(false);
setScreenWidth(1000);
setScreenHeight(0);   //0 -> keep aspect ratio, calculate height

setVertSync(VertSync.WAIT_1); //WAIT_0 = Paint immediately, WAIT_1 = Wait for Vertical Sync

SoundControl.setSoundDriver(SoundDriver.JAVA_SOUND); //Multiplatform, preferable for webexperiments
//SoundControl.setSoundDriver(SoundDriver.ASIO); //Only for Windows
//SoundControl.setSoundDriver(SoundDriver.PORTAUDIO); //Multiplatform, must be used in combination with setHostApi or setDeviceIndex
//SoundControl.setHostApi(SoundControl.HostApi.COREAUDIO); //For PortAudio --> Windows: WASAPI, ASIO, DIRECTX,  //Mac: COREAUDIO, //Linux: ALSA, JACK
//SoundControl.setDeviceIndex(10); //For PortAudio --> only needed for specific device within same host, see ED->Tools->Sound->Configure->PortAudio Device IDs

Debug.setDebugAction(Debug.DebugAction.USER); //NONE, USER, INTERNAL, USER_INTERNAL
   }
}

@Override
public void close() throws Exception
{

}

class Page_consent extends Page
{
   Globals globals;
   UserList parent;
   Page_consent(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("consent", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(-1);
this.setKeyboard("{ANY}");
this.setMouseDownEnabled(true);
this.setMouseCanEndPage(true);
this.setBackColor(Color.GRAY);

TextControl text_consent = new TextControl("consent");
text_consent.setText("HTML Control - consent");
text_consent.setX(0.5);
text_consent.setY(0.5);
text_consent.setWidth(0.5);
text_consent.setHeight(0.5);
text_consent.setFont("Roboto-Regular", Font.PLAIN, 24);
text_consent.setForeColor(Color.BLACK);
text_consent.setBackColor(Color.BLUE);
text_consent.setHtmlViewPage("htmlViewFile_1.html");
text_consent.setLogResults(false);
this.addControl(text_consent);



this.addHTMLResults("");
   }
}

class List_vragen extends UserList
{
   Globals globals;

   List_vragen(ExperimentBuild experiment, UserList parent, Globals globals) throws Exception
   {
     super("vragen", experiment, parent);
     this.globals = globals;
     try
     {
        this.setListParent(this);
this.setRandomization(UserList.Randomization.RANDOM); //RANDOM, SEQUENTIAL
this.loadList("lists/vragen.txt");
//this.setListStatus("TEST1");
this.add(new Page_toonVragen(experiment, this, globals));
    }
    catch(Exception ex)
    {
       throw ex;
    }
   }
}

class Page_toonVragen extends Page
{
   Globals globals;
   UserList parent;
   MultiSelectionControl multiSelection2;
   Page_toonVragen(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("toonVragen", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
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
multiSelection2 = new MultiSelectionControl("multiSelection2");
multiSelection2.setListParent(this.getParent());
multiSelection2.setPageParent(this);
multiSelection2.setType("[Type]");
multiSelection2.setCount("[Count]");
multiSelection2.setFeedback("[Feedback]");

//Question, used for all subcontrols
multiSelection2.setQuestion("[Question]");
multiSelection2.setQuestionFont("Roboto-Regular", Font.BOLD, 36);
multiSelection2.setQuestionForeColor(Color.WHITE);
//multiSelection2.setQuestionBackColor(Color.LIGHT_GRAY);
multiSelection2.setQuestionBorderWidth(0);
multiSelection2.setQuestionBorderColor(Color.BLACK);
multiSelection2.setQuestionOffsetY(20);
multiSelection2.setQuestionDrawBackColorNarrow(true);
multiSelection2.setQuestionBackColorMarginHorizVert(5, 5);

//Selection -> radiobuttons/checkboxes/other (text input)
multiSelection2.selection_setX(0.1); multiSelection2.selection_setXAlign(BaseControl.XAlign.LEFT);
multiSelection2.selection_setY(0.2); multiSelection2.selection_setYAlign(BaseControl.YAlign.TOP);
multiSelection2.setWidth(0.3);
multiSelection2.selection_setDirection(SelectionControl.Direction.VERTICAL);
multiSelection2.selection_setHorizAlign(TextControl.HorizAlign.LEFT);
multiSelection2.selection_setAnswers("Answer"); //Main header of answers, e.g. Answer -> Answer1, Answer2, ...
multiSelection2.selection_setAnswersFont("Roboto-Regular", Font.PLAIN, 24);
multiSelection2.selection_setAnswersForeColor(Color.WHITE);
multiSelection2.selection_setAnswersOffsetXBefore(20); //space before selection control
multiSelection2.selection_setAnswersOffsetXAfter(30); //space between selection and answer control
multiSelection2.selection_setAnswersOffsetX(150); //space between answers when Directon = 'Horizontal'
multiSelection2.selection_setAnswersOffsetY(30); //line space between answers when Direction = 'Vertical'
multiSelection2.selection_setSelRadius(12);
multiSelection2.selection_setSelBackColor(Color.WHITE);
multiSelection2.selection_setSelLineWidth(1);
multiSelection2.selection_setSelLineColor(Color.WHITE);
multiSelection2.selection_setSelectedBackColor(Color.BLACK);

//SetOtherxxx -> Last item will be input box
multiSelection2.selection_setOtherText("");
multiSelection2.selection_setOtherOffsetX(0); //set 0 for x-Alignment with other answers
multiSelection2.selection_setOtherOffsetY(15); 
multiSelection2.selection_setOtherWidth(0.25);
multiSelection2.selection_setOtherFont("Roboto-Regular", Font.PLAIN, 24);
multiSelection2.selection_setOtherForeColor(Color.WHITE);
multiSelection2.selection_setOtherBackColor(Color.BLUE);
multiSelection2.selection_setOtherBorderWidth(1);
multiSelection2.selection_setOtherBorderColor(Color.BLACK);
multiSelection2.selection_setOtherBackColorMarginHorizVert(1, 1);

//Button will confirm selection
multiSelection2.button_setText("[SubmitText]");
multiSelection2.button_setX(0.7); multiSelection2.button_setXAlign(BaseControl.XAlign.CENTER);
multiSelection2.button_setY(0.8); multiSelection2.button_setYAlign(BaseControl.YAlign.CENTER);
multiSelection2.button_setWidth(100);
multiSelection2.button_setHeight(75);
multiSelection2.button_setForeColor(Color.WHITE);
multiSelection2.button_setBackColor(Color.LIGHT_GRAY);
multiSelection2.button_setSelectedBackColor(Color.BLUE);
multiSelection2.button_setFont("Roboto-Regular", Font.PLAIN, 24);

//Dropdown list
multiSelection2.list_setList("Answer");
multiSelection2.list_setX(0.1); multiSelection2.list_setXAlign(BaseControl.XAlign.LEFT);
multiSelection2.list_setY(0.2); multiSelection2.list_setYAlign(BaseControl.YAlign.TOP);
multiSelection2.list_setWidth(0.75);
multiSelection2.list_setListWidth(0.35);
multiSelection2.list_setListFont("Roboto-Regular", Font.PLAIN, 18);
multiSelection2.list_setListForeColor(Color.WHITE);
multiSelection2.list_setListBackColor(Color.LIGHT_GRAY);
multiSelection2.list_setListBorderWidth(1);
multiSelection2.list_setListBorderColor(Color.BLACK);
multiSelection2.list_setSelectionBackColor(Color.GRAY);
multiSelection2.list_setSelectedBackColor(Color.BLUE);

//Rating
multiSelection2.rating_setX(0.1); multiSelection2.rating_setXAlign(BaseControl.XAlign.LEFT);
multiSelection2.rating_setY(0.2); multiSelection2.rating_setYAlign(BaseControl.YAlign.TOP);
multiSelection2.rating_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
multiSelection2.rating_setGeometry(RatingControl.Geometry.CIRCLE); //SQUARE, CIRCLE
multiSelection2.rating_setRatingLeft("Not sure");
multiSelection2.rating_setRatingRight("Very sure");
multiSelection2.rating_setRatingFont("Roboto-Regular", Font.PLAIN, 24);
multiSelection2.rating_setRatingForeColor(Color.BLACK);
multiSelection2.rating_setRatingOffsetY(50);
multiSelection2.rating_setAnswers("Answer"); //no spaces
multiSelection2.rating_setAnswersFont("Roboto-Regular", Font.PLAIN, 18);
multiSelection2.rating_setAnswersForeColor(Color.BLACK);
multiSelection2.rating_setAnswersOffsetX(50); //space between answers
multiSelection2.rating_setSelRadius(12);
multiSelection2.rating_setSelBackColor(Color.BLUE);
multiSelection2.rating_setSelLineWidth(1);
multiSelection2.rating_setSelLineColor(Color.BLACK);
multiSelection2.rating_setSelectedBackColor(Color.BLACK);

//Slider
multiSelection2.slider_setX(0.1); multiSelection2.slider_setXAlign(BaseControl.XAlign.LEFT);
multiSelection2.slider_setY(0.3); multiSelection2.slider_setYAlign(BaseControl.YAlign.TOP);
multiSelection2.slider_setWidth(0.5);
multiSelection2.slider_setHeight(40);
multiSelection2.slider_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
multiSelection2.slider_setBackColor(Color.DARK_GRAY);
multiSelection2.slider_setBeforeSelectColor(Color.WHITE);
multiSelection2.slider_setKnobColor(Color.BLUE);
multiSelection2.slider_setKnobLineColor(Color.BLACK);
multiSelection2.slider_setKnobLineWidth(0);
multiSelection2.slider_setLabelShow(true);
multiSelection2.slider_setLabelWidth(100);
multiSelection2.slider_setLabelHeight(30);
multiSelection2.slider_setLabelColor(Color.BLUE);
multiSelection2.slider_setLabelFont("Roboto-Regular", Font.PLAIN, 14);
multiSelection2.slider_setLabelOffset(20);
multiSelection2.slider_setMinValue("[Answer1]");
multiSelection2.slider_setMaxValue("[Answer2]");
multiSelection2.slider_setPos("[Answer3]");
multiSelection2.slider_setUseValidation(true);

//Input textbox
multiSelection2.textInput_setText("");
multiSelection2.textInput_setX(0.1); multiSelection2.textInput_setXAlign(BaseControl.XAlign.LEFT);
multiSelection2.textInput_setY(0.3); multiSelection2.textInput_setYAlign(BaseControl.YAlign.TOP);
multiSelection2.textInput_setQuestionAlign(BaseControl.QuestionAlign.LEFT);
multiSelection2.textInput_setWidth(0.35);
multiSelection2.textInput_setQuestionOffsetY(5);
multiSelection2.textInput_setForeColor(Color.WHITE);
multiSelection2.textInput_setBackColor(Color.BLUE);
multiSelection2.textInput_setFont("Roboto-Regular", Font.PLAIN, 24);
multiSelection2.textInput_setBorderWidth(1);
multiSelection2.textInput_setBorderColor(Color.BLACK);
multiSelection2.textInput_setEndKey("");
multiSelection2.textInput_setBackColorMarginHorizVert(1, 1);

this.addControl(multiSelection2);

     

   }
    @Override
    public void frameFunc() throws Exception
    {
   	this.multiSelection2.frame();
    }

    @Override
    public void finishFunc() throws Exception
    {
     this.multiSelection2.finish();
    }

}

class Page_uitleg extends Page
{
   Globals globals;
   UserList parent;
   PictureControl picture5;
   Page_uitleg(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("uitleg", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

picture5 = new PictureControl("picture5");
picture5.setPicture("pics/uitleg.png");
picture5.setX(0.5);
picture5.setY(0.5);
picture5.setWidth(1);
picture5.setHeight(1);
//picture5.setRadius(15);
picture5.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
picture5.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
picture5.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
picture5.setBorderWidth(0);
picture5.setBorderColor(Color.BLUE);
picture5.setZOrder(10);
picture5.setValidClick(false);
this.addControl(picture5);
   }
}

class List_voorbeelden extends UserList
{
   Globals globals;

   List_voorbeelden(ExperimentBuild experiment, UserList parent, Globals globals) throws Exception
   {
     super("voorbeelden", experiment, parent);
     this.globals = globals;
     try
     {
        this.setListParent(this);
this.setRandomization(UserList.Randomization.SEQUENTIAL); //RANDOM, SEQUENTIAL
this.loadList("lists/voorbeelden.tsv");
//this.setListStatus("TEST1");
this.add(new Page_toonVoorbeeld(experiment, this, globals));
    }
    catch(Exception ex)
    {
       throw ex;
    }
   }
}

class Page_toonVoorbeeld extends Page
{
   Globals globals;
   UserList parent;
   PictureControl picture2;
   TextControl text9;
   Page_toonVoorbeeld(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("toonVoorbeeld", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(-1);
this.setKeyboard("ad{RIGHT}{LEFT}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(false);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

picture2 = new PictureControl("picture2");
picture2.setPicture("pics/[afbeelding].bmp");
picture2.setX(0.5);
picture2.setY(0.5);
picture2.setWidth(0.8);
picture2.setHeight(0.8);
//picture2.setRadius(15);
picture2.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
picture2.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
picture2.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
picture2.setBorderWidth(0);
picture2.setBorderColor(Color.BLUE);
picture2.setZOrder(10);
picture2.setValidClick(false);
this.addControl(picture2);

text9 = new TextControl("text9");
//text9.setText("");
//text9.setText(this.globals.allText.get("instr1Text"));
text9.setText(String.join("\n",
"Voorbeeld " + String.format("%d",this.globals.oefenrondeTeller),
"Match deze kleur met rechts of links"
));
text9.setX(0.5);
text9.setY(0.05);
text9.setWidth(0.5);
text9.setHeight(0.5);
text9.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text9.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text9.setFont("Roboto-Regular", Font.BOLD, 36); //PLAIN, BOLD, ITALIC
text9.setForeColor(Color.WHITE);
//text9.setBackColor(Color.WHITE);
text9.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text9.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text9.setBorderWidth(0);
text9.setBorderColor(Color.BLACK);
text9.setDrawBackColorNarrow(false);
text9.setBackColorMarginHorizVert(0, 0);
text9.setValidClick(false);
this.addControl(text9);

this.globals.oefenrondeTeller++;
   }
}

class Page_startTrail extends Page
{
   Globals globals;
   UserList parent;
   TextControl text12;
   Page_startTrail(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("startTrail", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

text12 = new TextControl("text12");
//text12.setText("");
//text12.setText(this.globals.allText.get("instr1Text"));
text12.setText(String.join("\n",
"Dat waren de oefenvragen",
"Druk op Spatie om door te gaan naar de test"
));
text12.setX(0.5);
text12.setY(0.5);
text12.setWidth(0.5);
text12.setHeight(0.5);
text12.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text12.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text12.setFont("Roboto-Regular", Font.BOLD, 36); //PLAIN, BOLD, ITALIC
text12.setForeColor(Color.BLACK);
//text12.setBackColor(Color.WHITE);
text12.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text12.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text12.setBorderWidth(0);
text12.setBorderColor(Color.BLACK);
text12.setDrawBackColorNarrow(false);
text12.setBackColorMarginHorizVert(0, 0);
text12.setValidClick(false);
this.addControl(text12);
   }
}

class Code_preTrail extends Code
{
   Globals globals;
   Code_preTrail(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("preTrail", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
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
   Globals globals;
   UserList parent;
   PictureControl picture4;
   Page_fixatieKruis(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("fixatieKruis", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(500);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(false);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(false);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

picture4 = new PictureControl("picture4");
picture4.setPicture("pics/fixatieKruis.bmp");
picture4.setX(0.5);
picture4.setY(0.5);
picture4.setWidth(0.8);
picture4.setHeight(0.8);
//picture4.setRadius(15);
picture4.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
picture4.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
picture4.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
picture4.setBorderWidth(0);
picture4.setBorderColor(Color.BLUE);
picture4.setZOrder(10);
picture4.setValidClick(false);
this.addControl(picture4);
   }
}

class Page_testItemN extends Page
{
   Globals globals;
   UserList parent;
   PictureControl picture1;
   Page_testItemN(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("testItemN", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(-1);
this.setKeyboard("ad{RIGHT}{LEFT}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

picture1 = new PictureControl("picture1");
picture1.setPicture("pics/" + this.globals.currentItem + ".bmp");
picture1.setX(0.5);
picture1.setY(0.5);
picture1.setWidth(0.8);
picture1.setHeight(0.8);
//picture1.setRadius(15);
picture1.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
picture1.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
picture1.setScale(PictureControl.Scale.STRETCH_ASPECTRATIO);  //NONE, STRETCH, STRETCH_ASPECTRATIO, WIDTH, HEIGHT
picture1.setBorderWidth(0);
picture1.setBorderColor(Color.BLUE);
picture1.setZOrder(10);
picture1.setValidClick(false);
this.addControl(picture1);
   }
}

class Code_code2 extends Code
{
   Globals globals;
   Code_code2(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("code2", experiment, parent);
      this.globals = globals;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
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
   Globals globals;
   UserList parent;
   TextControl text8;
   Page_einde(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("einde", experiment, parent);
      this.globals = globals;
      this.parent = parent;
      this.pageParent = this;
   }

   @Override
   public void load() throws Exception
   {
this.setDuration(-1);
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

text8 = new TextControl("text8");
//text8.setText("");
//text8.setText(this.globals.allText.get("instr1Text"));

text8.setText(String.join("\n",
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
"Joran.Paap@student.uva.nl"
));
text8.setX(0.5);
text8.setY(0.5);
text8.setWidth(0.5);
text8.setHeight(0.5);
text8.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text8.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text8.setFont("Roboto-Regular", Font.PLAIN, 36); //PLAIN, BOLD, ITALIC
text8.setForeColor(Color.WHITE);
//text8.setBackColor(Color.WHITE);
text8.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text8.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text8.setBorderWidth(0);
text8.setBorderColor(Color.BLACK);
text8.setDrawBackColorNarrow(false);
text8.setBackColorMarginHorizVert(0, 0);
text8.setValidClick(false);
this.addControl(text8);
   }
}

Globals globals;

@Override
public void createExperiment() throws Exception
{
this.setPageColor(Color.WHITE);
globals= new Globals(this.graphics);
flow.addPage(new Page_consent(this, null, globals));
flow.addList(new List_vragen(this, null, globals));
flow.addPage(new Page_uitleg(this, null, globals));
flow.addList(new List_voorbeelden(this, null, globals));
flow.addPage(new Page_startTrail(this, null, globals));
flow.addCode(new Code_preTrail(this, null, globals));
flow.addPage(new Page_fixatieKruis(this, null, globals));
flow.addPage(new Page_testItemN(this, null, globals));
flow.addCode(new Code_code2(this, null, globals));
flow.addPage(new Page_einde(this, null, globals));
}

@Override
public void preloadFonts() throws Exception
{
FontPreload fontPreload = new FontPreload();
fontPreload.addFont("Roboto-Regular");
this.graphics.preloadFonts(fontPreload);
}
}
