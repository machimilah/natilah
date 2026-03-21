export const newsBanner = {
  text: "HQO achieves 72% win rate against 11 production schedulers — mean +16.2% makespan reduction, never worse than FIFO.",
  linkText: "See the full benchmark.",
  linkUrl: "/research"
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Technology", href: "/technology" },
  { label: "Research", href: "/research" },
  { label: "Applications", href: "/applications" },
  { label: "News", href: "/news" }
];

export const heroData = {
  heading: "Making datacenters more efficient",
  description: "Natilah builds HQO. The next generation scheduler.",
  ctaText: "Our technology",
  ctaLink: "/technology"
};

export const missionData = {
  heading: "Solving GPU scheduling globally",
  paragraphs: [
    "Natilah's approach is fundamentally different: **encode the entire batch of jobs as a single Quadratic Unconstrained Binary Optimization (QUBO) problem and solve for all assignments simultaneously**.",
    "The result is a **median +6.9% and mean +16.2% makespan reduction** across 132 matchups against 11 production schedulers (FIFO, Slurm Backfill, Kubernetes Binpack, Tiresias, Gandiva, Volcano, Yunikorn, and more) — with a hard guarantee: HQO is never worse than FIFO."
  ]
};

export const approachData = [
  {
    id: 1,
    title: "QUBO Formulation",
    description: "All jobs in the current window are encoded simultaneously into a single quadratic energy function with three terms: assignment constraints, GPU capacity limits, and a load-balancing objective.",
    longDescription: "For N jobs and M machines, HQO defines N×M binary variables x_{i,j} ∈ {0,1}. Three QUBO terms encode: (1) assignment constraints — every job gets exactly one machine (penalty 200.0); (2) GPU capacity — no machine is overloaded (penalty 100.0); (3) load-balancing objective — minimize sum of squared loads to balance runtimes across machines. The Q matrix is solved by three solvers in parallel; the lowest-energy feasible solution wins.",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 2,
    title: "Three-Solver Pipeline",
    description: "LNS+SB, Adaptive Simulated Annealing, and Simulated Bifurcation race in parallel via ThreadPoolExecutor — the best feasible solution wins.",
    longDescription: "LNS+SB (Large Neighborhood Search + Simulated Bifurcation) starts from Best-Fit-Decreasing and iteratively destroys 3–8 jobs then repairs via sub-QUBO solves — using ExhaustiveSolver for sub-problems ≤24 variables and SimulatedBifurcation for larger ones. Adaptive SA auto-calibrates its initial temperature and uses reheating to escape local minima. Simulated Bifurcation mimics Kerr parametric oscillator dynamics from quantum physics, excelling at dense constraint matrices. All three run concurrently with a 1,500ms timeout; the orchestrator returns the best-ranked feasible solution.",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 3,
    title: "Adaptive Windowed Scheduling",
    description: "Window size scales automatically with queue depth — up to 128 jobs per window, 20% overlap for boundary coordination, global schedule rebuild after all windows run.",
    longDescription: "For small queues (≤128 jobs), HQO solves everything in a single QUBO. For larger queues, it partitions into overlapping windows: window_size=128, overlap=20% (min 8 jobs), stride=window_size−overlap. Jobs in the overlap zone appear in two consecutive windows — the first window to assign them wins. After all windows run, per-window timings are discarded and a global schedule rebuild sorts all assigned jobs by machine and submit time, stacking them sequentially to produce the final makespan. The FIFO baseline uses identical windowing so the comparison is apples-to-apples.",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 4,
    title: "Competitive Selection & Safety",
    description: "Five-layer safety system ensures HQO is never worse than FIFO: competitive selection, stale-state detection, hard-constraint validation, greedy fallback, and solve-pipeline mutex.",
    longDescription: "After solving, HQO scores QUBO, FIFO-greedy, and LPT-greedy on a multi-objective function (makespan + 0.3×SLA violations + 0.1×wait time). The best candidate wins — FIFO always competes as the safe default. Layer 2 snapshots a 64-bit generation counter before solving; if the cluster changed, Layer 3 re-validates every assignment across GPU capacity, memory, GPU type, and node health. Layer 4 greedy fallback recovers invalidated assignments deterministically. Layer 5 mutex prevents concurrent scheduling races. Under realistic cluster churn (5–20%), recovery is 100%; under extreme 40% churn, 83% of stale assignments recover and 96% placement rate is maintained.",
    linkText: "Learn more",
    linkUrl: "/technology"
  }
];

