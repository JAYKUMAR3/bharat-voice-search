// 🔹 Supabase details (yahan apna paste karo)
const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL"
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_PUBLIC_KEY"

// 🔹 Supabase connect
const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)

// 🔹 Upload function
async function uploadVideo() {
  const titleInput = document.getElementById("title")
  const fileInput = document.getElementById("videoFile")
  const status = document.getElementById("status")

  const title = titleInput.value
  const file = fileInput.files[0]

  // 🔴 Basic checks
  if (!title || !file) {
    alert("Title aur video dono chahiye")
    return
  }

  // 🔴 50MB free plan safety
  if (file.size > 50 * 1024 * 1024) {
    alert("Video 50MB se zyada nahi ho sakta")
    return
  }

  status.innerText = "Uploading..."

  // 🔹 Unique file name
  const fileName = Date.now() + "-" + file.name

  // 🔹 Upload to Supabase Storage (bucket: video_url)
  const { error: uploadError } = await supabase
    .storage
    .from("video_url")   // ✅ bucket name
    .upload(fileName, file)

  if (uploadError) {
    status.innerText = "Upload failed: " + uploadError.message
    return
  }

  // 🔹 Get public URL
  const { data: publicData } = supabase
    .storage
    .from("video_url")
    .getPublicUrl(fileName)

  const videoUrl = publicData.publicUrl

  // 🔹 Save in database table: videos
  const { error: dbError } = await supabase
    .from("videos")
    .insert({
      title: title,
      video_url: videoUrl   // ✅ column name
    })

  if (dbError) {
    status.innerText = "Database error: " + dbError.message
    return
  }

  status.innerText = "Upload successful ✅"
  titleInput.value = ""
  fileInput.value = ""
}