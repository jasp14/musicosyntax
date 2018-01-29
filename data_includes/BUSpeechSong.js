// Set experiment constants
var expprefix = "buss";
manualSendResults = true;

// Set experiment sequence
var shuffleSequence = seq("consent", "recordid", "background", "practiceintro", startsWith("practice_"), "intro", "Catch_trial_1", rshuffle(startsWith(expprefix)), "exitqs", "sendresults", "debriefing");

// Get participant ID from URL
var curURL = window.location.search.substring(1);
curURL = curURL.split("=");
idnum = curURL[1];
if(idnum == undefined){
  alert("MAJOR PROBLEM: there is no ID number!!! Contact someone immediately. \n Defaulting the ID number to 99.")
  idnum = 99;
}


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
    s: "Please rate how much that sounded like speech vs. song, using the scale below.",
    as: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["0", "10"]],
    presentAsScale: true,
    timeout: 3000,
    instructions: "Use number keys or click boxes to answer.",
    leftComment: "(Speech)", rightComment: "(Song)"
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


var __SentenceCompletionItem = ["SentenceCompletion", "Form",
  {saveReactionTime: true,
    html: ["div", ["p", "This is the first paragraph."], ["p", "This is the second paragraph.", "Containing two text nodes."] ]
  }]


// Set item list
var items = [

  ["consent", "Form", {consentRequired: false, html: {include: "consent_BUSpeechSong.html" }} ],

  ["recordid", "DashedSentence", {s: idnum.toString() + "_" + listnum.toString(), mode: "speeded acceptability", wordTime: 2}],

  ["background", "Form", {consentRequired: false, html: {include: "background.html" }} ],

  ["practiceintro", Message, {consentRequired: false,
    html: ["div",
    ["p", "Please put your headphones/earphones on, or make sure your speakers are working. You will hear a series of spoken phrases, each repeated eight times. After each phrase, you will have 3 seconds to indicate whether the phrase sounded more like speech or more like song. As the phrase is repeated your perception of the phrase may or may not change; either way just do your best to accurately report how song-like the phrase sounds after each repetition. After 3 seconds, if you have not responded, the program will automatically go on to the next phrase. You will start with four practice trials to give you an idea of how the experiment will work."]
  ]}],

  ["intro", Message, {consentRequired: false,
    html: ["div",
    ["p", "The test will now begin. Again, you will hear a series of spoken phrases, each repeated eight times. After each phrase, you will have 3 seconds to indicate whether the phrase sounded more like speech or more like song. As the phrase is repeated your perception of the phrase may or may not change; either way just do your best to accurately report how song-like the phrase sounds after each repetition. After 3 seconds, if you have not responded, the program will automatically go on to the next phrase."]
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
      itemX.push(__SentenceCompletionItem);
      itemX.push({});
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
      itemX.push(__SentenceCompletionItem);
      itemX.push({});
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
      itemX.push(__SentenceCompletionItem);
      itemX.push({});
    }
    for (j = 0; j < 4; j++) {
      itemX.push("AudioMessage");
      itemX.push({html: {include: itemnamestem + "_song.html"}});
      itemX.push("AcceptabilityJudgment");
      //itemX.push(__SentenceCompletionItem);
      itemX.push({});
    }
    items.push(itemX);
  }
