---
updatedAt: 2025-10-23T05:27:57.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# App and subscription life cycle

After monetization, most apps go through the same life cycle:

1. **App installation and trial:** An admin installs the app and starts a trial. You will specify a default plan tier to which each trial account temporarily has access. For example, you may want all trial users to have the Pro plan.

2. **Trial end:** The app will be disabled or revert to the free plan (if your app supports one) after the trial period.

3. **Payment:** An admin pays for the app annually or monthly. monday will handle the payment page, billing, currency conversions, tax, etc. Your app will see the updated subscription object with the correct plan\_id they purchased.

4. **Usage:** You should enable the relevant features based on the subscription information.

Each step of the life cycle can have different outcomes. Check out our <a href="https://dapulse-res.cloudinary.com/image/upload/v1660758929/Monetization_Diagram_1.jpg" target="_blank">diagram</a> to see the various stages that a user goes through.
