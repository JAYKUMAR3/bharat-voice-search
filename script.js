/* LOGIN / SIGNUP */
function openLogin(){loginPop.style.display="block"}
function openSignup(){loginPop.style.display="none";signupPop.style.display="block"}
function closeAll(){loginPop.style.display=signupPop.style.display="none"}

function signup(){
 if(spass.value!==cpass.value){alert("Password mismatch");return;}
 localStorage.setItem("user",fname.value);
 alert("Account Created");
 closeAll();
}

function login(){
 let u=localStorage.getItem("user");
 if(luser.value===u){
  userName.innerText=u;
  profileName.innerText=u;
  closeAll();
 }else alert("Wrong username");
}

/* NAV */
function show(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById(id).classList.add("active");
}

/* SUBSCRIBE */
let subs=0;
function subscribe(){
 if(subBtn.innerText==="Subscribe"){subs++;subBtn.innerText="Subscribed";}
 else{subs--;subBtn.innerText="Subscribe";}
 subCount.innerText=subs;
}

/* LIKE (SINGLE USER) */
let longLiked=false,longLikes=0;
function likeLong(){
 longLiked=!longLiked;
 longLikes+=longLiked?1:-1;
 longLike.innerText=longLikes;
}

let shortLiked=false,sLikes=0;
function shortLike(){
 shortLiked=!shortLiked;
 sLikes+=shortLiked?1:-1;
 shortLikeCount.innerText=sLikes;
}

/* COMMENTS */
function addLongComment(){
 if(!longCommentInput.value) return;
 let p=document.createElement("p");
 p.innerText=longCommentInput.value;
 longCommentList.appendChild(p);
 longCommentInput.value="";
}

function addShortComment(){
 if(!shortCommentInput.value) return;
 let p=document.createElement("p");
 p.innerText=shortCommentInput.value;
 shortCommentList.appendChild(p);
 shortCommentInput.value="";
}

/* SHARE */
function openShare(){sharePop.style.display="block"}
function closeShare(){sharePop.style.display="none"}
function shareTo(app){alert("Share to "+app)}

/* UPLOAD */
function uploadVideo(){
 let file=videoFile.files[0];
 let title=vtitle.value.trim();
 let tags=vtags.value.trim();
 let desc=vdesc.value.trim();
 let type=vtype.value;

 if(!file || !title || !tags || !desc || !type){
  alert("Please fill all fields");
  return;
 }

 let url=URL.createObjectURL(file);
 showTitle.innerText=title;
 showTags.innerText=tags;
 showDesc.innerText=desc;

 if(type==="long"){
  mainVideo.src=url;
  show("home");
 }

 if(type==="short"){
  shortVideo.src=url;
  let v=document.createElement("video");
  v.src=url;
  v.muted=true;
  v.onclick=()=>show("shorts");
  shortPreviewRow.appendChild(v);
  show("home");
 }

 alert("Upload successful (Demo)");
}
function searchVideo(){
  alert("Search: " + document.getElementById("searchBox").value);
}