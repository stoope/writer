const path = require("path");
const fs = require("fs");

module.exports = {
  packagerConfig: {
    icon: "./public/favicon",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "stoope",
          name: "writer",
        },
        prerelease: false,
        draft: false,
      },
    },
  ],
};