export const infrastructureData = {
  heading: "Validated across 132 matchups vs 11 production schedulers",
  description: "HQO has been benchmarked on a 96-GPU heterogeneous cluster (8×A100 + 8×V100 nodes) replaying real workload traces from Google Borg, Alibaba PAI, and Azure at 100–5,000 jobs per scenario, and validated at 2,048-GPU enterprise scale.",
  sites: [
    {
      name: "96-GPU Heterogeneous Cluster Benchmark",
      image: "https://images.unsplash.com/photo-1580106815433-a5b1d1d53d85?auto=format&fit=crop&w=900&q=80",
      linkText: "View benchmark results",
      linkUrl: "/research",
      description: "8 A100 nodes + 8 V100 nodes, 3 traces × 4 scales = 12 scenarios, 132 total matchups vs 11 schedulers. 72% win rate (71W/15T/13L), mean +16.2% makespan reduction. Best case: +76.3% vs Gandiva."
    },
    {
      name: "2,048-GPU Enterprise Scale Validation",
      image: "https://images.unsplash.com/photo-1680992046626-418f7e910589?auto=format&fit=crop&w=900&q=80",
      linkText: "View benchmark results",
      linkUrl: "/research",
      description: "320 nodes / 2,048 GPUs (192 A100 + 128 V100), 5,000 jobs per trace. +7.3% average improvement, 61% win rate (20W/13T/0L), zero losses. Equivalent to ~$3.9M/year savings at $3/GPU-hour."
    }
  ]
};

export const scalingData = {
  heading: "Designed to scale without redesign",
  description: "HQO's adaptive windowing and QUBO-native architecture scale from single-rack to enterprise deployments — the same algorithm handles 100 jobs and 5,000 jobs without changes.",
  items: [
    {
      id: 1,
      title: "QUBO-Native Architecture",
      number: "01",
      description: "Every scheduling constraint is encoded as a penalty term in a single quadratic energy function. Adding new constraints (SLA deadlines, tenant quotas, GPU type affinity) requires only new QUBO terms — no solver changes needed."
    },
    {
      id: 2,
      title: "Adaptive Windowing",
      number: "02",
      description: "Window size scales automatically with queue depth. For queues above 128 jobs, HQO partitions into overlapping windows (20% overlap) and rebuilds a global schedule after all windows complete — no manual tuning required."
    },
    {
      id: 3,
      title: "Quantum-Ready by Design",
      number: "03",
      description: "The same QUBO matrix running on classical CPUs today maps directly to D-Wave quantum annealers and QAOA circuits. HQO's advantage grows as quantum hardware matures — no reformulation required."
    }
  ]
};

