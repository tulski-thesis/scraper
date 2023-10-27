import { format, Logger, transports, createLogger } from "winston";

export const getLogger = (context?: string): Logger => {
  return createLogger({
    level: "silly",
    transports: [new transports.Console()],
    format: format.combine(
      format.label({ label: context }),
      format.splat(),
      format.timestamp(),
      format.colorize(),
      format.errors({ stack: true }),
      format.printf(({ level, message, stack, label, timestamp }) => {
        const representativeLabel = label.padEnd(10).slice(-10);
        const representativeLevel = level.padEnd(15);
        return `${timestamp} [${representativeLabel}] ${representativeLevel}: ${message} ${
          stack ? `\n${stack}` : ""
        }`;
      }),
    ),
  });
};
