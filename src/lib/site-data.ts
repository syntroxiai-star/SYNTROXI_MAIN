import type { LucideIcon } from "lucide-react";
import {
  Headset,
  LineChart,
  Megaphone,
  Receipt,
  ShoppingBag,
  UserRoundSearch,
  Scale,
  Stethoscope,
  Building2,
  Factory,
  GraduationCap,
  Plane,
  Users,
  Building,
  Landmark,
  UserRound,
  Package,
  Globe,
  Smartphone,
  LayoutGrid,
  ArrowRight,
  Star,
} from "lucide-react";

export type Employee = {
  slug: string;
  name: string;
  role: string;
  category: string;
  summary: string;
  icon: LucideIcon;
  price: number;
  metrics: { label: string; value: string }[];
  capabilities: string[];
  integrations: string[];
  workflow: { title: string; detail: string }[];
};

export const employees: Employee[] = [
  {
    slug: "aria-support",
    name: "Aria",
    role: "Customer Support Lead",
    category: "Support",
    summary:
      "Resolves tier-1 and tier-2 tickets across email, chat and WhatsApp with full context from your CRM.",
    icon: Headset,
    price: 490,
    metrics: [
      { label: "Tickets / month", value: "12,000" },
      { label: "First response", value: "8 sec" },
      { label: "Deflection", value: "74%" },
    ],
    capabilities: [
      "Omnichannel ticket triage and resolution",
      "Refunds, cancellations and order edits",
      "Escalation summaries for human agents",
      "Sentiment-aware tone matching",
    ],
    integrations: ["Zendesk", "Intercom", "Shopify", "Slack", "HubSpot"],
    workflow: [
      { title: "Listen", detail: "Watches every inbox, chat and channel in real time." },
      { title: "Understand", detail: "Pulls order, billing and account context before replying." },
      { title: "Resolve", detail: "Acts inside your tools — refunds, updates, follow-ups." },
      { title: "Report", detail: "Logs outcomes and flags themes for your team." },
    ],
  },
  {
    slug: "vero-sdr",
    name: "Vero",
    role: "Sales Development Rep",
    category: "Revenue",
    summary:
      "Researches accounts, writes personalised sequences and books qualified meetings on your calendar.",
    icon: UserRoundSearch,
    price: 690,
    metrics: [
      { label: "Accounts / week", value: "1,400" },
      { label: "Reply rate", value: "11.2%" },
      { label: "Meetings / month", value: "62" },
    ],
    capabilities: [
      "ICP research and account scoring",
      "Multi-touch email and LinkedIn sequences",
      "Live objection handling in replies",
      "Calendar booking and CRM hygiene",
    ],
    integrations: ["Salesforce", "HubSpot", "Apollo", "Gmail", "Calendly"],
    workflow: [
      { title: "Source", detail: "Builds target lists from your ICP signals." },
      { title: "Personalise", detail: "Writes messaging grounded in real account research." },
      { title: "Engage", detail: "Runs sequences and handles replies conversationally." },
      { title: "Handoff", detail: "Books the meeting and briefs your AE." },
    ],
  },
  {
    slug: "nova-marketing",
    name: "Nova",
    role: "Content & Campaign Marketer",
    category: "Marketing",
    summary:
      "Plans, produces and ships campaigns across web, email and social while staying on brand.",
    icon: Megaphone,
    price: 590,
    metrics: [
      { label: "Assets / month", value: "180" },
      { label: "Brand accuracy", value: "98%" },
      { label: "Cycle time", value: "−63%" },
    ],
    capabilities: [
      "Campaign briefs and editorial calendars",
      "Long-form and social copy in brand voice",
      "SEO clustering and internal linking",
      "Performance reporting and iteration",
    ],
    integrations: ["Webflow", "Notion", "Klaviyo", "LinkedIn", "GA4"],
    workflow: [
      { title: "Plan", detail: "Turns goals into a dated campaign calendar." },
      { title: "Create", detail: "Drafts every asset against your brand system." },
      { title: "Ship", detail: "Publishes and schedules across channels." },
      { title: "Learn", detail: "Reads performance and rewrites what underperforms." },
    ],
  },
  {
    slug: "atlas-finance",
    name: "Atlas",
    role: "Finance Operations Analyst",
    category: "Finance",
    summary:
      "Handles invoicing, reconciliation, collections and month-end close with an audit trail on every action.",
    icon: Receipt,
    price: 790,
    metrics: [
      { label: "Invoices / month", value: "9,500" },
      { label: "Match accuracy", value: "99.6%" },
      { label: "Close time", value: "3 days" },
    ],
    capabilities: [
      "Invoice capture, coding and approval routing",
      "Bank and ledger reconciliation",
      "Dunning and collections outreach",
      "Month-end close checklists",
    ],
    integrations: ["NetSuite", "QuickBooks", "Stripe", "Razorpay", "Xero"],
    workflow: [
      { title: "Capture", detail: "Reads every invoice and receipt as it arrives." },
      { title: "Reconcile", detail: "Matches lines against ledger and bank feeds." },
      { title: "Chase", detail: "Runs polite, persistent collections sequences." },
      { title: "Close", detail: "Delivers a reviewed close pack to finance." },
    ],
  },
  {
    slug: "orion-ops",
    name: "Orion",
    role: "Operations Coordinator",
    category: "Operations",
    summary:
      "Keeps orders, inventory and vendors moving by watching every system and acting before things break.",
    icon: ShoppingBag,
    price: 640,
    metrics: [
      { label: "Orders / day", value: "6,200" },
      { label: "Stockout risk", value: "−48%" },
      { label: "Manual touches", value: "−81%" },
    ],
    capabilities: [
      "Order exception handling",
      "Inventory and reorder forecasting",
      "Vendor follow-up and SLA tracking",
      "Daily operating briefings",
    ],
    integrations: ["Shopify", "SAP", "Airtable", "Slack", "Twilio"],
    workflow: [
      { title: "Monitor", detail: "Tracks every order and stock signal continuously." },
      { title: "Predict", detail: "Flags risk before it becomes a delay." },
      { title: "Act", detail: "Reroutes, reorders and notifies the right owner." },
      { title: "Brief", detail: "Publishes a morning operating summary." },
    ],
  },
  {
    slug: "sage-analyst",
    name: "Sage",
    role: "Business Intelligence Analyst",
    category: "Data",
    summary:
      "Answers business questions in plain language, builds dashboards and explains why the numbers moved.",
    icon: LineChart,
    price: 720,
    metrics: [
      { label: "Queries / week", value: "3,800" },
      { label: "Time to insight", value: "40 sec" },
      { label: "Analyst hours saved", value: "120/mo" },
    ],
    capabilities: [
      "Natural-language querying across sources",
      "Dashboard and report generation",
      "Anomaly detection with root-cause notes",
      "Board-ready narrative summaries",
    ],
    integrations: ["Snowflake", "BigQuery", "Postgres", "Looker", "Sheets"],
    workflow: [
      { title: "Connect", detail: "Maps your warehouse and business definitions." },
      { title: "Answer", detail: "Responds to questions with verified SQL." },
      { title: "Explain", detail: "Attributes movement to real drivers." },
      { title: "Alert", detail: "Warns owners the moment a metric breaks trend." },
    ],
  },
];