export const newsData = [
  {
    id: 1,
    date: "Mar 12, 2026",
    title: "HQO Benchmark: 72% Win Rate Against 11 Production Schedulers, Mean +16.2% Makespan Reduction",
    excerpt: "A full benchmark across 132 matchups vs FIFO, SlurmBackfill, K8sBinpack, Volcano, Tiresias, Gandiva, Run:ai, Yunikorn, and more — 96-GPU heterogeneous cluster, 3 real-world traces, 100–5,000 jobs. HQO wins 72% of matchups and is never worse than FIFO.",
    fullContent: "HQO was benchmarked against 11 production schedulers (FIFO, BFD, SJF, RoundRobin, SlurmBackfill, K8sBinpack, Volcano, Tiresias, Gandiva, Run:ai, Yunikorn) across 3 traces (Google Borg, Alibaba PAI, Azure) at 4 job scales (100, 500, 1,000, 5,000 jobs) — 132 total matchups. Results: 72% win rate (71W/15T/13L), mean +16.2% makespan reduction, median +6.9%. Best case: +76.3% vs Gandiva (azure, 100 jobs). Worst case: -3.4% vs SlurmBackfill (azure, 500 jobs). The competitive selection safety guarantee held across all 132 matchups — HQO was never worse than FIFO.",
    linkUrl: "/news"
  },
  {
    id: 2,
    date: "Feb 12, 2026",
    title: "Multi-Objective Results: HQO Outperforms Every Production Scheduler on 6 Dimensions",
    excerpt: "Beyond makespan, HQO was scored across 6 dimensions — makespan, average JCT, wait time, fairness, SLA compliance, and priority fidelity. HQO outperforms every production scheduler tested on the composite score: 33% faster makespan, 55% lower wait time, 26% fewer SLA violations.",
    fullContent: "HQO's QUBO formulation encodes SLA deadlines and per-tenant fairness directly into the optimization — something no heuristic scheduler can do. On 6-dimensional composite scoring across 9 scenarios: 33% faster makespan (67,747s vs 101,100s avg), 34% lower average JCT (5,326s vs 8,100s), 55% lower wait time (1,953s vs 4,369s), +1.1% higher Jain's fairness index, 26% fewer SLA violations (29.0% vs 39.2%), +1.6% higher priority fidelity. HQO outperforms Volcano, Tiresias, Gandiva, Run:ai, Yunikorn, K8sBinpack, BFD, and RoundRobin on all dimensions.",
    linkUrl: "/news"
  },
  {
    id: 3,
    date: "Feb 10, 2026",
    title: "Economic Impact: $1,800–$4,300 Saved Per GPU Per Year, Zero Hardware Changes",
    excerpt: "A mean +16.2% makespan reduction means the same workload completes faster on the same hardware. At $3/GPU-hour, that translates to $1,813/GPU/yr (conservative, median +6.9%) to $4,258/GPU/yr (mean) — $1.8M–$4.3M/yr per 1,000-GPU cluster.",
    fullContent: "HQO's makespan reduction directly translates to GPU compute savings: the same workload finishes faster, freeing GPUs for the next batch sooner. At $3/GPU-hour and 8,760 hours/year: conservative estimate (median +6.9% reduction) saves ~$1,813/GPU/yr; average estimate (mean +16.2%) saves ~$4,258/GPU/yr. For a 1,000-GPU cluster: $1.8M–$4.3M/yr. For a 10,000-GPU cluster: $18.1M–$42.6M/yr. GPU utilization also improved — HQO ranks #2 out of 12 schedulers with a 77% utilization win rate (102W/18T/12L), behind only SlurmBackfill.",
    linkUrl: "/news"
  },
  {
    id: 4,
    date: "Jan 15, 2026",
    title: "Enterprise Scale: +7.3% Improvement at 2,048 GPUs, Zero Losses Against Any Baseline",
    excerpt: "HQO validated at enterprise scale: 320 nodes / 2,048 GPUs (192 A100 + 128 V100), 5,000 jobs per trace. +7.3% average makespan improvement, 61% win rate, zero losses against any baseline. Equivalent to ~$3.9M/year savings at $3/GPU-hour.",
    fullContent: "At 2,048-GPU scale (320 nodes, 192 A100 + 128 V100), HQO was benchmarked against 11 schedulers across 3 traces with 5,000 jobs: 33 total matchups, +7.3% average improvement, 61% win rate (20W/13T/0L). Zero losses — HQO never underperformed any baseline at this scale. vs Gandiva: +47.1% avg. vs Tiresias: +16.3% avg. At $3/GPU-hour, a +7.3% improvement on 2,048 GPUs saves approximately $3.9M/year. The five-layer safety system ensured 100% job placement under realistic cluster churn.",
    linkUrl: "/news"
  }
];

