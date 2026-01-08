const SUPABASE_URL = "PASTE_PROJECT_URL"
const SUPABASE_KEY = "PASTE_ANON_KEY"

const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

async function uploadVideo() {
  const file = document.getElementById("videoFile").files[0]
  const title = document.getElementById("title").value
  const status = document.getElementById("status")

  if (!file || !title) {
    status.innerText = "Title aur video dono chahiye"
    return
  }

  const fileName = Date.now() + "-" + file.name

  const { error } = await supabase
    .storage
    .from("videos")
    .upload(fileName, file)

  if (error) {
    status.innerText = "Upload failed"
    return
  }

  const { data } = supabase
    .storage
    .from("videos")
    .getPublicUrl(fileName)

  await supabase.from("videos").insert({
    title: title,
    video_url: data.publicUrl
  })

  status.innerText = "Upload successful ✅"
}