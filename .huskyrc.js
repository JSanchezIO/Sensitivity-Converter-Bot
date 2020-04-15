module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'npm run validate',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook',
  },
};
