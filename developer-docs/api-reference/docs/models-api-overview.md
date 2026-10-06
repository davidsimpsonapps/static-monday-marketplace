---
updatedAt: 2026-09-06T08:33:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Models API

The monday.com Models API for OpenAI and Anthropic models, with fallbacks, spend tracking, and full OpenAI compatibility.

<HTMLBlock>{`
<style>
  .pag-gateway-viz, .pag-gateway-viz * { box-sizing: border-box; }
  .pag-gateway-viz {
    --pg-deep: #181b34;
    --pg-mid: #3d3dbf;
    --pg-accent: #6161ff;
    width: 100%;
    min-height: 400px;
    margin: 0 0 28px 0;
    padding: 0 28px;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    background: linear-gradient(145deg, var(--pg-deep) 0%, #252a55 38%, var(--pg-mid) 68%, var(--pg-accent) 100%);
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 8px 32px rgba(24, 27, 52, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  .pag-gateway-viz::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 42%);
    pointer-events: none;
    z-index: 1;
  }
  .pag-gateway-viz .pg-grid {
    position: absolute;
    inset: 0;
    opacity: 0.07;
    background-image: linear-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.45) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
    z-index: 0;
  }
  .pag-gateway-viz .pg-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(97, 97, 255, 0.22) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }
  .pag-gateway-viz .agent-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    z-index: 3;
    position: relative;
  }
  .pag-gateway-viz .chat-bubble {
    position: absolute;
    top: -64px;
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: rgba(35, 32, 72, 0.98);
    border: 1.5px solid rgba(200, 190, 255, 0.55);
    border-radius: 12px;
    padding: 8px 14px;
    white-space: nowrap;
    font-size: 12px;
    color: rgba(230, 225, 255, 0.96);
    z-index: 10;
    animation: pg-bubble 18s ease-in-out infinite;
  }
  .pag-gateway-viz .chat-bubble::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(200, 190, 255, 0.55);
  }
  .pag-gateway-viz .agent-box {
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(180, 170, 255, 0.45);
    border-radius: 16px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: pg-agent 18s ease-in-out infinite;
  }
  .pag-gateway-viz .node-label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.05em;
    text-align: center;
    margin-top: 2px;
  }
  .pag-gateway-viz .monday-card {
    background: rgba(22, 20, 48, 0.88);
    border: 1.5px solid rgba(180, 170, 255, 0.42);
    border-radius: 20px;
    padding: 26px 28px 24px;
    z-index: 3;
    min-width: 248px;
    animation: pg-monday 18s ease-in-out infinite;
  }
  .pag-gateway-viz .monday-logo-img {
    height: 34px;
    object-fit: contain;
    display: block;
    margin: 0 auto 18px;
  }
  .pag-gateway-viz .endpoints {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pag-gateway-viz .endpoint {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(180, 170, 255, 0.22);
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    text-align: center;
  }
  .pag-gateway-viz .endpoint:first-child {
    animation: pg-epchat 18s ease-in-out infinite;
  }
  .pag-gateway-viz .providers {
    display: flex;
    flex-direction: column;
    gap: 18px;
    z-index: 3;
  }
  .pag-gateway-viz .provider-box {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(180, 170, 255, 0.3);
    border-radius: 14px;
    padding: 12px 18px;
    min-width: 152px;
  }
  .pag-gateway-viz .provider-box.pg-p-claude {
    animation: pg-claude 18s ease-in-out infinite;
  }
  .pag-gateway-viz .provider-logo {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .pag-gateway-viz .provider-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .pag-gateway-viz .provider-name {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.92);
    font-weight: 500;
  }
  @keyframes pg-blink {
    0%, 88%, 100% { transform: scaleY(1); }
    94% { transform: scaleY(0.08); }
  }
  .pag-gateway-viz .pg-eye {
    animation: pg-blink 3.5s ease-in-out infinite;
    transform-origin: center;
  }
  .pag-gateway-viz .pg-eye2 {
    animation: pg-blink 3.5s ease-in-out infinite;
    animation-delay: 0.08s;
    transform-origin: center;
  }
  /* 18s loop: agent → monday → claude → monday → agent + bubble */
  @keyframes pg-agent {
    0%, 4% { border-color: rgba(180, 170, 255, 0.45); box-shadow: none; }
    6%, 14% { border-color: rgba(220, 210, 255, 0.95); box-shadow: 0 0 22px rgba(120, 110, 255, 0.55); }
    16%, 56% { border-color: rgba(180, 170, 255, 0.45); box-shadow: none; }
    58%, 72% { border-color: rgba(220, 210, 255, 0.95); box-shadow: 0 0 22px rgba(120, 110, 255, 0.55); }
    74%, 100% { border-color: rgba(180, 170, 255, 0.45); box-shadow: none; }
  }
  @keyframes pg-monday {
    0%, 14% { border-color: rgba(180, 170, 255, 0.42); box-shadow: none; }
    18%, 34% { border-color: rgba(220, 210, 255, 0.95); box-shadow: 0 0 26px rgba(120, 110, 255, 0.5); }
    38%, 46% { border-color: rgba(180, 170, 255, 0.42); box-shadow: none; }
    50%, 58% { border-color: rgba(220, 210, 255, 0.95); box-shadow: 0 0 26px rgba(120, 110, 255, 0.5); }
    62%, 100% { border-color: rgba(180, 170, 255, 0.42); box-shadow: none; }
  }
  @keyframes pg-epchat {
    0%, 14% { background: rgba(255, 255, 255, 0.06); border-color: rgba(180, 170, 255, 0.22); color: #fff; }
    18%, 34% { background: rgba(120, 100, 220, 0.4); border-color: rgba(220, 210, 255, 0.9); color: #fff; }
    38%, 46% { background: rgba(255, 255, 255, 0.06); border-color: rgba(180, 170, 255, 0.22); color: #fff; }
    50%, 58% { background: rgba(120, 100, 220, 0.4); border-color: rgba(220, 210, 255, 0.9); color: #fff; }
    62%, 100% { background: rgba(255, 255, 255, 0.06); border-color: rgba(180, 170, 255, 0.22); color: #fff; }
  }
  @keyframes pg-claude {
    0%, 34% { border-color: rgba(180, 170, 255, 0.3); box-shadow: none; }
    38%, 48% { border-color: rgba(220, 210, 255, 0.95); box-shadow: 0 0 20px rgba(120, 110, 255, 0.48); }
    52%, 100% { border-color: rgba(180, 170, 255, 0.3); box-shadow: none; }
  }
  @keyframes pg-bubble {
    0%, 56% { opacity: 0; transform: translateX(-50%) translateY(10px); }
    58%, 72% { opacity: 1; transform: translateX(-50%) translateY(0); }
    74%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
  }
  @media (max-width: 700px) {
    .pag-gateway-viz {
      flex-direction: column;
      justify-content: center;
      padding: 0 20px;
      min-height: auto;
    }
  }
</style>

<div class="pag-gateway-viz" aria-label="Models API request flow">
  <div class="pg-grid" aria-hidden="true"></div>
  <div class="pg-glow" aria-hidden="true"></div>

  <div class="agent-wrap">
    <div class="chat-bubble">Hello! How can I help?</div>
    <div class="agent-box">
      <svg width="88" height="88" viewBox="0 0 54 54" fill="none">
        <line x1="27" y1="5" x2="27" y2="12" stroke="rgba(200,190,255,.8)" stroke-width="2" stroke-linecap="round"/>
        <circle cx="27" cy="3.5" r="2.8" fill="rgba(200,190,255,.75)" stroke="rgba(200,190,255,.4)" stroke-width="1"/>
        <rect x="10" y="12" width="34" height="23" rx="7" fill="rgba(55,45,110,.92)" stroke="rgba(160,150,255,.55)" stroke-width="1.5"/>
        <rect class="pg-eye" x="16" y="19" width="8" height="8" rx="2.5" fill="rgba(210,200,255,.95)"/>
        <rect class="pg-eye2" x="30" y="19" width="8" height="8" rx="2.5" fill="rgba(210,200,255,.95)"/>
        <circle cx="20" cy="23" r="2" fill="#1a1833"/>
        <circle cx="34" cy="23" r="2" fill="#1a1833"/>
        <rect x="18" y="30" width="18" height="3" rx="1.5" fill="rgba(200,190,255,.5)"/>
        <rect x="23" y="35" width="8" height="5" rx="2" fill="rgba(55,45,110,.92)" stroke="rgba(160,150,255,.45)" stroke-width="1"/>
        <rect x="9" y="40" width="36" height="12" rx="6" fill="rgba(55,45,110,.92)" stroke="rgba(160,150,255,.55)" stroke-width="1.5"/>
        <circle cx="21" cy="46" r="2.2" fill="rgba(180,170,255,.5)"/>
        <circle cx="27" cy="46" r="2.2" fill="rgba(100,210,155,.5)"/>
        <circle cx="33" cy="46" r="2.2" fill="rgba(180,170,255,.5)"/>
      </svg>
    </div>
    <span class="node-label">Agent</span>
  </div>

  <div class="monday-card">
    <img class="monday-logo-img" src="https://monday.com/p/wp-content/uploads/2024/03/White-logo.png" alt="monday.com" />
    <div class="endpoints">
      <div class="endpoint">/chat</div>
      <div class="endpoint">/image</div>
      <div class="endpoint">/audio</div>
      <div class="endpoint">/embeddings</div>
    </div>
  </div>

  <div class="providers">
    <div class="provider-box">
      <div class="provider-logo" style="background:#10a37f">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.553 19.9a4.5 4.5 0 0 1-5.953-1.597zm-1.19-10.64a4.467 4.467 0 0 1 2.34-1.965V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.073 14.5A4.504 4.504 0 0 1 2.41 7.664zm16.597 3.855l-5.843-3.371 2.019-1.165a.076.076 0 0 1 .072 0l4.789 2.767a4.5 4.5 0 0 1-.696 8.124V12.35a.768.768 0 0 0-.341-.83zm2.01-3.026l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.474 8.97V6.64a.071.071 0 0 1 .028-.067l4.783-2.761a4.5 4.5 0 0 1 6.679 4.667zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V7.01a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 6.397a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.602 1.5v2.998l-2.602 1.5-2.602-1.5z"/></svg>
      </div>
      <span class="provider-name">ChatGPT</span>
    </div>
    <div class="provider-box pg-p-claude">
      <div class="provider-logo" style="background:#f0e4d4">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png" alt="Claude"/>
      </div>
      <span class="provider-name">Claude</span>
    </div>
  </div>
</div>
`}</HTMLBlock>

