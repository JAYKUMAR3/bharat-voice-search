window.onerror = function(msg, url, line) {
    console.error("JS ERROR:", msg, "Line:", line);
};
/* ================== GLOBAL SAFETY ================== */
window.onerror = function (msg, url, line) {
  console.error("JS ERROR:", msg, "Line:", line);
};

/* ================== PAGE SWITCH ================== */
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(id);
  if (page) page.classList.add("active");
}

/* ================== POPUPS ================== */
function openLogin() {
  document.getElementById("loginPop").style.display = "block";
}
function openSignup() {
  closeAll();
  document.getElementById("signupPop").style.display = "block";
}
function closeAll() {
  document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
}
function openShare() {
  document.getElementById("sharePop").style.display = "block";
}
function closeShare() {
  document.getElementById("sharePop").style.display = "none";
}

/* ================== USER STORAGE ================== */
function getUsers() {
  return JSON.parse(localStorage.getItem("bharatlite_users")) || {};
}
function saveUsers(users) {
  localStorage.setItem("bharatlite_users", JSON.stringify(users));
}

/* ================== SIGNUP ================== */
function signup() {
  const fname = document.getElementById("fname")?.value;
  const mname = document.getElementById("mname")?.value || "";
  const lname = document.getElementById("lname")?.value || "";
  const email = document.getElementById("email")?.value;
  const phone = document.getElementById("phone")?.value;
  const pass = document.getElementById("spass")?.value;
  const cpass = document.getElementById("cpass")?.value;

  if (!fname || !pass || !cpass) {
    alert("Fill required fields");
    return;
  }
  if (pass !== cpass) {
    alert("Password not match");
    return;
  }
  if (!email && !phone) {
    alert("Email or Phone required");
    return;
  }

  const username = email || phone;
  const users = getUsers();

  if (users[username]) {
    alert("User already exists");
    return;
  }

  users[username] = {
    fname, mname, lname, email, phone, password: pass
  };
  saveUsers(users);

  alert("Account created. Please login.");
  closeAll();
  openLogin();
}

/* ================== LOGIN ================== */
function login() {
  const username = document.getElementById("luser")?.value;
  const pass = document.getElementById("lpass")?.value;

  if (!username || !pass) {
    alert("Enter username & password");
    return;
  }

  const users = getUsers();
  if (!users[username]) {
    alert("User not found");
    return;
  }
  if (users[username].password !== pass) {
    alert("Wrong password");
    return;
  }

  localStorage.setItem("bharatlite_current", username);
  document.getElementById("profileName").innerText =
    users[username].fname + " " + users[username].lname;

  closeAll();
  show("profile");
}

/* ================== FORGOT PASSWORD ================== */
function forgotPassword() {
  const u = prompt("Enter Email or Phone");
  if (!u) return;
  const users = getUsers();
  if (!users[u]) {
    alert("User not found");
    return;
  }
  alert("Password: " + users[u].password);
}

/* ================== LOGOUT ================== */
function logout() {
  localStorage.removeItem("bharatlite_current");
  document.getElementById("profileName").innerText = "";
  show("home");
}

/* ================== SUBSCRIBE ================== */
let subscribed = false;
let subCount = 0;
function subscribe() {
  subscribed = !subscribed;
  subCount += subscribed ? 1 : -1;
  document.getElementById("subBtn").innerText =
    subscribed ? "Subscribed" : "Subscribe";
  document.getElementById("subCount").innerText = subCount;
}

/* ================== LIKES ================== */
let longLiked = false;
function likeLong() {
  if (longLiked) return;
  longLiked = true;
  const el = document.getElementById("longLike");
  el.innerText = Number(el.innerText) + 1;
}

let shortLiked = false;
function shortLike() {
  if (shortLiked) return;
  shortLiked = true;
  const el = document.getElementById("shortLikeCount");
  el.innerText = Number(el.innerText) + 1;
}

/* ================== COMMENTS ================== */
function addLongComment() {
  const inp = document.getElementById("longCommentInput");
  const list = document.getElementById("longCommentList");
  if (!inp.value) return;
  list.innerHTML += `<p>${inp.value}</p>`;
  inp.value = "";
}

function addShortComment() {
  const inp = document.getElementById("shortCommentInput");
  const list = document.getElementById("shortCommentList");
  if (!inp.value) return;
  list.innerHTML += `<p>${inp.value}</p>`;
  inp.value = "";
}

/* ================== SHARE ================== */
function shareTo(p) {
  alert("Shared to " + p);
  closeShare();
}

/* ================== VIDEO UPLOAD ================== */
function uploadVideo() {
  const file = document.getElementById("videoFile").files[0];
  if (!file) {
    alert("Select video");
    return;
  }

  const url = URL.createObjectURL(file);
  const type = document.getElementById("vtype").value;

  document.getElementById("showTitle").innerText =
    document.getElementById("vtitle").value;
  document.getElementById("showDesc").innerText =
    document.getElementById("vdesc").value;
  document.getElementById("showTags").innerText =
    document.getElementById("vtags").value;

  if (type === "short") {
    document.getElementById("shortVideo").src = url;

    const v = document.createElement("video");
    v.src = url;
    v.controls = true;
    v.className = "short";
    document.getElementById("shortPreviewRow").appendChild(v);
  } else {
    document.getElementById("mainVideo").src = url;
  }

  show("home");
}

/* ================== PROFILE PHOTO CROP ================== */
let cropper = null;

function selectPhoto(e) {
  if (typeof Cropper === "undefined") {
    alert("Cropper.js not loaded");
    return;
  }

  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const img = document.getElementById("cropImage");
    img.src = reader.result;

    document.getElementById("cropArea").style.display = "block";

    if (cropper) cropper.destroy();
    cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1
    });

    document.getElementById("savePhotoBtn").disabled = false;
  };
  reader.readAsDataURL(file);
}

function saveCroppedPhoto() {
  if (!cropper) {
    alert("Cropper not ready");
    return;
  }
  const canvas = cropper.getCroppedCanvas({ width: 512, height: 512 });
  const data = canvas.toDataURL("image/png");
  localStorage.setItem("bharatlite_photo", data);

  const img = document.getElementById("profilePhoto");
  img.src = data;
  img.style.display = "block";
  document.getElementById("cropArea").style.display = "none";
}

/* ================== AUTO LOAD ================== */
window.onload = function () {
  const u = localStorage.getItem("bharatlite_current");
  if (u) {
    const users = getUsers();
    if (users[u]) {
      document.getElementById("profileName").innerText =
        users[u].fname + " " + users[u].lname;
    }
  }

  const photo = localStorage.getItem("bharatlite_photo");
  if (photo) {
    const img = document.getElementById("profilePhoto");
    img.src = photo;
    img.style.display = "block";
  }
};