// Set experiment constants
var expprefix = "buss";
manualSendResults = true;

// Set experiment sequence
//var shuffleSequence = seq("consent", "recordid", "background", "practiceintro", startsWith("practice_"), "intro", "Catch_trial_1", rshuffle(startsWith(expprefix)), "exitqs", "sendresults", "debriefing");
var shuffleSequence = seq("consent", "background", "practiceintro", startsWith("practice_"), "intro", "Catch_trial_1", rshuffle(startsWith(expprefix)), "exitqs", "sendresults", "debriefing");


// Get participant ID from URL
//var curURL = window.location.search.substring(1);
//curURL = curURL.split("=");
//idnum = curURL[1];
//if(idnum == undefined){
 // alert("MAJOR PROBLEM: there is no ID number!!! Contact someone immediately. \n Defaulting the ID number to 99.")
 // idnum = 99;
//}


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
    s: "Please rate how melodic the following musical phrase sounds.",
    as: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]],
    presentAsScale: true,
    timeout: 3000,
    instructions: "Use number keys or click boxes to answer.",
    leftComment: "(Random)", rightComment: "(Melodic)"
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


var __SentenceCompletionItem = ["SentenceCompletion", "Form", {saveReactionTime: true,
    html: ["p",
            ["span", "Instructions for SentenceCompletion go here!"],
            ["input"]
          ]
    }];


// Set item list
var items = [

  ["consent", "Form", {consentRequired: false, html: {include: "consent_BUSpeechSong.html" }} ],

  //["recordid", "DashedSentence", {s: idnum.toString() + "_" + listnum.toString(), mode: "speeded acceptability", wordTime: 2}],

  ["background", "Form", {consentRequired: false, html: {include: "background.html" }} ],

  ["practiceintro", Message, {consentRequired: false
    html: ["div",
    ["p", "Please put your headphones/earphones on, or make sure your speakers are working. You will hear a series of musical phrases and you will have 3 second to indicate if the phrase seems melodic or not. Once you make your judgement you will be asked to complete the last part of a sentence. After 3 seconds, if you have not made a judgement then you will be pushed to the next page. You will start with four practice trials to give you an idea of how the experiment will work."]
  ]}],

  ["intro", Message, {consentRequired: false,
    html: ["div",
    ["p", "The test will now begin. Again, you will hear a series of musical phrases and you will have 3 seconds to indicate whether the phrase sounded melodic or not and then be asked to finish an incomplete sentence. After 3 seconds, if you have not responded, the program will automatically go on to the next page."]
  ]}],

  ["exitqs", "Form", {consentRequired: false, html: {include: "exitqs.html" }} ],

  ["sep", "Separator", { }],

  ["sendresults", "__SendResults__", { }],

  ["debriefing", "Form", {consentRequired: false, html: {include: "debriefing.html" }} ]

];

  // For loop to create practice items
  for (i = 1; i < 5; i++) {
    var itemname = "practice_" + i.toString() + "";
    var itemX = [itemname];
    for (j = 0; j < 8; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemname + ".html"},});
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
      itemX = itemX.concat(__SentenceCompletionItem.slice(1,3));
    }
    items.push(itemX);
  }

  // For loop to create experimental stimuli items
  for (i = 1; i < 61; i++) {
    var itemname = expprefix + "_list" + listnum.toString() + "_item" + i.toString();
    var itemX = [itemname];
    for (j = 0; j < 8; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemname + ".html"},});
      // alert("adding " + itemname + ".html");
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
      itemX = itemX.concat(__SentenceCompletionItem.slice(1,3));
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
    for (j = 0; j < 4; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemnamestem + "_speech.html"}});
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
    }
    for (j = 0; j < 4; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemnamestem + "_song.html"}});
      itemX.push("AcceptabilityJudgment");
      itemX.push({});
      itemX = itemX.concat(__SentenceCompletionItem.slice(1,3));
    }
    items.push(itemX);
  }