export const aboutPageData = {
  heroHeading: "About Natilah",
  heroDescription: "We're building the quantum-inspired intelligence layer for the world's GPU datacenter infrastructure.",
  story: {
    heading: "Our story",
    paragraphs: [
      "Natilah was founded on the observation that GPU datacenter scheduling — the core operational problem of the AI infrastructure era — is still solved with greedy heuristics that process jobs one at a time.",
      "As AI training runs grew from single GPUs to multi-hundred-GPU distributed jobs, and as datacenters scaled to thousands of nodes, the gap between what greedy schedulers could deliver and what was globally optimal grew exponentially.",
      "Our founders — systems architects and optimization researchers — asked a different question: **what if we encoded the entire batch scheduling problem as a QUBO and solved it simultaneously, with multiple quantum-inspired solvers racing in parallel?**",
      "The result is HQO: a Hybrid Quantum Optimizer benchmarked against 11 production schedulers across 132 matchups — achieving a 72% win rate, mean +16.2% makespan reduction, and a hard guarantee it is never worse than FIFO. Validated at 2,048-GPU enterprise scale with zero losses."
    ]
  },
  values: [
    { title: "Mathematically rigorous", description: "Every scheduling decision is grounded in combinatorial optimization theory. HQO's QUBO formulation has a provable competitive selection guarantee — never worse than FIFO on any input." },
    { title: "Quantum-ready", description: "Our QUBO formulation maps directly to D-Wave quantum annealers and QAOA circuits — the same matrix that runs on CPUs today runs on quantum hardware tomorrow, no reformulation required." },
    { title: "Production-safe", description: "A five-layer safety system (competitive selection, stale-state detection, hard-constraint validation, greedy fallback, mutex) ensures zero regressions under real cluster churn conditions." },
    { title: "Multi-objective", description: "Unlike heuristics hardcoded for one metric, HQO's QUBO encodes makespan, SLA deadlines, fairness, and priority as penalty terms — any objective, no rewrite needed." }
  ],
  team: [
    { name: "James Park", role: "Executive Chairman & Co-Founder", bio: "Former Principal Engineer at Google, 15+ years in distributed systems and combinatorial optimization." },
    { name: "Maria Chen", role: "Chief Executive Officer", bio: "Former VP of Engineering at Google Cloud, 20+ years scaling infrastructure platforms globally." },
    { name: "Dr. Alex Rivera", role: "CTO & Co-Founder", bio: "Former ML Research Lead at DeepMind, PhD in Distributed Computing from Stanford. Architect of HQO's QUBO formulation and three-solver pipeline." },
    { name: "Sarah Kim", role: "VP of Engineering", bio: "Former Director of Infrastructure at Netflix, expert in large-scale Kubernetes and Slurm deployments." }
  ]
};