<HTMLBlock>{`
<style>
  .pag-gateway-cards {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    margin: 0 0 28px 0;
  }
  .pag-gateway-cards .pag-feature-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 559px) {
    .pag-gateway-cards .pag-feature-grid {
      grid-template-columns: 1fr;
    }
  }
  .pag-gateway-cards article.pag-gcard {
    margin: 0;
    padding: 22px 22px 20px;
    border-radius: 14px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 8px 28px rgba(24, 27, 52, 0.18);
    min-height: 5.75rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    background: linear-gradient(135deg, #181b34 0%, #3d3dbf 45%, #6161ff 72%, #7c7cff 100%);
  }
  .pag-gateway-cards article::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 45%);
    opacity: 0.9;
  }
  .pag-gateway-cards article:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(24, 27, 52, 0.24);
  }
  .pag-gateway-cards article > * {
    position: relative;
    z-index: 1;
  }
  .pag-gateway-cards h3 {
    margin: 0 0 12px 0;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.98;
  }
  .pag-gateway-cards p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    opacity: 0.9;
    font-weight: 400;
  }
</style>
<section class="pag-gateway-cards" aria-label="Models API capabilities">
  <div class="pag-feature-grid">
    <article class="pag-gcard">
      <h3>Spend tracking</h3>
      <p>Accurately charge users and agents for their usage.</p>
    </article>
    <article class="pag-gcard">
      <h3>Budget and rate limits</h3>
      <p>Set budgets on users and agents.</p>
    </article>
    <article class="pag-gcard">
      <h3>OpenAI format</h3>
      <p>Call all major LLM providers in the OpenAI format.</p>
    </article>
    <article class="pag-gcard">
      <h3>LLM fallbacks</h3>
      <p>Clients are not impacted even during an outage.</p>
    </article>
  </div>
</section>
`}</HTMLBlock>