export const systems = [
  {
    title: "Unified data layer",
    detail:
      "Every AI Employee reads from one governed context graph built on your CRM, ERP, warehouse and docs.",
  },
  {
    title: "Action framework",
    detail:
      "Employees don't just answer — they write back to your systems with permissions and approvals.",
  },
  {
    title: "Human handoff",
    detail:
      "Confidence thresholds route edge cases to the right person with a full brief attached.",
  },
  {
    title: "Audit and control",
    detail:
      "Every decision is logged, replayable and attributable. Designed for secure, auditable operations.",
  },
];

export const industries = [
  {
    name: "Financial Services",
    icon: Scale,
    detail:
      "Onboarding, KYC review, reconciliation and client reporting under strict audit trails.",
    employees: ["Atlas", "Sage", "Aria"],
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    detail: "Intake, prior authorisation follow-up, scheduling and claims-status chasing.",
    employees: ["Aria", "Orion", "Atlas"],
  },
  {
    name: "SaaS & Technology",
    icon: Building2,
    detail: "Pipeline generation, onboarding support, usage analytics and lifecycle marketing.",
    employees: ["Vero", "Nova", "Sage"],
  },
  {
    name: "Manufacturing",
    icon: Factory,
    detail: "Supplier follow-up, quality reporting, order exceptions and demand forecasting.",
    employees: ["Orion", "Sage", "Atlas"],
  },
  {
    name: "Education",
    icon: GraduationCap,
    detail: "Admissions support, enrolment nurture, student help desks and reporting.",
    employees: ["Aria", "Nova", "Sage"],
  },
  {
    name: "Travel & Hospitality",
    icon: Plane,
    detail: "Booking changes, disruption handling, review response and revenue reporting.",
    employees: ["Aria", "Orion", "Nova"],
  },
];

