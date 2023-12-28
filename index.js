import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 
// Route to render the main page
app.get("/", async (req, res) => {
  
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("home.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
  
});

// Route to render the create page
app.get("/createNew", (req, res) => {
  res.render("write.ejs");
});


// Create a new post
app.post("/newPost", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    
    res.redirect("/");
    
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});
//to edit a post
app.get("/edit/:id",async(req,res)=>
{
  try{
  const response=await axios.get(`${API_URL}/posts/${req.params.id}`)
  res.render("edit.ejs",{
    
    post: response.data})
}
catch (error) {
  res.status(500).json({ message: "Error creating post" });}
});
app.post("/edit/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});



app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
