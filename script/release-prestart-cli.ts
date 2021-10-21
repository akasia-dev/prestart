// polyger title: [prestart] Release Distribution File
// Please fill out the command you want below.

import { $ as shell } from "zx";
import fs from "fs";

void (async () => {
  // * build & minify
  await shell`
cd ${process.cwd()}/module/prestart-cli;
git pull;
npm i;
npm run build;
npm run minify;`;

  // * copy to release
  await shell`
cd ${process.cwd()}/module/prestart-cli;
cp -r output/* ${process.cwd()}/release/prestart-dist;`;

  // * write header
  const originScriptPath = `${process.cwd()}/release/prestart-dist/prestart.js`;
  const originScript = fs.readFileSync(originScriptPath).toString();
  fs.writeFileSync(originScriptPath, `#!/usr/bin/env node\n${originScript}`);
})();
