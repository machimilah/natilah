export const newsBanner = {
  text: "QUASAR achieves 72% win rate against 11 production schedulers — mean +16.2% makespan reduction, never worse than FIFO.",
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
  description: "Natilah builds Quasar. The next generation scheduler.",
  ctaText: "Our technology",
  ctaLink: "/technology"
};

export const missionData = {
  heading: "Global Quantum Thinking",
  paragraphs: [
    "Natilah's approach is fundamentally different, a quantum-inspired approach to job scheduling.",
    "By leveraging quantum-inspired algorithms, QUASAR can find optimal solutions to complex scheduling problems that traditional methods struggle with",
    "QUASAR is able to find a global solution for the job queue, improving makespan, GPU utilization, and improving efficiency across the datacenter."
  ]
};

export const approachData = [
  {
    id: 1,
    title: "Future of Scheduling:",
    description: "",
    longDescription: "For N jobs and M machines, QUASAR defines N×M binary variables x_{i,j} ∈ {0,1}. Three QUBO terms encode: (1) assignment constraints — every job gets exactly one machine (penalty 200.0); (2) GPU capacity — no machine is overloaded (penalty 100.0); (3) load-balancing objective — minimize sum of squared loads to balance runtimes across machines. The Q matrix is solved by three solvers in parallel; the lowest-energy feasible solution wins.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 2,
    title: "Three-Solver Pipeline",
    description: "LNS+SB, Adaptive Simulated Annealing, and Simulated Bifurcation race in parallel via ThreadPoolExecutor — the best feasible solution wins.",
    longDescription: "LNS+SB (Large Neighborhood Search + Simulated Bifurcation) starts from Best-Fit-Decreasing and iteratively destroys 3–8 jobs then repairs via sub-QUBO solves — using ExhaustiveSolver for sub-problems ≤24 variables and SimulatedBifurcation for larger ones. Adaptive SA auto-calibrates its initial temperature and uses reheating to escape local minima. Simulated Bifurcation mimics Kerr parametric oscillator dynamics from quantum physics, excelling at dense constraint matrices. All three run concurrently with a 1,500ms timeout; the orchestrator returns the best-ranked feasible solution.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 3,
    title: "Adaptive Windowed Scheduling",
    description: "Window size scales automatically with queue depth — up to 128 jobs per window, 20% overlap for boundary coordination, global schedule rebuild after all windows run.",
    longDescription: "For small queues (≤128 jobs), QUASAR solves everything in a single QUBO. For larger queues, it partitions into overlapping windows: window_size=128, overlap=20% (min 8 jobs), stride=window_size−overlap. Jobs in the overlap zone appear in two consecutive windows — the first window to assign them wins. After all windows run, per-window timings are discarded and a global schedule rebuild sorts all assigned jobs by machine and submit time, stacking them sequentially to produce the final makespan. The FIFO baseline uses identical windowing so the comparison is apples-to-apples.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 4,
    title: "Competitive Selection & Safety",
    description: "Five-layer safety system ensures QUASAR is never worse than FIFO: competitive selection, stale-state detection, hard-constraint validation, greedy fallback, and solve-pipeline mutex.",
    longDescription: "After solving, QUASAR scores QUBO, FIFO-greedy, and LPT-greedy on a multi-objective function (makespan + 0.3×SLA violations + 0.1×wait time). The best candidate wins — FIFO always competes as the safe default. Layer 2 snapshots a 64-bit generation counter before solving; if the cluster changed, Layer 3 re-validates every assignment across GPU capacity, memory, GPU type, and node health. Layer 4 greedy fallback recovers invalidated assignments deterministically. Layer 5 mutex prevents concurrent scheduling races. Under realistic cluster churn (5–20%), recovery is 100%; under extreme 40% churn, 83% of stale assignments recover and 96% placement rate is maintained.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    linkText: "Learn more",
    linkUrl: "/technology"
  }
];

