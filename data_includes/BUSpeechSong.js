// Set experiment constants
var expprefix = "buss";
manualSendResults = true;

// Set experiment sequence
var shuffleSequence = seq("consent", "recordid", "background", "practiceintro", startsWith("practice_"), "intro", "Catch_trial_1", rshuffle(startsWith(expprefix)), "exitqs", "sendresults", "debriefing");


// Get participant ID
var idnum = Math.floor(Math.random()*Math.pow(10,17));
/*
// from URL
var curURL = window.location.search.substring(1);
curURL = curURL.split("=");
idnum = curURL[1];
if(idnum == undefined){
  alert("MAJOR PROBLEM: there is no ID number!!! Contact someone immediately. \n Defaulting the ID number to 99.")
  idnum = 99;
}
*/


// Use random number generator to choose list for current participant
var listnum = Math.floor(Math.random() * (6 - 1 + 1) + 1);

// Set controller defaults
var defaults = [

  "Separator", {
    transfer: 1000,
    normalMessage: "Please wait for the next sentence.",
    errorMessage: "Wrong. Please wait for the next sentence."
  },

  "AcceptabilityJudgment", {
    s: "Please rate how melodic vs. unmelodic that sounded below.",
    as: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]],
    presentAsScale: true,
    timeout: 3000,
    instructions: "Use number keys or click boxes to answer.",
    leftComment: "(Unmelodic)", rightComment: "(Melodic)"
  },

  "Question", {
    hasCorrect: false
  },

  "Message", {
    hideProgressBar: true
  },

  "Form", {
    hideProgressBar: true,
    continueOnReturn: false,
    saveReactionTime: false
  },

  "AudioMessage", {
    consentRequired:false,
    transfer: 'audio-end'
  }

];


function __SentenceCompletionItem(){
  var stimuli = ["The tourist guide mentioned the bells of the church that",
 " My friend mentioned the students of the piano teacher who",
 "The worker built the beams in the house that",
 "The video showed me the supervisor of the architect who",
 "Our paper illuminated the theory of the phenomenon that",
 "The article talked about the spouse of the actor who",
 "The truck drove into the garage in the driveway that",
 "The diner chef cooked for the waiter of the customer who"],
 var chosen_stimuli = stimuli[Math.floor(Math.random()*stimuli.length)];
 return ["SentenceCompletion", "Form", {
  saveReactionTime: true,
  html: "<p>"+chosen_stimuli+"<input type='text' size='75' name='SentenceCompletion' class='obligatory'></p>"}];
}


// Set item list
var items = [

  ["consent", "Form", {consentRequired: false, html: {include: "consent_BUSpeechSong.html" }} ],

  ["recordid", "DashedSentence", {s: idnum.toString() + "_" + listnum.toString(), mode: "speeded acceptability", wordTime: 2}],

  ["background", "Form", {consentRequired: false, html: {include: "background.html" }} ],

  ["practiceintro", Message, {consentRequired: false,
    html: ["div",
    ["p", "Please put your headphones/earphones on, or make sure your speakers are working. You will hear a series of musical phrases, and after each phrase, you will have 5 seconds to indicate whether the phrase sounded melodic or not. After the phrase is presented you will be given an incomplete sentence to finish. After 5 seconds, if you have not responded, the program will automatically forward you to a sentence fragment. You will start with four practice trials to give you an idea of how the experiment will work."]
  ]}],

  ["intro", Message, {consentRequired: false,
    html: ["div",
    ["p", "The test will now begin. Again, you will hear a series of musical phrases, and be asked to rate how melodic it sounded in 5 seconds. After hearing each phrase, you will be presented with a sentence fragment which you will be asked to complete. After 5 seconds, if you have not made a judgment the program will automatically go on to the sentence completion task."]
  ]}],

  ["exitqs", "Form", {consentRequired: false, html: {include: "exitqs.html" }} ],

  ["sep", "Separator", { }],

  //["sendresults", "__SendResults__", { }], // we're sending results at the end

  ["debriefing", "Form", {consentRequired: false, html: {include: "debriefing.html" }} ]

];

  // For loop to create practice items
  for (i = 1; i < 3; i++) {
    var itemname = "practice_" + i.toString() + "";
    var itemX = [itemname];
    for (j = 0; j < 1; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemname + ".html"},});
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
      itemX = itemX.concat(__SentenceCompletionItem().slice(1,3));
    }
    items.push(itemX);
  }

  // For loop to create experimental stimuli items
  for (i = 1; i < 6; i++) {
    for (j = 0; j < 1; j++) {
      var itemname = expprefix + "_list" + listnum.toString() + "_item" + i.toString();
      var itemX = [itemname];
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemname + ".html"},});
      // alert("adding " + itemname + ".html");
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
      itemX = itemX.concat(__SentenceCompletionItem().slice(1,3));
    }
    items.push(itemX);
  }

  // For loop to create catch trial items
  for (i = 1; i < 5; i++) {
    var itemnamestem = "Catch_trial_" + i.toString();
    if (i > 1) { // Allows to always start with catch_trial_1, but randomly include the rest in the shuffleSequence
      itemname = expprefix + '_' + itemnamestem;
    } else if (i == 1) {
      itemname = itemnamestem;
    }
    var itemX = [itemname];
    for (j = 0; j < 1; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemnamestem + "_speech.html"}});
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
      itemX = itemX.concat(__SentenceCompletionItem().slice(1,3));
    }
    items.push(itemX);
  }

items.push(["sendresults", "__SendResults__", { }]);
