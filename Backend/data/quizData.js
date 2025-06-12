module.exports = {
  phishing: [
    {
      id: 1,
      question: "What is the primary goal of a phishing attack?",
      options: [
        "To sell products",
        "To gain unauthorized access to sensitive information",
        "To promote a brand",
        "To provide customer support"
      ],
      answer: 1
    },
    {
      id: 2,
      question: "Which of the following is a common sign of a phishing email?",
      options: [
        "Proper grammar and personalized message",
        "Email from a known contact with accurate address",
        "Urgency and suspicious links",
        "Company logo and contact details"
      ],
      answer: 2
    },
    {
      id: 3,
      question: "Which protocol secures communication in HTTPS?",
      options: ["TLS", "FTP", "SSH", "SFTP"],
      answer: 0
    },
    {
      id: 4,
      question: "Spoofed emails are likely to fool you when:",
      options: [
        "They have emojis",
        "The email client hides the real sender address",
        "They’re in plaintext",
        "They contain PDF attachments"
      ],
      answer: 1
    },
    {
      id: 5,
      question: "'Click here urgently to avoid suspension!' is an example of:",
      options: ["Politeness", "Social proof", "Urgency", "Trust"],
      answer: 2
    }
  ],

  passwordSecurity: [
    {
      id: 1,
      question: "Which password is strongest?",
      options: [
        "P@ssw0rd!",
        "12345678",
        "7HtXTYuuveteR!if",
        "July2024!"
      ],
      answer: 2
    },
    {
      id: 2,
      question: "What is the purpose of 2FA (Two-Factor Authentication)?",
      options: [
        "Make logging in easier",
        "Provide a backup email",
        "Add another layer of security",
        "Disable the need for passwords"
      ],
      answer: 2
    },
    {
      id: 3,
      question: "What does salting a password mean?",
      options: [
        "Encrypting it twice",
        "Hashing with added random data",
        "Typing it in a special format",
        "Saving it in a cookie"
      ],
      answer: 1
    },
    {
      id: 4,
      question: "Which tool helps you create and store secure passwords?",
      options: [
        "Notepad",
        "Clipboard",
        "Password Manager",
        "Browser History"
      ],
      answer: 2
    },
    {
      id: 5,
      question: "Why is 'qwerty123' a poor password?",
      options: [
        "Too short",
        "Too random",
        "Easy to guess and common",
        "Not encrypted"
      ],
      answer: 2
    }
  ],

  socialEngineering: [
    {
      id: 1,
      question: "What is social engineering?",
      options: [
        "A type of malware",
        "Tricking people to reveal confidential info",
        "A secure coding practice",
        "An IT networking strategy"
      ],
      answer: 1
    },
    {
      id: 2,
      question: "Which is a classic example of social engineering?",
      options: [
        "SQL injection",
        "Phishing email",
        "Firewall configuration",
        "Antivirus scan"
      ],
      answer: 1
    },
    {
      id: 3,
      question: "Pretexting involves:",
      options: [
        "Installing a keylogger",
        "Impersonating someone to gain information",
        "Encrypting sensitive files",
        "Scanning for open ports"
      ],
      answer: 1
    },
    {
      id: 4,
      question: "Tailgating in InfoSec refers to:",
      options: [
        "Following someone into a secure area without authorization",
        "Using someone’s computer",
        "Attaching a USB drive",
        "Installing a tracking app"
      ],
      answer: 0
    },
    {
      id: 5,
      question: "A suspicious call pretending to be tech support is an example of:",
      options: ["Shoulder surfing", "Spoofing", "Vishing", "Smishing"],
      answer: 2
    }
  ],

  malware: [
    {
      id: 1,
      question: "What does malware stand for?",
      options: [
        "Machine Learning Software",
        "Malicious Software",
        "Management Software",
        "Mandatory Warning Alert"
      ],
      answer: 1
    },
    {
      id: 2,
      question: "Ransomware typically:",
      options: [
        "Speeds up your PC",
        "Encrypts files and demands payment",
        "Improves internet speed",
        "Blocks pop-ups"
      ],
      answer: 1
    },
    {
      id: 3,
      question: "A Trojan horse is a program that:",
      options: [
        "Spreads via Bluetooth",
        "Disguises itself as legitimate software",
        "Physically damages your device",
        "Only targets mobile phones"
      ],
      answer: 1
    },
    {
      id: 4,
      question: "Spyware does what?",
      options: [
        "Encrypts your email",
        "Monitors and steals user information",
        "Displays legal warnings",
        "Slows down downloads"
      ],
      answer: 1
    },
    {
      id: 5,
      question: "Which of these is NOT a type of malware?",
      options: ["Worm", "Antivirus", "Keylogger", "Rootkit"],
      answer: 1
    }
  ],

  secureBrowsing: [
    {
      id: 1,
      question: "What does a padlock icon in the browser address bar indicate?",
      options: [
        "A firewall is active",
        "Site uses HTTPS and is secure",
        "Browser is updated",
        "Cookies are disabled"
      ],
      answer: 1
    },
    {
      id: 2,
      question: "Which is a sign of a suspicious website?",
      options: [
        "Secure HTTPS connection",
        "Frequent pop-ups and misspellings",
        "Verified domain name",
        "Privacy policy"
      ],
      answer: 1
    },
    {
      id: 3,
      question: "Why should you avoid public Wi-Fi for sensitive tasks?",
      options: [
        "Too fast connection",
        "Higher risk of interception",
        "Slow loading times",
        "Limited data usage"
      ],
      answer: 1
    },
    {
      id: 4,
      question: "A browser extension should be installed only if:",
      options: [
        "It has bright colors",
        "It has many downloads from a trusted source",
        "It is promoted in an ad",
        "It’s free"
      ],
      answer: 1
    },
    {
      id: 5,
      question: "Private (Incognito) mode prevents:",
      options: [
        "ISP tracking",
        "Website data collection",
        "Browser from storing local history",
        "Hackers from accessing your account"
      ],
      answer: 2
    }
  ]
};
