function show(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

/***********************
 POPUPS
************************/
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

/***********************
 AUTH (DUMMY – WORKING)
************************/
function login() {
  alert("Login clicked (backend later)");
}

function signup() {
  alert("Signup clicked (backend later)");
}

function logout() {
  alert("Logged out");
}

function forgotPassword() {
  alert("Forgot password clicked");
}

/***********************
 VIDEO ACTIONS
************************/
let subCount = 0;
function subscribe() {
  subCount++;
  document.getElementById("subCount").innerText = subCount;
}

let longLikes = 0;
function likeLong() {
  longLikes++;
  document.getElementById("longLike").innerText = longLikes;
}

let shortLikes = 0;
function shortLike() {
  shortLikes++;
  document.getElementById("shortLikeCount").innerText = shortLikes;
}

/***********************
 COMMENTS
************************/
function addLongComment() {
  const input = document.getElementById("longCommentInput");
  if (!input.value) return;

  const div = document.createElement("div");
  div.innerText = input.value;
  document.getElementById("longCommentList").appendChild(div);

  input.value = "";
}

/***********************
 SHARE
************************/
let shareCount = 0;
function shareTo(app) {
  shareCount++;
  document.getElementById("shareCount").innerText = shareCount;
  alert("Shared to " + app);
}

function copyLink() {
  navigator.clipboard.writeText(location.href);
  alert("Link copied");
}

/***********************
 UPLOAD (SAFE DUMMY)
************************/
function uploadVideo() {
  alert("Upload clicked (Supabase storage later)");
}

/***********************
 PRIVACY / DELETE
************************/
function setPublic() {
  alert("Video set to Public");
}

function setPrivate() {
  alert("Video set to Private");
}

function deleteVideo() {
  if (confirm("Delete video?")) {
    alert("Video deleted");
  }
}

function openReport() {
  alert("Report submitted");
}

/***********************
 PROFILE PHOTO (SAFE)
************************/
let cropper;

function selectPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = document.getElementById("cropImage");
  img.src = URL.createObjectURL(file);

  document.getElementById("cropArea").style.display = "block";

  if (cropper) cropper.destroy();
  cropper = new Cropper(img, { aspectRatio: 1 });
}

function saveCroppedPhoto() {
  const canvas = cropper.getCroppedCanvas();
  document.getElementById("profilePhoto").src = canvas.toDataURL();
  document.getElementById("profilePhoto").style.display = "block";
  document.getElementById("cropArea").style.display = "none";
}
console.log("Main script loaded");

// test button
function subscribe() {
  alert("Subscribe clicked");
}

function likeLong() {
  alert("Liked");
}

// Supabase use only when needed
function testSupabase() {
  if (!window.supabaseClient) {
    alert("Supabase not ready");
    return;
  }
  console.log("Supabase OK");
}
// ===== VIDEO DURATION VALIDATION =====
function uploadVideo() {
  const fileInput = document.getElementById("videoFile");
  const type = document.getElementById("vtype").value;

  if (!fileInput.files.length) {
    alert("Please select a video file");
    return;
  }

  if (!type) {
    alert("Please select video type");
    return;
  }

  const file = fileInput.files[0];
  const video = document.createElement("video");
  video.preload = "metadata";

  video.onloadedmetadata = function () {
    window.URL.revokeObjectURL(video.src);
    const duration = video.duration; // seconds

    // SHORT RULE
    if (type === "short" && duration > 90) {
      alert("❌ Shorts max duration is 90 seconds");
      fileInput.value = "";
      return;
    }

    // LONG RULE
    if (type === "long" && duration > 300) {
      alert("❌ Long video max duration is 5 minutes");
      fileInput.value = "";
      return;
    }

    // ✅ PASS
    alert("✅ Video duration accepted. Upload started...");

    // 👉 yaha tumhara existing upload logic rahega
    // supabase upload / local upload jo bhi hai
  };

  video.src = URL.createObjectURL(file);
}