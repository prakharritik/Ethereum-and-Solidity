const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    // Each Solidity source file to be compiled must be specified by defining either
    // a URL to the file or the literal file content.
    // See https://docs.soliditylang.org/en/v0.8.5/using-the-compiler.html#input-description
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Campaign.sol"
];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Extract and write the JSON representations of the contracts to the build folder.
for (let contract in output) {
  console.log(contract);
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  );
}