# Why teams use the Models API

Platform teams adopt a single, unified API to **standardize access**, **observe spend**, and **avoid bespoke integrations** for every new model. The Models API brings that pattern to monday.com: your apps call familiar endpoints (`/chat/completions`, `/embeddings`, `/images/generations`, `/audio/speech`), while monday handles routing to upstream providers and reconciles usage against your workspace.

Another reason is **compliance, legal, and governance**. Instead of creating new business relationships, security reviews, and procurement cycles with each LLM vendor, you access models through **your existing monday subscription** and the vendor relationship your company has already approved with monday.com (IT, legal, procurement, and security). You get broad model coverage without multiplying third party agreements and onboarding steps.

# Pricing and metering

**The Models API itself has no separate subscription fee**. Usage draws down **monday AI tokens**, which are intended to approximate the cost of the underlying model to the best of our ability. Because underlying model costs can change over time, token consumption may vary and may reflect a small additional cost depending on the model used.

# Simpler alternative: `run_prompt` (GraphQL)

If you only need **single-turn text completions**, the [`run_prompt`](https://developer.monday.com/api-reference/reference/ai#run-a-prompt) mutation is a simplified, GraphQL-native entry point to the same AI gateway. You send a prompt and get the generated text back in the same GraphQL request as the rest of your integration — no separate base URL or OpenAI-compatible client required.

Because it wraps the same gateway, the same access requirements and **monday AI token** consumption apply. For multi-turn conversations, streaming, tools / function calling, embeddings, images, or audio, use the Models API instead. The mutation is available in API versions `2026-10` and later — see the [AI reference](https://developer.monday.com/api-reference/reference/ai).

# See also

<Cards>
  <Card title="Getting started with the Models API" href="https://developer.monday.com/api-reference/docs/getting-started-with-the-models-api">
    API token, base URL, capabilities, aliases, and first request.
  </Card>

  <Card title="Models API supported models" href="https://developer.monday.com/api-reference/docs/models-api-supported-models">
    Model IDs, monday aliases, and defaults.
  </Card>

  <Card title="run_prompt (GraphQL)" href="https://developer.monday.com/api-reference/reference/ai">
    A simplified, GraphQL-native way to run single-turn chat completions.
  </Card>
</Cards>