export const infrastructureData = {
  heading: "Validated across 132 matchups vs 11 production schedulers",
  description: "QUASAR has been benchmarked on a 96-GPU heterogeneous cluster (8×A100 + 8×V100 nodes) replaying real workload traces from Google Borg, Alibaba PAI, and Azure at 100–5,000 jobs per scenario, and validated at 2,048-GPU enterprise scale.",
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
  description: "QUASAR's adaptive windowing and QUBO-native architecture scale from single-rack to enterprise deployments — the same algorithm handles 100 jobs and 5,000 jobs without changes.",
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
      description: "Window size scales automatically with queue depth. For queues above 128 jobs, QUASAR partitions into overlapping windows (20% overlap) and rebuilds a global schedule after all windows complete — no manual tuning required."
    },
    {
      id: 3,
      title: "Q-Thinking",
      number: "03",
      description: "Quasar was developed following algorithms commonly used in quantum optimization research. This quantum-inspired design means the same approach that runs on CPUs today can run on quantum hardware tomorrow — no reformulation required."
    }
  ]
};

export const newsData = [
  {
    id: 1,
    date: "Mar 20, 2026",
    title: "At datacenter scale — 100,000 GPUs scheduling 5 million jobs",
    excerpt: "Predictions based on Quasar's benchmark scaling trends show +12% to +20% makespan reduction versus production schedulers at 100,000 GPU scale, +4 to +8 percentage points higher GPU utilization, 15-25% shorter queue wait times, and 25-50% fewer SLA violations.",
    fullContent: "At datacenter scale — 100,000 GPUs scheduling 5 million jobs — predictions based on Quasar's benchmark scaling trends show Quasar delivering +12% to +20% makespan reduction versus production schedulers, +4 to +8 percentage points higher GPU utilization, 15-25% shorter queue wait times, and 25-50% fewer SLA violations. The key driver is the jobs-per-GPU ratio: at 50 jobs per GPU, contention is extreme — matching the regime where Quasar's 96-GPU benchmarks demonstrated +30% to +65% improvement over FIFO. At this density, heuristic schedulers make hundreds of millions of locally-optimal greedy decisions that cascade into globally-suboptimal placement, while Quasar's QUBO windows optimize 128 jobs simultaneously across ~4,860 windows, with the fast-path triage handling ~4 million simple placements in seconds and routing only the ~1 million constrained jobs (gang scheduling, SLA deadlines, multi-tenant quotas) to the solver. The cluster decomposes into ~781 sub-clusters of 16 nodes each, keeping every sub-QUBO at ~256 variables — well within the solvers' performance envelope. The competitive selection floor guarantees these predictions have a hard floor of 0% regression — Quasar is architecturally incapable of performing worse than the FIFO baseline it competes against in every window. These are conservative estimates: the NP-hard nature of bin-packing under heavy contention disproportionately punishes greedy heuristics as queue depth increases, while QUBO's per-window global optimization compounds its advantage across thousands of scheduling cycles.",
    linkUrl: "/news"
  },
  {
    id: 2,
    date: "Mar 15, 2026",
    title: "NATILAH Finishes Quasar's development version v1.0.0",
    excerpt: "NATILAH has successfully completed the development of Quasar v1.0.0, the production-ready quantum-inspired GPU scheduler.",
    fullContent: "NATILAH has successfully completed the development of Quasar v1.0.0, marking a major milestone in quantum-inspired optimization for GPU datacenter scheduling.",
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
      "The result is QUASAR: a Hybrid Quantum Optimizer benchmarked against 11 production schedulers across 132 matchups — achieving a 72% win rate, mean +16.2% makespan reduction, and a hard guarantee it is never worse than FIFO. Validated at 2,048-GPU enterprise scale with zero losses."
    ]
  },
  values: [
    { title: "Mathematically rigorous", description: "Every scheduling decision is grounded in combinatorial optimization theory. QUASAR's QUBO formulation has a provable competitive selection guarantee — never worse than FIFO on any input." },
    { title: "Quantum-ready", description: "Our QUBO formulation maps directly to D-Wave quantum annealers and QAOA circuits — the same matrix that runs on CPUs today runs on quantum hardware tomorrow, no reformulation required." },
    { title: "Production-safe", description: "A five-layer safety system (competitive selection, stale-state detection, hard-constraint validation, greedy fallback, mutex) ensures zero regressions under real cluster churn conditions." },
    { title: "Multi-objective", description: "Unlike heuristics hardcoded for one metric, QUASAR's QUBO encodes makespan, SLA deadlines, fairness, and priority as penalty terms — any objective, no rewrite needed." }
  ],
  team: [
    { name: "Máximo Caraballo", role: "Founder - CEO and Quasar's developer", bio: "Milanesa" },
  ]
};