export const plans = [
  {
    name: "Launch",
    price: 1490,
    annual: 14900,
    tagline: "One AI Employee, deployed properly.",
    features: [
      "1 AI Employee",
      "3 system integrations",
      "Shared context graph",
      "Email + chat support",
      "Monthly performance review",
    ],
  },
  {
    name: "Scale",
    price: 4890,
    annual: 48900,
    tagline: "A connected team across functions.",
    highlighted: true,
    features: [
      "Up to 5 AI Employees",
      "Unlimited integrations",
      "Workforce Builder access",
      "Custom workflows & approvals",
      "Dedicated solutions architect",
      "SLA-backed uptime",
    ],
  },
  {
    name: "Enterprise",
    price: null,
    annual: null,
    tagline: "Your entire operating system, staffed.",
    features: [
      "Unlimited AI Employees",
      "Private deployment options",
      "SSO, SCIM and audit exports",
      "Custom model routing",
      "Quarterly business reviews",
      "24/7 response readiness",
    ],
  },
];

export const caseStudies = [
  {
    slug: "northwind",
    company: "Northwind Logistics",
    industry: "Logistics",
    headline: "Cut order exception handling from 14 hours to 40 minutes a day",
    metrics: [
      { label: "Manual touches", value: "−81%" },
      { label: "On-time delivery", value: "+12pts" },
      { label: "Payback", value: "7 weeks" },
    ],
    quote:
      "We replaced a queue nobody wanted to own. Orion works the exceptions before our team logs in.",
    person: "Priya Raman, VP Operations",
  },
  {
    slug: "helio",
    company: "Helio Health",
    industry: "Healthcare",
    headline: "Answered 74% of patient enquiries without a human touch",
    metrics: [
      { label: "First response", value: "8 sec" },
      { label: "CSAT", value: "4.8 / 5" },
      { label: "Cost per contact", value: "−66%" },
    ],
    quote: "Patients cannot tell the difference. Our coordinators finally have their day back.",
    person: "Daniel Okafor, Head of Patient Experience",
  },
  {
    slug: "meridian",
    company: "Meridian Capital",
    industry: "Financial Services",
    headline: "Closed the books in three days with a complete audit trail",
    metrics: [
      { label: "Close time", value: "−9 days" },
      { label: "Match accuracy", value: "99.6%" },
      { label: "Analyst hours", value: "+480/qtr" },
    ],
    quote: "Atlas gave our controllers a reviewer, not another tool to maintain.",
    person: "Sofia Lindqvist, Controller",
  },
];

export const posts = [
  {
    slug: "ai-employees-vs-agents",
    title: "AI Employees vs. agents: why the difference decides your ROI",
    category: "Perspective",
    read: "6 min",
    date: "July 2026",
    excerpt:
      "Agents answer questions. Employees own outcomes. The gap between them is context, permissions and accountability.",
  },
  {
    slug: "connected-systems-blueprint",
    title: "The Connected Systems blueprint we deploy in week one",
    category: "Playbook",
    read: "9 min",
    date: "June 2026",
    excerpt:
      "How we map a context graph across CRM, ERP and warehouse before a single workflow goes live.",
  },
  {
    slug: "measuring-digital-labour",
    title: "How to measure digital labour like a real headcount plan",
    category: "Operations",
    read: "7 min",
    date: "June 2026",
    excerpt:
      "Cost per resolved outcome, coverage hours and escalation ratio — the three metrics that matter.",
  },
  {
    slug: "governance-that-scales",
    title: "Governance that scales with an autonomous workforce",
    category: "Security",
    read: "8 min",
    date: "May 2026",
    excerpt:
      "Approval tiers, replayable decisions and least-privilege actions across every connected system.",
  },
];

