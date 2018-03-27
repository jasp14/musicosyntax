// Set experiment constants
var expprefix = "harmprime";
manualSendResults = true;

// Set experiment sequence
var shuffleSequence = seq("consent", "recordid", "background", "practiceintro", startsWith("practice_"), "intro", "Catch_trial_1", rshuffle(startsWith(expprefix)), "exitqs", "sendresults", "debriefing");


// Get participant ID
var idnum = Math.floor(Math.random() * Math.pow(10, 17));
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
var listnum = Math.floor(Math.random() * 0) + 1;

// Set controller defaults
var defaults = [

    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },

    "AcceptabilityJudgment", {
        s: "Please rate how melodic vs. unmelodic that sounded below.",
        as: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"]
        ],
        presentAsScale: true,
        timeout: 3000,
        instructions: "Use number keys or click boxes to answer.",
        leftComment: "(Unmelodic)",
        rightComment: "(Melodic)"
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
        consentRequired: false,
        transfer: 'audio-end'
    }

];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var sentence_stimuli = [
    "The cow was about to eat the grass of the pasture that",
    "My friend walked down the street of the town that",
    "His boss yelled at the intern of the employee who",
    "The lumberjack cut down the branch of the tree that",
    "The tourist guide mentioned the bells of the church that",
    "My friend mentioned the students of the piano teacher who",
    "The worker built the beams in the house that",
    "The video showed me the supervisor of the architect who",
    "Our paper illuminated the theory of the phenomenon that",
    "The article talked about the spouse of the actor who",
    "The truck drove into the garage in the driveway that",
    "The diner chef cooked for the waiter of the customer who",
    "The barista made drink for the friend of the fireman who",
    "The flowers complemented the sculpture on the table that",
    "My painting made it into the competition at the museum which",
    "Her uniform depicted the symbol of the school that",
    "Our students protested on the lawn of the building that",
    "The surfer swam to the shore of the mainland that",
    "The queen ruled the people of the culture who",
    "The fighter walked to the match of the championship that",
    "The mountain climber hiked to the top of the peak of the mountain that",
    "The wolf ran across the bridge of the canyon that",
    "The bodyguard gave service to the brother of the master who",
    "The banker gave money to the employee of the investor who",
    "The champion won the prize of the contest that",
    "My sister talked about the steeple of the palace that",
    "The dog ran across the planks of the bridge that",
    "His ship flew past the galaxy of the solar system that",
    "The saxophone belonged to the servant of the musician who",
    "The storm scared the cook of the president who",
    "Her cat scratched the therapist of the man who",
    "The mom drank the wine of the vineyard that",
    "The project involved the people of the king who",
    "The protest was about a law in the state that",
    "The son wanted the bottle of the alcohol that",
    "The scientist found evidence for the theory of the phenomena that",
    "The cook made the food in the pot that",
    "The farmer grew vegetables for the party of the festival that",
    "He sold the ring to the boss of the mailman who",
    "They knocked on the door of the house that",
    "She painted the wall of the study that",
    "The car drove down the road of the city that",
    "The government arrived at the scene of the crime that",
    "My brother stole the artifact in the museum that",
    "Her truck drove down the cliff of the canyon that",
    "The film featured the climax of the saga that",
    "The TV show twisted the lives of the servant of the man who",
    "The band played the show in the cellar of the club that",
    "The boy was nervous when he sat in the bed of his house that",
    "The plane flew by the moisture of the cloud that",
    "The teacher graded the question of the test that",
    "The author wrote the book of the event that"
];
shuffleArray(sentence_stimuli);

function __SentenceCompletionItem() {
    if (sentence_stimuli.length == 0) {
        alert("WE'RE OUT OF SENTENCE STIMULI! JACOB, WE'VE GOT A PROBLEM! (more trials than sentences)");
    }
    var chosen_stimuli = sentence_stimuli.pop();
    return ["SentenceCompletion", "Form", {
        saveReactionTime: true,
        html: "<p>" + chosen_stimuli + "<input type='text' size='75' name='SentenceCompletion' class='obligatory'><input type='text' style='display:none;' name='TargetSentence' value='" + chosen_stimuli + "'></p>"
    }];
}


// Set item list
var items = [

    ["consent", "Form", {
        consentRequired: false,
        html: {
            include: "consent_BUSpeechSong.html"
        }
    }],

    ["recordid", "DashedSentence", {
        s: idnum.toString() + "_" + listnum.toString(),
        mode: "speeded acceptability",
        wordTime: 2
    }],

    ["background", "Form", {
        consentRequired: false,
        html: {
            include: "background.html"
        }
    }],

    ["practiceintro", Message, {
        consentRequired: false,
        html: ["div", ["p", "Please put your headphones/earphones on, or make sure your speakers are working. You will hear a series of musical phrases, and after each phrase, you will have 5 seconds to indicate whether the phrase sounded melodic or not. After the phrase is presented you will be given an incomplete sentence to finish. After 5 seconds, if you have not responded, the program will automatically forward you to a sentence fragment. You will start with four practice trials to give you an idea of how the experiment will work."]]
    }],

    ["intro", Message, {
        consentRequired: false,
        html: ["div", ["p", "The test will now begin. Again, you will hear a series of musical phrases, and be asked to rate how melodic it sounded in 5 seconds. After hearing each phrase, you will be presented with a sentence fragment which you will be asked to complete. After 5 seconds, if you have not made a judgment the program will automatically go on to the sentence completion task."]]
    }],

    ["exitqs", "Form", {
        consentRequired: false,
        html: {
            include: "exitqs.html"
        }
    }],

    ["sep", "Separator", {}],

    //["sendresults", "__SendResults__", { }], // we're sending results at the end

    ["debriefing", "Form", {
        consentRequired: false,
        html: {
            include: "debriefing.html"
        }
    }]

];

// For loop to create practice items
for (i = 1; i < 5; i++) {
    var itemname = "practice_" + i.toString() + "";
    var itemX = [itemname];
    for (j = 0; j < 1; j++) {
        itemX.push("AudioMessage");
        itemX.push({
            html: {
                include: itemname + ".html"
            },
        });
        itemX.push("AcceptabilityJudgment");
        itemX.push({});
        itemX = itemX.concat(__SentenceCompletionItem().slice(1, 3));
    }
    items.push(itemX);
}

// For loop to create experimental stimuli items
for (i = 1; i < 13; i++) {
    var atts = ['_la', '_ha', '_low', '_high'];
    for(atts_i in atts){
        var itemname = expprefix + "_list" + listnum.toString() + atts[atts_i] + i.toString();
        var itemX = [itemname];
        for (j = 0; j < 1; j++) {
            itemX.push("AudioMessage");
            itemX.push({
                html: {
                    include: itemname + ".html"
                },
            });
            itemX.push("AcceptabilityJudgment");
            itemX.push({});
            itemX = itemX.concat(__SentenceCompletionItem().slice(1, 3));
        }
        items.push(itemX);
    }
}


/* We don't need catch trials for now...
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
        itemX.push({
            html: {
                include: itemnamestem + "_speech.html"
            }
        });
        itemX.push("AcceptabilityJudgment");
        itemX.push({});
        itemX = itemX.concat(__SentenceCompletionItem().slice(1, 3));
    }
    items.push(itemX);
}
*/

items.push(["sendresults", "__SendResults__", {}]);
