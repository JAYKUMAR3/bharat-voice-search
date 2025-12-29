function doSearch(){
  let q = document.getElementById("searchInput").value;
  if(q.toLowerCase().includes("cake")){
    document.querySelector(".cake").scrollIntoView();
  }else{
    window.open("https://www.google.com/search?q=" + q);
  }
}

function startVoice(){
  const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  r.lang = "en-IN";
  r.onresult = e => {
    document.getElementById("searchInput").value = e.results[0][0].transcript;
    doSearch();
  };
  r.start();
}