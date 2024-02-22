import "./styles.css";
//import meal from "./index.js";
var carry = "";
try {
  const startBtn = document.createElement("button");
  var goodWords = [
    "good",
    "awesome",
    "amazing",
    "great",
    "well",
    "pleasure",
    "fine"
  ];

  var badWords = [
    "horrible",
    "bad",
    "awful",
    "trash",
    "stupid",
    "annoying",
    "tough",
    "crap"
  ];
  //var def = "";
  var heyWords = [
    "hi ",
    "hello",
    "wassup",
    "hey",
    "what's up",
    "good morning",
    "good afternoon",
    "good evening"
  ];

  var thankWords = ["thanks", "thank you"];

  let checklist = [];

  var questionWords = ["how are you", "how is it going", "how you doing"];

  var byeWords = ["goodbye", "bye", "seeyou", "exit"];

  var stateWords = ["iam", "i'am", "ihad", "i'm"];

  var preword = "";

  async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
  }

  startBtn.innerHTML = "Start listening";
  const result = document.createElement("div");
  //const animation = document.createElement("div");
  //animation.class = "animation";
  //document.getElementById("hello").classList.add("normal");

  const processing = document.createElement("p");
  //processing.style.font = "Helvetica";
  //processing.style.fontSize = 22;

  document.body.append(startBtn);
  document.body.append(result);
  document.body.append(processing);
  //document.body.append(animation);

  function startin(secs) {
    toggleBtn();
    secs = secs * 1000;
    setTimeout(toggleBtn, secs);
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  //let sav = "ha";
  var voices = window.speechSynthesis.getVoices();
  console.log();

  let utt = new window.SpeechSynthesisUtterance();
  utt.voice = voices[11];
  utt.text = "";
  speechSynthesis.speak(utt);

  // speech to text
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let toggleBtn = null;
  if (typeof SpeechRecognition === "undefined") {
    startBtn.remove();
    result.innerHTML =
      "<b>Browser does not support Speech API. Please download latest chrome.<b>";
  } else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const res = event.results[last];
      //var tolder = res[0];
      const text = res[0].transcript;

      if (res.isFinal) {
        processing.innerHTML = "processing ....";

        const response = process(text);
        const p = document.createElement("p");
        //const para1 = document.getElementById("para1");

        //p.style.font = "Helvetica";
        //p.style.fontSize = 20;
        if (response != null) {
          p.innerHTML = `<b>You said:</b> ${text} </br><b>Shade said:</b> ${response}`;
          processing.innerHTML = "";

          result.appendChild(p);

          // text to speech
          var voices = window.speechSynthesis.getVoices();

          let utt = new window.SpeechSynthesisUtterance();
          utt.voice = voices[50];
          utt.text = response;

          speechSynthesis.speak(utt);
        } else {
          p.innerHTML = `<b>You said:</b> ${text} </br>`;

          processing.innerHTML = "";
          result.appendChild(p);
        }
      } else {
        const p = document.createElement("p");

        //p.style.font = "Helvetica";
        //p.style.fontSize = 18;
        p.innerHTML = `listening: ${text}`;
      }
    };
    let listening = false;

    try {
      toggleBtn = () => {
        if (listening) {
          recognition.stop();
          startBtn.textContent = "Start listening";
          listening = false;
          document.getElementById("hello").classList.add("normal");
        } else {
          recognition.start();
          listening = true;
          startBtn.textContent = "Stop listening";
          document.getElementById("hello").classList.add("element");
        }
        //listening = !listening;
      };
    } catch (err) {}

    function boggleBtn() {
      if (listening) {
        document.getElementById("hello").classList.add("normal");
      }
    }

    startBtn.addEventListener("click", toggleBtn);
    startBtn.addEventListener("click", boggleBtn());
  }

  //----------------------------------------------
  // --------------THE DIVIDER--------------------
  //----------------------------------------------
  // processor
  function process(rawText) {
    var holder = rawText;
    let text = rawText.replace(/\s/g, "");
    text = text.toLowerCase();
    let response = null;
    let byevar = "yes";

    //var holder = hold;

    if (preword == "Hi, how are you doing?") {
      if (text.includes("not")) {
        overall(goodWords, "Sorry to hear that. It will be alright!");
        overall(badWords, "Great to hear!");
      } else {
        overall(badWords, "Sorry to hear that. It will be alright!");
        overall(goodWords, "Great to hear!");
      }
    }

    if (text.includes("time")) {
      response = new Date().toLocaleTimeString();
      startin(3);
    }

    if (text.includes("search")) {
      window.open(
        `http://google.com/search?q=${rawText.replace("search", "")}`,
        "_blank"
      );
      response = `Here is what I found for ${rawText.replace("search", "")}`;
      startin(3.5);
    }

    function byeBye(value, index, array) {
      if (byevar == "yes") {
        if (text.includes(value)) {
          response = "Goodbye";
          toggleBtn();
          byevar = "no";
        }
      }
    }
    byeWords.forEach(byeBye);

    function overall(list, res) {
      var check = "no";

      function heyFunc(value, index, array) {
        if (holder.includes(value)) {
          check = "yes";
        }
      }

      list.forEach(heyFunc);

      if (check === "yes") {
        startin(3.5);
        response = res;
      }
    }

    function stringCheck(value, word) {
      if (text.includes(value)) {
        startin(3.5);
        response = word;
      }
    }

    stringCheck("whoareyou", "I am Shade, a virtual assistant");
    stringCheck("what'syourname", "My name's Shade");
    stringCheck("whatisyourname", "My name's Shade");
    stringCheck("whatdoyoudo", "A lot of awesome things");
    stringCheck("whatcanyoudo", "A lot of awesome things");

    overall(heyWords, "Hi, how are you doing?");
    overall(questionWords, "I am doing great! Thanks for asking");
    overall(thankWords, "Your Welcome!");

    function state(list) {
      var check = "no";

      function heyFunc(value, index, array) {
        if (text.includes(value)) {
          check = "yes";
        }
      }

      list.forEach(heyFunc);

      if (check == "yes") {
        if (text.includes("not")) {
          overall(goodWords, "Sorry to hear that. It will be alright!");
          overall(badWords, "Great to hear!");
        } else {
          overall(badWords, "Sorry to hear that. It will be alright!");
          overall(goodWords, "Great to hear!");
        }
      }
    }

    state(stateWords);

    async function handleSubmit(word) {
      try {
        const results = await searchWikipedia(word);
        //console.log(results.query.search[0].snippet);
        console.log(results);
        var def = results.query.search[0].snippet;

        def = def.replace(/span/g, "");
        def = def.replace(/< class/g, "");
        def = def.replace(/>/g, "");
        def = def.replace(/</g, "");
        def = def.replace(/"searchmatch"/g, "");
        def = def.replace(/=/g, "");
        def = def.replace("/", "");
        def = def.replace("/", "");

        const defArray = def.split(".");

        def = defArray[0];

        //console.log(def);

        //response = def;
      } catch (err) {
        console.log(err);
        def = "Try a different keyword";
        alert("Failed to search wikipedia");
      }

      //response = def;
      //console.log(def);
      response = def;
      console.log(response);

      let utt = new window.SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      utt.voice = voices[50];
      utt.text = response;
      speechSynthesis.speak(utt);
      //const result = document.createElement("div");
      const processing = document.createElement("p");

      document.body.append(result);
      document.body.append(processing);
      const p = document.createElement("p");
      p.innerHTML = `<b>Shade said:</b> ${response}`;
      processing.innerHTML = "";

      result.appendChild(p);
      startin(5);

      //response = await def;
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (text.includes("gym")) {
      window.open(`https://www.google.com/maps/search/gym`, "_blank");
      response = "Here is your nearest gym";
      startin(3);
    }
    if (text.includes("workout")) {
      var work = localStorage.getItem("workout");
      if (text.includes("plan") || text.includes("list")) {
        for (var i = 0; i < work.length; i++) {
          response += work[i] + ", ";
        }
      } else {
        var rand = randomInt(0, work.length - 1);
        response = work[rand];
      }
    } else if (text.includes("meal") || text.includes("food")) {
      var item = localStorage.getItem("mealList");
      if (text.includes("plan") || text.includes("list")) {
        response = item;
        startin(5);
      } else {
        const myArray = item.split(",");
        var num = randomInt(0, myArray.length - 1);
        response = myArray[num];
        startin(2);
      }
    } else if (text.includes("  +")) {
      holder = holder.replace(" +", "");
      const plusArray = holder.split(" ");
      let num1 = plusArray[plusArray.length - 2];
      let num2 = plusArray[plusArray.length - 1];

      num1 = parseInt(num1, 10);
      num2 = parseInt(num2, 10);

      let ans = num1 + num2;
      startin(3.5);
      response = `The answer is ${ans}`;
    } else if (text.includes("-")) {
      holder = holder.replace(" -", "");
      const plusArray = holder.split(" ");
      let num1 = plusArray[plusArray.length - 2];
      let num2 = plusArray[plusArray.length - 1];

      num1 = parseInt(num1, 10);
      num2 = parseInt(num2, 10);

      let ans = num1 - num2;
      startin(3.5);
      response = `The answer is ${ans}`;
    } else if (text.includes("*")) {
      holder = holder.replace(" *", "");
      const plusArray = holder.split(" ");
      let num1 = plusArray[plusArray.length - 2];
      let num2 = plusArray[plusArray.length - 1];

      num1 = parseInt(num1, 10);
      num2 = parseInt(num2, 10);

      let ans = num1 * num2;
      startin(3.5);
      response = `The answer is ${ans}`;
    } else if (text.includes("/")) {
      holder = holder.replace(" /", "");
      const plusArray = holder.split(" ");
      let num1 = plusArray[plusArray.length - 2];
      let num2 = plusArray[plusArray.length - 1];

      num1 = parseInt(num1, 10);
      num2 = parseInt(num2, 10);

      let ans = num1 / num2;
      startin(3.5);
      response = `The answer is ${ans}`;
    } else if (text.includes("+")) {
      holder = holder.replace(" +", "");
      const plusArray = holder.split(" ");
      let num1 = plusArray[plusArray.length - 2];
      let num2 = plusArray[plusArray.length - 1];

      num1 = parseInt(num1, 10);
      num2 = parseInt(num2, 10);

      let ans = num1 + num2;
      startin(3.5);
      response = `The answer is ${ans}`;
    } else if (text.includes("whois") || text.includes("whatis")) {
      console.log(holder);
      holder = holder.replace(" a", "");
      holder = holder.replace(" an", "");
      const myArray = holder.split("is");

      console.log(myArray[1]);

      handleSubmit(myArray[1]);
    }

    if (text.includes("copytext")) {
      document.execCommand("copy");
      response = "Copied";
    }

    if (text.includes("textanalysis") || text.includes("analyzetext")) {
      window.open("https://wordcounter.net/");
      response = "Opening Word Counter";
      startin(2);
    }

    if (text.includes("checklist")) {
      if (text.includes("add")) {
        var listHolder = holder.replace("to the checklist", "");
        listHolder = holder.replace("in the checklist", "");
        listHolder = holder.replace("add", "");
        listHolder = holder.replace("can you", "");
        listHolder = holder.replace("could you", "");
        var thing = holder.replace("please", "");

        console.log(listHolder);

        //let splitList = listHolder.split("add");
        //console.log(splitList);
        //var thing = splitList[1];
        //console.log(thing);
        checklist.push(thing);
        response = `added ${thing} to the checklist`;

        //splitList.splice(0, 1)
      } else if (text.includes("remove")) {
        var listHolder2 = text.replace("tothechechlist", "");
        listHolder2 = listHolder.replace("inthechechlist", "");
        let splitList2 = listHolder2.split("remove", 1);
        var thing2 = splitList2[1];
        checklist.replace(thing2, "");
      } else {
        console.log(checklist);
        response = checklist;
      }
      startin(5);
    }

    var preword = response;

    return response;
  }
} catch (err) {
  alert("Something went wrong, reload the page");
}
