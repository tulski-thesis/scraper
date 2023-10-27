import axios from "axios";
import { getLogger } from "./logger";
import {
  errorLogger,
  requestLogger,
  responseLogger,
} from "./logger-interceptor";

(async () => {
  const logger = getLogger("main");

  logger.info("Hello World!");

  const http = axios.create({
    baseURL: "https://ifconfig.co",
  });

  http.interceptors.request.use(requestLogger({ logger }));
  http.interceptors.response.use(
    responseLogger({ logger }),
    errorLogger({ logger }),
  );

  await http.get("/json");

  try {
    await http.get("/not-found");
  } catch (error) {
    // nothing to do
  }
})();
