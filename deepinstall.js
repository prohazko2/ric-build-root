const fs = require("fs");
const path = require("path");

const { execSync } = require("child_process");

for (const name of fs.readdirSync("user_modules")) {
  const dir = path.resolve(__dirname, "user_modules", name);
  const file = path.resolve(dir, "package.json");
  if (!fs.existsSync(file)) {
    continue;
  }
  let cmd = `npm install ${dir} --no-save`;
  if (process.argv.includes("--prod")) {
    cmd += ` --only prod`;
  }

  console.log(cmd);
  execSync(cmd);
}