export const testimonials = [
  {
    quote:
      "SYNTROXI feels less like software and more like hiring a team that already knows our systems.",
    name: "Priya Raman",
    role: "VP Operations, Northwind Logistics",
  },
  {
    quote: "The context graph is the product. Everything else follows from it being correct.",
    name: "Marcus Feld",
    role: "CTO, Helio Health",
  },
  {
    quote: "We went from three pilots to a staffed function in one quarter.",
    name: "Sofia Lindqvist",
    role: "Controller, Meridian Capital",
  },
];

export const logos = [
  "Northwind",
  "Helio",
  "Meridian",
  "Aveon",
  "Lumenly",
  "Katsuo",
  "Orbital",
  "Verdant",
];

// ---------------------------------------------------------------------------
// Connected systems hub (orbital node map)
// ---------------------------------------------------------------------------

export type SystemNode = {
  label: string;
  icon: LucideIcon;
  detail: string;
};

export const systemNodes: SystemNode[] = [
  { label: "CRM", icon: Users, detail: "Accounts, pipeline and every customer touch." },
  { label: "ERP", icon: Building, detail: "Orders, procurement and financial master data." },
  { label: "Finance", icon: Landmark, detail: "Ledger, invoicing, payouts and reconciliation." },
  { label: "HR", icon: UserRound, detail: "People records, onboarding and approvals." },
  { label: "Inventory", icon: Package, detail: "Stock levels, movements and fulfilment." },
  { label: "Website", icon: Globe, detail: "Sessions, forms and product analytics." },
  { label: "Mobile App", icon: Smartphone, detail: "In-app events, sessions and support." },
  { label: "Dashboard", icon: LayoutGrid, detail: "Live reporting across every function." },
];

// ---------------------------------------------------------------------------
// Lead → closed deal journey
// ---------------------------------------------------------------------------

export type JourneyStep = {
  label: string;
  icon: LucideIcon;
  kind: "signal" | "employee" | "system" | "outcome";
  detail: string;
};

export const journeySteps: JourneyStep[] = [
  { label: "Lead", icon: ArrowRight, kind: "signal", detail: "A demo request lands at 02:14." },
  {
    label: "Sales AI",
    icon: UserRoundSearch,
    kind: "employee",
    detail: "Vero researches the account and replies in 40 seconds.",
  },
  { label: "CRM", icon: Users, kind: "system", detail: "Record created, scored and routed." },
  {
    label: "Finance AI",
    icon: Receipt,
    kind: "employee",
    detail: "Atlas builds the quote and checks credit terms.",
  },
  {
    label: "Operations AI",
    icon: ShoppingBag,
    kind: "employee",
    detail: "Orion confirms stock, lead time and delivery slot.",
  },
  {
    label: "Customer",
    icon: Star,
    kind: "outcome",
    detail: "Deal closed and onboarding scheduled — no human relay.",
  },
];

// ---------------------------------------------------------------------------
// Team builder wizard
// ---------------------------------------------------------------------------

export const companySizes = [
  { id: "startup", name: "Startup", detail: "1-10 employees", multiplier: 1 },
  { id: "small", name: "Small Business", detail: "11-50 employees", multiplier: 1.4 },
  { id: "mid", name: "Mid-Market", detail: "51-200 employees", multiplier: 2.1 },
  { id: "enterprise", name: "Enterprise", detail: "201+ employees", multiplier: 3.2 },
];

export const departments = [
  { id: "Support", name: "Customer Support", icon: Headset },
  { id: "Revenue", name: "Sales & Revenue", icon: UserRoundSearch },
  { id: "Marketing", name: "Marketing", icon: Megaphone },
  { id: "Finance", name: "Finance", icon: Receipt },
  { id: "Operations", name: "Operations", icon: ShoppingBag },
  { id: "Data", name: "Data & Analytics", icon: LineChart },
];
