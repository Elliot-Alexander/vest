const fetch = require("node-fetch");
const { logger } = require("../../util");

const { TRAVIS_REPO_SLUG, GITHUB_TOKEN } = process.env;

async function postRelease({ tag, body, title }) {
  await fetch(`https://api.github.com/repos/${TRAVIS_REPO_SLUG}/releases`, {
    method: "POST",
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
    body: JSON.stringify({
      tag_name: tag,
      name: title.replace(/#/g, ""),
      body: body,
    }),
  });
}

async function release({ tag, release }) {
  logger.log(`💬 Creating github release: ${release.title}`);

  await postRelease({
    tag,
    body: release.body,
    title: release.title,
  });
}

module.exports = release;
