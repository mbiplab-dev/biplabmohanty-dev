import fs from "fs";
import path from "path";
import type { PortfolioData } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export function getPortfolioData(): PortfolioData {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function savePortfolioData(data: PortfolioData): void {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}
