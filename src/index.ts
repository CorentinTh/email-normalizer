export {
  normalizeEmail,
};

export type DomainConfig = {
  removeDots: boolean;
  stripPlus: boolean;
  renameDomain?: string;
};

const domainsConfig: Record<string, DomainConfig> = {
  'gmail.com': {
    removeDots: true,
    stripPlus: true,
  },
  'googlemail.com': {
    removeDots: true,
    stripPlus: true,
    renameDomain: 'gmail.com',
  },
  'hotmail.com': {
    removeDots: false,
    stripPlus: true,
  },
  'live.com': {
    removeDots: true,
    stripPlus: true,
  },
  'outlook.com': {
    removeDots: false,
    stripPlus: true,
  },
};

function normalizeEmail({ email: rawEmail }: { email: string }) {
  if (!isValidEmail({ email: rawEmail })) {
    throw new Error('Invalid email');
  }

  const normalizedEmail = rawEmail.trim().toLowerCase();
  const [identifier, domain] = normalizedEmail.split('@');

  const domainConfig = domainsConfig[domain];

  if (!domainConfig) {
    return normalizedEmail;
  }

  const { removeDots, stripPlus, renameDomain } = domainConfig;

  const { normalizedIdentifier } = normalizeIdentifier({ identifier, removeDots, stripPlus });

  const normalizedDomain = renameDomain ?? domain;

  return `${normalizedIdentifier}@${normalizedDomain}`;
}

function normalizeIdentifier({ identifier, removeDots, stripPlus }: { identifier: string; removeDots: boolean; stripPlus: boolean }) {
  let normalizedIdentifier = identifier;

  if (removeDots) {
    normalizedIdentifier = normalizedIdentifier.replace(/\./g, '');
  }

  if (stripPlus) {
    normalizedIdentifier = normalizedIdentifier.split('+')[0];
  }

  return { normalizedIdentifier };
}

function isValidEmail({ email }: { email: string }) {
  if (typeof email !== 'string') {
    return false;
  }

  return email.trim().match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i) !== null;
}
