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

//setFullScreen(true);
setFullScreen(false);
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

class Page_ID extends Page
{
   Globals globals;
   UserList parent;
   TextControl text2;
   Page_ID(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("ID", experiment, parent);
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

text2 = new TextControl("text2");
text2.setText("ID");
//text2.setText(this.globals.allText.get("instr1Text"));
text2.setText(String.join("\n",
"ID"
));
text2.setX(0.5);
text2.setY(0.5);
text2.setWidth(0.5);
text2.setHeight(0.5);
text2.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text2.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text2.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text2.setForeColor(Color.WHITE);
//text2.setBackColor(Color.WHITE);
text2.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text2.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text2.setBorderWidth(0);
text2.setBorderColor(Color.BLACK);
text2.setDrawBackColorNarrow(false);
text2.setBackColorMarginHorizVert(0, 0);
text2.setValidClick(false);
this.addControl(text2);
   }
}

class Page_consent extends Page
{
   Globals globals;
   UserList parent;
   TextControl text1;
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
this.setKeyboard("{SPACE}");
this.setKeyboardCanEndPage(true);
this.setMouseDownEnabled(false);
this.setMouseCanEndPage(true);
this.setValidClicksOnly(true);
this.setBackColor(Color.GRAY);
this.setTransparent(false);

text1 = new TextControl("text1");
text1.setText("Consent");
//text1.setText(this.globals.allText.get("instr1Text"));
text1.setText(String.join("\n",
"Consent"
));
text1.setX(0.5);
text1.setY(0.5);
text1.setWidth(0.5);
text1.setHeight(0.5);
text1.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text1.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text1.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text1.setForeColor(Color.WHITE);
//text1.setBackColor(Color.WHITE);
text1.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text1.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text1.setBorderWidth(0);
text1.setBorderColor(Color.BLACK);
text1.setDrawBackColorNarrow(false);
text1.setBackColorMarginHorizVert(0, 0);
text1.setValidClick(false);
this.addControl(text1);
   }
}

class Page_geslacht extends Page
{
   Globals globals;
   UserList parent;
   TextControl text3;
   Page_geslacht(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("geslacht", experiment, parent);
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

text3 = new TextControl("text3");
text3.setText("Geslacht");
//text3.setText(this.globals.allText.get("instr1Text"));
text3.setText(String.join("\n",
"Geslacht"
));
text3.setX(0.5);
text3.setY(0.5);
text3.setWidth(0.5);
text3.setHeight(0.5);
text3.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text3.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text3.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text3.setForeColor(Color.WHITE);
//text3.setBackColor(Color.WHITE);
text3.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text3.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text3.setBorderWidth(0);
text3.setBorderColor(Color.BLACK);
text3.setDrawBackColorNarrow(false);
text3.setBackColorMarginHorizVert(0, 0);
text3.setValidClick(false);
this.addControl(text3);
   }
}

class Page_visie extends Page
{
   Globals globals;
   UserList parent;
   TextControl text4;
   Page_visie(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("visie", experiment, parent);
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

text4 = new TextControl("text4");
text4.setText("Visie");
//text4.setText(this.globals.allText.get("instr1Text"));
text4.setText(String.join("\n",
"Visie"
));
text4.setX(0.5);
text4.setY(0.5);
text4.setWidth(0.5);
text4.setHeight(0.5);
text4.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text4.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text4.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text4.setForeColor(Color.WHITE);
//text4.setBackColor(Color.WHITE);
text4.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text4.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text4.setBorderWidth(0);
text4.setBorderColor(Color.BLACK);
text4.setDrawBackColorNarrow(false);
text4.setBackColorMarginHorizVert(0, 0);
text4.setValidClick(false);
this.addControl(text4);
   }
}

