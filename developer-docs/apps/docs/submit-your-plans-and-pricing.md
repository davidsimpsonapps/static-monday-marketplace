---
updatedAt: 2026-01-30T21:49:13.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Submit your plans and pricing

monday.com apps utilize [pricing versioning](https://developer.monday.com/apps/docs/marketplace-pricing) to maintain marketplace pricing throughout your app's lifecycle. With each pricing version, your app’s plans and costs are stored so you can track changes over time.

This process lets you submit requests to set or update your app’s pricing. If you're submitting your app to the marketplace for the first time, you'll use the same flow to set up your initial plans and pricing.

# Submit a pricing version

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Select the app you want to create a new pricing version for.
3. Click on the **Pricing & Plans** tab.

<Image align="center" border={true} width="500px" src="https://files.readme.io/d046eb68ccde60ae5bd38ac63c5c13d0f34a98a86d5f82d89d0df2969a32f030-image.png" className="border" />

4. Click **Create Pricing Version**.
5. Select **Standard** ([feature-based](https://developer.monday.com/apps/docs/plans-and-pricing#feature-based)) or **Seat-based** ([seat-based](https://developer.monday.com/apps/docs/plans-and-pricing#account-seat-based)).

<Image align="center" border={true} width="500px" src="https://files.readme.io/dfa66b5f7542c9a6c9d88963fee5620455543219a21ab4357cc01750cc0393c9-image.png" className="border" />

6. Complete the required fields based on the selected pricing model.
7. Click **Submit to review**.

## Required fields by pricing model

### Standard (feature-based)

For standard (feature-based) pricing, provide the following details:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>

      <th>
        Requirements
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Plan Name
      </td>

      <td>
        The plan name that users will see in the marketplace
      </td>

      <td>
        • 1-255 characters
      </td>
    </tr>

    <tr>
      <td>
        ID
      </td>

      <td>
        A string that will be sent to your backend as the plan_id
      </td>

      <td>
        • 1-255 characters  
        • Only letters, digits, dashes, or underscores  
        • First character must be a letter or digit  
        • Case sensitivity must be consistent across different pricing versions
      </td>
    </tr>

    <tr>
      <td>
        Description
      </td>

      <td>
        A short plan description that will be shown in the marketplace
      </td>

      <td>
        • 1-255 characters
      </td>
    </tr>

    <tr>
      <td>
        Includes
      </td>

      <td>
        Short bullet points to describe what features each plan includes
      </td>

      <td>
        • 1-5 bullet points per feature  
        • 1-255 characters per bullet point
      </td>
    </tr>

    <tr>
      <td>
        Monthly price
      </td>

      <td>
        The tier's monthly price
      </td>

      <td>
        • Must be a non-negative integer  
        • In USD
      </td>
    </tr>

    <tr>
      <td>
        Yearly price
      </td>

      <td>
        The tier's yearly price, divided by 12
      </td>

      <td>
        • Must be a non-negative integer  
        • In USD
      </td>
    </tr>
  </tbody>
</Table>

<div style={{ backgroundColor: "#f1f9f5", borderLeft: "4px solid #08844c", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#08844c" }}>
  👍 <strong>Yearly pricing</strong><br /><br />
  Users will see both monthly and yearly pricing options in the marketplace. The yearly plan is shown as a monthly equivalent by dividing the total annual price by 12, making it easier to compare value at a glance.<br /><br />
  <strong>Example:</strong><br />
  If your app costs $10/month or $72/year, the pricing will display as:

  <ul style={{ margin: "12px 0 0 20px" }}>
    <li>Monthly: $10/month</li>
    <li>Yearly: $6/month (billed annually at $72)</li>
  </ul>
</div>

### Seat-based

For seat-based pricing, provide the following details:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>

      <th>
        Requirements
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Price per seat (monthly)
      </td>

      <td>
        The monthly price per seat
      </td>

      <td>
        • Must be a non-negative integer  
        • In USD
      </td>
    </tr>

    <tr>
      <td>
        Plan description
      </td>

      <td>
        A short plan description that will be shown in the marketplace
      </td>

      <td>
        • 1-255 characters
      </td>
    </tr>

    <tr>
      <td>
        Plan includes
      </td>

      <td>
        Short bullet points to describe what features each plan includes
      </td>

      <td>
        • 1-5 bullet points  
        • 1-255 characters per bullet point
      </td>
    </tr>

    <tr>
      <td>
        Mode
      </td>

      <td>
        • **Optimized:** Discounts are auto-applied per bucket based on monday.com’s internal policies  
        • **No Discount:** All seats are billed at full price  
        • **Manual:** Set your own discounts per bucket, mark buckets as free, and define minimum seat requirements
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# What happens next

Once submitted, your pricing version will be reviewed by the monday.com team within **72 business hours**.

* **For existing apps updating their prices:** After approval, the pricing version automatically becomes active, and your updated plans appear in the marketplace.

* **For new apps submitting their initial plans and pricing:** Your pricing version is reviewed as part of the broader marketplace approval process. Your app will only be approved and published after all [marketplace](https://developer.monday.com/apps/docs/submit-your-app) and [monetization](https://developer.monday.com/apps/docs/implementing-monetization) requirements are completed.