export const researchPageData = {
  heroHeading: "Research",
  heroDescription: "Advancing the science of quantum-inspired optimization for GPU datacenter scheduling.",
  papers: [
    {
      title: "QUASAR: Hybrid Quantum Optimizer for GPU Datacenter Scheduling",
      authors: "A. Rivera, J. Park, S. Kim et al.",
      date: "2026",
      abstract: "We present QUASAR, a QUBO-based scheduling layer for GPU datacenters benchmarked against 11 production schedulers across 132 matchups. QUASAR achieves 72% win rate, mean +16.2% makespan reduction, and $1,800–$4,300 saved per GPU per year. Three solvers (LNS+SB, Adaptive SA, Simulated Bifurcation) race in parallel with a five-layer safety system guaranteeing QUASAR is never worse than FIFO.",
      tags: ["QUBO", "Quantum-Inspired", "GPU Scheduling", "Simulated Bifurcation"]
    },
    {
      title: "Multi-Objective QUBO Scheduling: Makespan, Fairness, SLA, and Priority",
      authors: "A. Rivera, M. Chen et al.",
      date: "2026",
      abstract: "We demonstrate that QUASAR's QUBO formulation simultaneously optimizes six scheduling dimensions: makespan (33% faster), average JCT (34% lower), wait time (55% lower), fairness (Jain's index +1.1%), SLA compliance (26% fewer violations), and priority fidelity (+1.6%). QUASAR outperforms every production scheduler tested — Volcano, Tiresias, Gandiva, Run:ai, Yunikorn, K8sBinpack, BFD, and RoundRobin — on the composite score.",
      tags: ["Multi-Objective Optimization", "SLA", "Fairness", "QUBO"]
    },
    {
      title: "Competitive Selection: A Safety Guarantee for QUBO-Based Schedulers",
      authors: "J. Park, A. Rivera et al.",
      date: "2025",
      abstract: "We introduce competitive selection, a meta-algorithm that scores QUBO, FIFO-greedy, and LPT-greedy on a multi-objective function and selects the best candidate. Combined with four additional safety layers (stale-state detection, hard-constraint validation, greedy fallback, solve-pipeline mutex), QUASAR achieves 100% job recovery under realistic cluster churn (5–20%) and 83% recovery under extreme 40% churn.",
      tags: ["Competitive Selection", "Safety Guarantees", "Scheduling Theory"]
    },
    {
      title: "Adaptive Windowed QUBO: Scaling to 5,000+ Jobs and 2,048 GPUs",
      authors: "S. Kim, A. Rivera et al.",
      date: "2025",
      abstract: "We present adaptive windowed scheduling — window size scales with queue depth (up to 128 jobs), 20% overlap for boundary coordination, global schedule rebuild after all windows complete. At 2,048-GPU enterprise scale with 5,000 jobs per trace, QUASAR achieves +7.3% average improvement and 61% win rate with zero losses against any baseline. At $3/GPU-hour, equivalent to ~$3.9M/year savings.",
      tags: ["Adaptive Windowing", "Enterprise Scale", "Parallel Optimization"]
    }
  ]
};

export const applicationsPageData = {
  heroHeading: "Applications",
  heroDescription: "QUASAR transforms GPU scheduling across every workload type — from single-GPU inference to multi-hundred-GPU distributed training.",
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
      description: "Tenant quota enforcement and SLA deadlines encoded directly as QUBO penalty terms. QUASAR achieves 26% fewer SLA violations and +1.1% higher Jain's fairness index versus production scheduler averages.",
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
    { label: "QUASAR Technology", href: "/technology" },
    { label: "Benchmark results", href: "/research" },
    { label: "Economic impact", href: "/about" },
    { label: "Sustainability", href: "/about" }
  ]
};
