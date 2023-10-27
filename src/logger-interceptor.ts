import { Logger } from "winston";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface LoggerInterceptorConfig {
  logger: Logger;
}

export const requestLogger =
  ({ logger }: LoggerInterceptorConfig) =>
  (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toUpperCase();
    const url = (config.baseURL || "") + (config.url || "");
    logger.debug("Request  %s %s", method, url);
    return config;
  };

export const responseLogger =
  ({ logger }: LoggerInterceptorConfig) =>
  (response: AxiosResponse) => {
    const method = response.config.method?.toUpperCase();
    const url = (response.config.baseURL || "") + (response.config.url || "");
    const statusCode = response.status;
    const statusText = response.statusText;
    logger.debug("Response %s %s %s %s", method, url, statusCode, statusText);
    return response;
  };

export const errorLogger =
  ({ logger }: LoggerInterceptorConfig) =>
  (error: any) => {
    const method = error.config?.method?.toUpperCase();
    const url = (error.config?.baseURL || "") + (error.config?.url || "");
    const statusCode = error.response?.status;
    const statusText = error.response?.statusText;
    logger.debug("Error    %s %s %s %s", method, url, statusCode, statusText);
    return Promise.reject(error);
  };
