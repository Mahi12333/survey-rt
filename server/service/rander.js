
import axios from "axios";

// Create axios instance with a base URL
const api = axios.create({
    baseURL: "http://localhost:4000/api/user/",
  });
  
  // Extract 'get' method from the axios instance
  const { get } = api;
  

const backhomePageRoute = (req, res) => {
    try {
      return res.render("index");
    } catch (error) {
        console.log("Error-index", error.message);
    }
}
const backloginPageRoute = (req, res) => {
    try {
      return res.render("pages/login/login");
    } catch (error) {
        console.log("Error-index", error.message);
    }
}



export { backhomePageRoute, backloginPageRoute };
