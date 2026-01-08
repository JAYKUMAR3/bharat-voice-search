const SUPABASE_URL = "PASTE_PROJECT_URL"
const SUPABASE_KEY = "PASTE_ANON_KEY"

const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

async function loadVideos() {
  const { data } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false })

  const list = document.getElementById("videoList")

  data.forEach(v => {
    list.innerHTML += `
      <h3>${v.title}</h3>
      <video src="${v.video_url}" controls width="300"></video>
      <hr>
    `
  })
}

loadVideos()