export const researchPageData = {
  heroHeading: "Research",
  heroDescription: "Advancing the science of quantum-inspired optimization for GPU datacenter scheduling.",
  papers: [
    {
      title: "HQO: Hybrid Quantum Optimizer for GPU Datacenter Scheduling",
      authors: "A. Rivera, J. Park, S. Kim et al.",
      date: "2026",
      abstract: "We present HQO, a QUBO-based scheduling layer for GPU datacenters benchmarked against 11 production schedulers across 132 matchups. HQO achieves 72% win rate, mean +16.2% makespan reduction, and $1,800–$4,300 saved per GPU per year. Three solvers (LNS+SB, Adaptive SA, Simulated Bifurcation) race in parallel with a five-layer safety system guaranteeing HQO is never worse than FIFO.",
      tags: ["QUBO", "Quantum-Inspired", "GPU Scheduling", "Simulated Bifurcation"]
    },
    {
      title: "Multi-Objective QUBO Scheduling: Makespan, Fairness, SLA, and Priority",
      authors: "A. Rivera, M. Chen et al.",
      date: "2026",
      abstract: "We demonstrate that HQO's QUBO formulation simultaneously optimizes six scheduling dimensions: makespan (33% faster), average JCT (34% lower), wait time (55% lower), fairness (Jain's index +1.1%), SLA compliance (26% fewer violations), and priority fidelity (+1.6%). HQO outperforms every production scheduler tested — Volcano, Tiresias, Gandiva, Run:ai, Yunikorn, K8sBinpack, BFD, and RoundRobin — on the composite score.",
      tags: ["Multi-Objective Optimization", "SLA", "Fairness", "QUBO"]
    },
    {
      title: "Competitive Selection: A Safety Guarantee for QUBO-Based Schedulers",
      authors: "J. Park, A. Rivera et al.",
      date: "2025",
      abstract: "We introduce competitive selection, a meta-algorithm that scores QUBO, FIFO-greedy, and LPT-greedy on a multi-objective function and selects the best candidate. Combined with four additional safety layers (stale-state detection, hard-constraint validation, greedy fallback, solve-pipeline mutex), HQO achieves 100% job recovery under realistic cluster churn (5–20%) and 83% recovery under extreme 40% churn.",
      tags: ["Competitive Selection", "Safety Guarantees", "Scheduling Theory"]
    },
    {
      title: "Adaptive Windowed QUBO: Scaling to 5,000+ Jobs and 2,048 GPUs",
      authors: "S. Kim, A. Rivera et al.",
      date: "2025",
      abstract: "We present adaptive windowed scheduling — window size scales with queue depth (up to 128 jobs), 20% overlap for boundary coordination, global schedule rebuild after all windows complete. At 2,048-GPU enterprise scale with 5,000 jobs per trace, HQO achieves +7.3% average improvement and 61% win rate with zero losses against any baseline. At $3/GPU-hour, equivalent to ~$3.9M/year savings.",
      tags: ["Adaptive Windowing", "Enterprise Scale", "Parallel Optimization"]
    }
  ]
};

export const applicationsPageData = {
  heroHeading: "Applications",
  heroDescription: "HQO transforms GPU scheduling across every workload type — from single-GPU inference to multi-hundred-GPU distributed training.",
  useCases: [
    {
      title: "AI & LLM Training",
      description: "QUBO-optimized global placement for distributed training runs. Gang scheduling with topology awareness minimizes inter-node communication latency and reduces queue wait time across all job sizes.",
      metric: "+16.2%",
      metricLabel: "mean makespan reduction"
    },
    {
      title: "Multi-Scheduler Replacement",
      description: "Benchmarked against 11 production schedulers including SlurmBackfill, Kubernetes Binpack, Tiresias, Gandiva, Volcano, Run:ai, and Yunikorn — 72% win rate across 132 matchups on real-world Google Borg, Alibaba PAI, and Azure traces.",
      metric: "72%",
      metricLabel: "win rate vs 11 schedulers"
    },
    {
      title: "Multi-Tenant GPU Clouds",
      description: "Tenant quota enforcement and SLA deadlines encoded directly as QUBO penalty terms. HQO achieves 26% fewer SLA violations and +1.1% higher Jain's fairness index versus production scheduler averages.",
      metric: "26%",
      metricLabel: "fewer SLA violations"
    },
    {
      title: "Kubernetes & Slurm",
      description: "Drop-in deployment as a Kubernetes scheduler extender or Slurm plugin. No cluster downtime, no hardware changes. Five-layer safety system guarantees never worse than FIFO on any input.",
      metric: "0%",
      metricLabel: "floor — never worse than FIFO"
    }
  ]
};

export const footerData = {
  globalFacilities: [
    { label: "96-GPU Benchmark", href: "/research" },
    { label: "2,048-GPU Validation", href: "/research" },
    { label: "Kubernetes Integration", href: "/technology" }
  ],
  news: [
    { label: "Newsroom", href: "/news" },
    { label: "Research papers", href: "/research" }
  ],
  company: [
    { label: "Contact us", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "HQO Technology", href: "/technology" },
    { label: "Benchmark results", href: "/research" },
    { label: "Economic impact", href: "/about" },
    { label: "Sustainability", href: "/about" }
  ]
};
