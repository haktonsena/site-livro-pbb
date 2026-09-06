import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const routes = ["artigos/como-instalar-o-minetest"];
const distRoot = "dist";
const source = join(distRoot, "index.html");

for (const route of routes) {
  const target = join(distRoot, route, "index.html");

  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}
