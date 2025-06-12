module.exports = {
  scenarios: [
    {
      id: "amazon",
      type: "email",
      subject: "Urgent: Verify your account now!",
      from: "security@amaz0n-billing.com",
      body: `
        Dear Valued Customer,

        We have detected unusual activity on your Amazon account. Your account will be suspended unless you verify your billing information within 24 hours.

        Click the link below immediately to avoid interruption:
        https://amaz0n.com.verify-billing.info/secure

        If you do not verify your account, we will be forced to suspend your access to prevent unauthorized transactions.

        Thank you for your prompt attention to this matter.

        Amazon Security Team
      `,
      flags: [
        "amaz0n-billing.com",
        "amaz0n.com.verify-billing.info",
        "suspended unless you verify",
        "unusual activity",
        "within 24 hours",
        "forced to suspend"
      ],
      flagCategories: {
        "amaz0n-billing.com": "authority",
        "amaz0n.com.verify-billing.info": "authority",
        "suspended unless you verify": "threat",
        "unusual activity": "urgency",
        "within 24 hours": "urgency",
        "forced to suspend": "threat"
      },
      explanations: {
        "amaz0n-billing.com": "Legitimate Amazon emails come from amazon.com, not amaz0n-billing.com",
        "amaz0n.com.verify-billing.info": "The domain is suspicious and not affiliated with Amazon",
        "suspended unless you verify": "Creates a false sense of urgency and threat",
        "unusual activity": "Common phishing tactic to create panic",
        "within 24 hours": "Artificial time pressure to prevent careful consideration",
        "forced to suspend": "Threatening language to create fear"
      }
    },
    {
      id: "bank",
      type: "email",
      subject: "Important: Your account needs attention",
      from: "notifications@secure-banking.com",
      body: `
        Dear Account Holder,

        We recently upgraded our security systems and need to verify your account information.
        A recent transaction of $1,299.99 has been flagged for review.

        To prevent any disruption to your account access, please click here to verify your details:
        http://secure-banking-verify.com/account

        If you did not make this transaction, please contact us immediately.

        Best regards,
        Security Department
        Your Trusted Bank
      `,
      flags: [
        "secure-banking.com",
        "secure-banking-verify.com",
        "upgraded our security systems",
        "$1,299.99",
        "flagged for review",
        "prevent any disruption"
      ],
      flagCategories: {
        "secure-banking.com": "authority",
        "secure-banking-verify.com": "authority",
        "upgraded our security systems": "authority",
        "$1,299.99": "urgency",
        "flagged for review": "urgency",
        "prevent any disruption": "threat"
      },
      explanations: {
        "secure-banking.com": "Generic domain name, not a real bank domain",
        "secure-banking-verify.com": "Suspicious verification domain",
        "upgraded our security systems": "Common pretext for phishing attempts",
        "$1,299.99": "Specific amount to make the email seem legitimate",
        "flagged for review": "Creates urgency and concern",
        "prevent any disruption": "Threatening language to create fear"
      }
    },
    {
      id: "social",
      type: "message",
      platform: "WhatsApp",
      sender: "Mom",
      body: `
        Hi honey! I'm stuck at the airport and my card isn't working.
        Can you send me $500 through this link? I'll pay you back as soon as I get home.
        https://quick-transfer.com/airport-emergency

        Love you!
        Mom ❤️
      `,
      flags: [
        "quick-transfer.com",
        "stuck at the airport",
        "card isn't working",
        "send me $500",
        "pay you back"
      ],
      flagCategories: {
        "quick-transfer.com": "request",
        "stuck at the airport": "urgency",
        "card isn't working": "urgency",
        "send me $500": "request",
        "pay you back": "trust"
      },
      explanations: {
        "quick-transfer.com": "Suspicious transfer service",
        "stuck at the airport": "Common emotional manipulation tactic",
        "card isn't working": "Creates urgency and need for immediate action",
        "send me $500": "Direct request for money",
        "pay you back": "False promise to build trust"
      }
    },
    {
      id: "work",
      type: "email",
      subject: "New Company Policy - Immediate Action Required",
      from: "hr@company-updates.com",
      body: `
        Dear Employee,

        Due to recent security incidents, we are implementing new password policies.
        Please update your credentials immediately using the link below:

        http://company-password-reset.com/verify

        This is mandatory for all employees. Failure to comply may result in account suspension.

        Regards,
        IT Department
        Your Company Name
      `,
      flags: [
        "company-updates.com",
        "company-password-reset.com",
        "recent security incidents",
        "immediately",
        "mandatory",
        "failure to comply"
      ],
      flagCategories: {
        "company-updates.com": "authority",
        "company-password-reset.com": "authority",
        "recent security incidents": "urgency",
        "immediately": "urgency",
        "mandatory": "authority",
        "failure to comply": "threat"
      },
      explanations: {
        "company-updates.com": "Generic domain, not a company email",
        "company-password-reset.com": "Suspicious password reset domain",
        "recent security incidents": "Creates false urgency",
        "immediately": "Pressure tactic",
        "mandatory": "False authority",
        "failure to comply": "Threatening language"
      }
    }
  ]
};
