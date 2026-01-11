import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";

export function loadEnv() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const cwd = process.cwd();

  const files = [
    `.env.${nodeEnv}.local`,
    nodeEnv === "test" ? null : `.env.local`,
    `.env.${nodeEnv}`,
    `.env`,
  ].filter((file): file is string => !!file);

  console.log("loadEnv - Looking for files:", files);

  for (const file of files) {
    const filePath = resolve(cwd, file);
    const exists = existsSync(filePath);

    console.log(`Checking ${filePath}... ${exists ? "EXISTS" : "NOT FOUND"}`);

    if (exists) {
      try {
        const content = readFileSync(filePath, "utf-8");
        const envVars: Record<string, string> = {};

        content.split("\n").forEach((line) => {
          const trimmed = line.trim();
          // Skip empty lines and comments
          if (!trimmed || trimmed.startsWith("#")) return;

          const indexOfEqual = trimmed.indexOf("=");
          if (indexOfEqual > 0) {
            const key = trimmed.slice(0, indexOfEqual).trim();
            const value = trimmed.slice(indexOfEqual + 1).trim();
            envVars[key] = value;
          }
        });

        console.log(`✓ Successfully loaded: ${file}`);
        return envVars;
      } catch (error: unknown) {
        console.log(`✗ Failed to load ${file}:`, error);
      }
    }
  }

  return {};
}
