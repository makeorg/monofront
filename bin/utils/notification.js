exports.getNotifierInstance = () => {
  const reset = '\x1b[0m';
  const bgWhite = '\x1b[47m';
  const bgBlack = '\x1b[40m';
  const reverseRed = `${bgWhite}\x1b[31m\x1b[7m%s${reset}`;
  const reverseGreen = `${bgBlack}\x1b[32m\x1b[7m%s${reset}`;
  const fgGreen = `\x1b[32m%s${reset}`;
  const fgCyan = `\x1b[36m%s${reset}`;
  const fgYellow = `\x1b[33m%s${reset}`;

  const messages = [];
  const config = { separator: ' - ', prefix: '' };
  const resetConfig = () => {
    messages.length = 0;
    config.separator = ' - ';
    config.prefix = '';
  };
  const fetchMessages = colors => {
    const pref =
      config.prefix === '' ? '' : fgCyan.replace(/%s/g, config.prefix);
    const template = messages.map(() => colors).join(config.separator);
    const values = messages.map(m => [m.title, m.content]).flat();
    resetConfig();

    return { template: `${pref}${template}`, values };
  };
  const notify = colors => {
    const data = fetchMessages(colors);
    console.log(`${data.template}`, ...data.values);
  };
  const singleton = {
    newLine: () => {
      console.log('');
      return singleton;
    },
    add: (title, content) => {
      messages.push({ title: title || '', content: content || '' });
      return singleton;
    },
    setSeparator: sep => {
      config.separator = sep;
      return singleton;
    },
    setPrefix: pre => {
      config.prefix = pre;
      return singleton;
    },
    notifyInfo: () => notify(`${fgGreen} ${fgCyan}`),
    notifyError: () => notify(`${fgCyan} ${reverseRed}`),
    notifyInfo2: () => notify(`${fgYellow} ${fgCyan}`),
    notifySuccess: () => notify(`${reverseGreen} ${reverseGreen}`),
  };

  return singleton;
};