class Page_kleurenblind extends Page
{
   Globals globals;
   UserList parent;
   TextControl text5;
   Page_kleurenblind(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("kleurenblind", experiment, parent);
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

text5 = new TextControl("text5");
text5.setText("Visie");
//text5.setText(this.globals.allText.get("instr1Text"));
text5.setText(String.join("\n",
"Kleurenblind"
));
text5.setX(0.5);
text5.setY(0.5);
text5.setWidth(0.5);
text5.setHeight(0.5);
text5.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text5.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text5.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text5.setForeColor(Color.WHITE);
//text5.setBackColor(Color.WHITE);
text5.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text5.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text5.setBorderWidth(0);
text5.setBorderColor(Color.BLACK);
text5.setDrawBackColorNarrow(false);
text5.setBackColorMarginHorizVert(0, 0);
text5.setValidClick(false);
this.addControl(text5);
   }
}

class Page_uitleg extends Page
{
   Globals globals;
   UserList parent;
   TextControl text6;
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

text6 = new TextControl("text6");
text6.setText("uitleg");
//text6.setText(this.globals.allText.get("instr1Text"));
text6.setText(String.join("\n",
"Uitleg"
));
text6.setX(0.5);
text6.setY(0.5);
text6.setWidth(0.5);
text6.setHeight(0.5);
text6.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text6.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text6.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text6.setForeColor(Color.WHITE);
//text6.setBackColor(Color.WHITE);
text6.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text6.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text6.setBorderWidth(0);
text6.setBorderColor(Color.BLACK);
text6.setDrawBackColorNarrow(false);
text6.setBackColorMarginHorizVert(0, 0);
text6.setValidClick(false);
this.addControl(text6);
   }
}

class Page_oefenvoorbeeld extends Page
{
   Globals globals;
   UserList parent;
   TextControl text7;
   Page_oefenvoorbeeld(ExperimentBuild experiment, UserList parent, Globals globals)
   {
      super("oefenvoorbeeld", experiment, parent);
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

text7 = new TextControl("text7");
text7.setText("oefenvoorbeeld");
//text7.setText(this.globals.allText.get("instr1Text"));
text7.setText(String.join("\n",
"OefenVoorbeeld"
));
text7.setX(0.5);
text7.setY(0.5);
text7.setWidth(0.5);
text7.setHeight(0.5);
text7.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text7.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text7.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text7.setForeColor(Color.WHITE);
//text7.setBackColor(Color.WHITE);
text7.setHorizAlign(TextControl.HorizAlign.CENTER); //LEFT, CENTER, RIGHT
text7.setVertAlign(TextControl.VertAlign.CENTER); //TOP, CENTER, BOTTOM
text7.setBorderWidth(0);
text7.setBorderColor(Color.BLACK);
text7.setDrawBackColorNarrow(false);
text7.setBackColorMarginHorizVert(0, 0);
text7.setValidClick(false);
this.addControl(text7);
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
this.setKeyboard("zm");
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
picture1.setWidth(0.5);
picture1.setHeight(0.5);
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
"Einde"
));
text8.setX(0.5);
text8.setY(0.5);
text8.setWidth(0.5);
text8.setHeight(0.5);
text8.setXAlign(BaseControl.XAlign.CENTER); //LEFT, CENTER, RIGHT
text8.setYAlign(BaseControl.YAlign.CENTER); //TOP, CENTER, BOTTOM
text8.setFont("Roboto-Regular", Font.PLAIN, 24); //PLAIN, BOLD, ITALIC
text8.setForeColor(Color.BLACK);
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
flow.addPage(new Page_ID(this, null, globals));
flow.addPage(new Page_consent(this, null, globals));
flow.addPage(new Page_geslacht(this, null, globals));
flow.addPage(new Page_visie(this, null, globals));
flow.addPage(new Page_kleurenblind(this, null, globals));
flow.addPage(new Page_uitleg(this, null, globals));
flow.addPage(new Page_oefenvoorbeeld(this, null, globals));
flow.addCode(new Code_preTrail(this, null, globals));
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
