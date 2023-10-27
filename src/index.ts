import axios from "axios";

(async () => {
  const { data } = await axios.get("https://ifconfig.co/json");
  console.log("Hello World!");
  console.log("IP Address:", data.ip);
})();
