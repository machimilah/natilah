export const newsBanner = {
  text: "HQO achieves 95.8% reduction in average wait time and 89.9% reduction in job slowdown vs. industry-standard schedulers.",
  linkText: "Read the benchmark.",
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
  heading: "The quantum-inspired intelligence layer for GPU datacenters",
  description: "Natilah builds HQO — a Hybrid Quantum Optimizer that formulates GPU job scheduling as a QUBO problem, delivering near-optimal placements in under 41ms.",
  ctaText: "Our technology",
  ctaLink: "/technology"
};

export const missionData = {
  heading: "Solving NP-hard scheduling at datacenter scale",
  paragraphs: [
    "Modern GPU datacenters contain thousands of nodes running workloads from single-GPU inference jobs to 512-GPU distributed training runs. Assigning these jobs optimally is NP-hard — the brute-force search space for 20 jobs on 16 machines exceeds 10²⁴ configurations.",
    "Natilah's thesis is that **quantum-inspired optimization, encoded as Quadratic Unconstrained Binary Optimization (QUBO), provides a fast and practical path** to near-optimal scheduling decisions within a tight 200ms latency budget.",
    "HQO's formulation is quantum-ready by construction: the same QUBO matrix that runs today on classical CPUs will run tomorrow on D-Wave quantum annealers and gate-based quantum computers — no reformulation required."
  ]
};

export const approachData = [
  {
    id: 1,
    title: "QUBO Formulation",
    description: "All scheduling constraints — GPU capacity, memory, topology, SLA deadlines, tenant quotas, and load balancing — unified into a single quadratic energy function.",
    longDescription: "HQO encodes the multi-constraint job assignment problem as a Quadratic Unconstrained Binary Optimization (QUBO). Binary decision variables x_ij ∈ {0,1} represent whether job i runs on machine j. Six penalty terms enforce GPU capacity, memory limits, rack topology, SLA deadlines, tenant quotas, and load balancing objectives. The unified energy function E(x) allows any QUBO-compatible solver — classical or quantum — to find near-optimal placements.",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 2,
    title: "Quantum-Inspired Solvers",
    description: "Parallel execution of Adaptive Simulated Annealing with reheating and Simulated Bifurcation, mimicking quantum annealing dynamics on classical hardware.",
    longDescription: "HQO runs two solvers in parallel via ThreadPoolExecutor and picks the best result. Adaptive SA auto-calibrates its initial temperature from the energy landscape and escapes local minima via reheating. Simulated Bifurcation simulates the quantum dynamics of Kerr parametric oscillators — the physical process behind D-Wave quantum annealers — achieving comparable solution quality on dense problems. The QUBO-to-Ising conversion enables direct execution on quantum hardware when available.",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 3,
    title: "Scalable Decomposition",
    description: "Automatic spatial, temporal, and hierarchical decomposition scales HQO from 256 to 10,000+ GPUs, with parallel sub-QUBO solving across rack partitions.",
    longDescription: "QUBO matrix size grows as O(n·m) variables. For 500 jobs on 128 machines, direct solving is infeasible. HQO automatically selects among three decomposition strategies: spatial (partition by rack), temporal (batch by arrival window), or hierarchical (cluster by resource profile then assign clusters to machine subsets). Sub-problems are solved in parallel via ProcessPoolExecutor, reducing wall-clock time from 16s sequential to ~2s. Validated at 10,000 GPU scale with 100K jobs across Google Borg, Alibaba, and Azure traces.",
    linkText: "Learn more",
    linkUrl: "/technology"
  },
  {
    id: 4,
    title: "Competitive Selection Guarantee",
    description: "HQO mathematically guarantees it never underperforms Best-Fit Decreasing — QUBO results are only used when they outplace the greedy baseline.",
    longDescription: "On every scheduling round, HQO runs both the QUBO optimizer and Best-Fit Decreasing (BFD) greedy algorithm in parallel. The result that places more jobs wins. This provides a hard mathematical guarantee: HQO placements ≥ BFD placements for all inputs. A fast-path optimization skips QUBO entirely when cluster load is below 50%, matching BFD's 0.1ms latency on lightly-loaded clusters. The HQO average decision latency is 41ms — well within the 200ms production budget.",
    linkText: "Learn more",
    linkUrl: "/technology"
  }
];

export const infrastructureData = {
  heading: "Validated at enterprise scale — 10,000 GPUs, 100,000 jobs",
  description: "HQO has been benchmarked on a 1,250-node cluster (10,000 A100 GPUs, 800TB memory) replaying real workload traces from Google, Alibaba, and Azure. Across all traces, HQO delivers 80%+ reduction in average wait time versus Kubernetes default schedulers.",
  sites: [
    {
      name: "256-GPU High-Contention Benchmark",
      image: "https://images.unsplash.com/photo-1580106815433-a5b1d1d53d85?auto=format&fit=crop&w=900&q=80",
      linkText: "View benchmark results",
      linkUrl: "/research",
      description: "32 nodes × 8 GPUs, 500 jobs, 3 seeds. HQO achieves 8.0 min avg wait vs 3.2h baseline, 93.1% GPU utilization, and 100% job completion."
    },
    {
      name: "10,000-GPU Enterprise Benchmark",
      image: "https://images.unsplash.com/photo-1680992046626-418f7e910589?auto=format&fit=crop&w=900&q=80",
      linkText: "View benchmark results",
      linkUrl: "/research",
      description: "1,250 nodes × 8 GPUs, 50K–100K jobs, Google Borg / Alibaba GPU ML / Azure Cloud traces. 80.1% wait time reduction vs BFD. 23.8 jobs/sec scheduling throughput."
    }
  ]
};

export const scalingData = {
  heading: "Our path to scaling",
  description: "HQO's decomposition architecture scales linearly from single-rack deployments to hyperscale datacenters with 100,000+ GPUs.",
  items: [
    {
      id: 1,
      title: "QUBO-Native Architecture",
      number: "01",
      description: "Every scheduling constraint is encoded as a penalty term in a single quadratic energy function. Adding new constraints requires no solver changes — only new QUBO terms."
    },
    {
      id: 2,
      title: "Drop-In Deployment",
      number: "02",
      description: "HQO integrates as a Kubernetes scheduler extender (HTTP webhook) or Slurm plugin. No cluster downtime, no hardware changes — production traffic in 4 weeks via shadow deployment."
    },
    {
      id: 3,
      title: "Quantum-Ready by Design",
      number: "03",
      description: "The same QUBO matrix running on classical CPUs today will run on D-Wave quantum annealers and QAOA circuits tomorrow. HQO's advantage grows as quantum hardware matures."
    }
  ]
};

export const newsData = [
  {
    id: 1,
    date: "Mar 12, 2026",
    title: "HQO Benchmarks: 95.8% Reduction in Average Wait Time vs. Industry-Standard Schedulers",
    excerpt: "A full production benchmark on 256 GPUs comparing HQO against FIFO, EASY Backfill, DRF, and Topology-Aware schedulers shows HQO achieving 8.0 min average wait vs 3.2 hours — a 95.8% improvement — with 100% job completion.",
    fullContent: "A full production benchmark on 256 GPUs comparing HQO against FIFO+FF, FIFO+BF, EASY+FF, EASY+BF, DRF+FF, DRF+BF, and TopoAware schedulers. HQO achieves 8.0 min average wait vs 3.2 hours (FIFO+FF baseline), 41.2 min P95 wait vs 21.8 hours (TopoAware), 1.82x slowdown vs 17.95x, 93.1% GPU utilization vs 86.9%, 11.2% energy savings, and 500/500 job completion vs 498-499/500. Average decision latency: 41ms.",
    linkUrl: "/news"
  },
  {
    id: 2,
    date: "Feb 12, 2026",
    title: "Scale Validation: HQO Delivers 80%+ Wait Time Reduction at 10,000-GPU Scale",
    excerpt: "HQO validated at 10,000-GPU enterprise scale — 1,250 A100 nodes, 50K–100K jobs, replaying real workload traces from Google Borg, Alibaba GPU ML, and Azure Cloud. Results show 80.1% average wait time reduction vs Kubernetes default BFD scheduler.",
    fullContent: "HQO has been validated at 10,000-GPU enterprise scale using real workload traces. Configuration: 1,250 nodes × 8 GPUs = 10,000 A100 GPUs, 800TB total memory, 4 pods × 2 racks topology. Results across Google Borg v3, Alibaba GPU ML, and Azure Cloud VM traces: 80.1% average wait time reduction vs BFD, 76.4% vs K8sBinpack. Scheduling throughput: 23.8 jobs/sec (85,811 jobs/hour). Per-window decision latency: ~22ms.",
    linkUrl: "/news"
  },
  {
    id: 3,
    date: "Feb 10, 2026",
    title: "Economic Impact: $42.7M Year-1 Value at 10,000-GPU Scale",
    excerpt: "A detailed economic analysis shows HQO delivers $17.5M/yr revenue uplift from 8pp GPU utilization gain, $14.1M one-time CapEx savings (940 GPUs not purchased), $10.8M/yr researcher productivity gain, and $296K/yr energy savings for a 10,000-GPU A100 cluster.",
    fullContent: "HQO's 8.0pp GPU utilization improvement (85.1% → 93.1%) delivers measurable economic impact at scale. For a 10,000-GPU A100 cluster: $17.5M/yr revenue uplift from 700,800 additional billable GPU-hours; $14.1M one-time CapEx savings from 940 GPUs not purchased; $10.8M/yr researcher productivity gain from 60% wait time reduction for 200 engineers; $296K/yr energy and cooling savings. Total Year-1 impact: $42.7M. At 100,000-GPU H100 scale: $619M Year-1.",
    linkUrl: "/news"
  },
  {
    id: 4,
    date: "Jan 15, 2026",
    title: "Technical Deep Dive: Simulated Bifurcation as a Quantum-Inspired QUBO Solver",
    excerpt: "Natilah publishes a technical deep dive into Simulated Bifurcation — a quantum-inspired solver based on Kerr parametric oscillator dynamics — and its application to GPU scheduling QUBO problems. Results show SB complements SA by escaping local minima on dense constraint matrices.",
    fullContent: "Simulated Bifurcation (SB) is based on the quantum dynamics of Kerr parametric oscillators (Goto et al., Science Advances 2019/2021). It simulates a network of coupled oscillators whose bifurcation dynamics naturally converge to low-energy Ising spin configurations. HQO runs SA and SB in parallel and picks the best result. SB excels at dense QUBO matrices where SA gets trapped in local minima from one-hot constraint penalty valleys. The QUBO-to-Ising conversion is exact, enabling direct comparison and future deployment on D-Wave quantum annealers.",
    linkUrl: "/news"
  }
];

export const aboutPageData = {
  heroHeading: "About Natilah",
  heroDescription: "We're building the quantum-inspired intelligence layer for the world's GPU datacenter infrastructure.",
  story: {
    heading: "Our story",
    paragraphs: [
      "Natilah was founded on the observation that GPU datacenter scheduling — the core operational problem of the AI infrastructure era — is still solved with greedy heuristics designed for simpler workloads.",
      "As AI training runs grew from single GPUs to 512-GPU distributed jobs, and as datacenters scaled to thousands of nodes, the gap between what greedy schedulers could deliver and what was mathematically optimal grew exponentially.",
      "Our founders — systems architects and optimization researchers — asked a different question: **what if we formulated scheduling as a QUBO problem and solved it with quantum-inspired algorithms?**",
      "The result is HQO: a Hybrid Quantum Optimizer that delivers 95.8% reduction in average wait time, 93.1% GPU utilization, and a mathematical guarantee it never underperforms the best greedy baseline — validated at 10,000-GPU scale."
    ]
  },
  values: [
    { title: "Mathematically rigorous", description: "Every scheduling decision is grounded in combinatorial optimization theory, not heuristics." },
    { title: "Quantum-ready", description: "Our QUBO formulation runs on classical hardware today and quantum hardware tomorrow — no reformulation needed." },
    { title: "Production-proven", description: "Competitive selection guarantees HQO never underperforms Best-Fit Decreasing on any input." },
    { title: "Energy-conscious", description: "11.2% energy reduction and hardware CapEx savings from doing more with the same GPUs." }
  ],
  team: [
    { name: "James Park", role: "Executive Chairman & Co-Founder", bio: "Former Principal Engineer at Google, 15+ years in distributed systems and combinatorial optimization." },
    { name: "Maria Chen", role: "Chief Executive Officer", bio: "Former VP of Engineering at Google Cloud, 20+ years scaling infrastructure platforms globally." },
    { name: "Dr. Alex Rivera", role: "CTO & Co-Founder", bio: "Former ML Research Lead at DeepMind, PhD in Distributed Computing from Stanford. Architect of HQO's QUBO formulation." },
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
      abstract: "We present HQO, a QUBO-based scheduling layer for GPU datacenters that achieves 95.8% reduction in average wait time and 89.9% reduction in job slowdown versus industry-standard schedulers. HQO encodes six scheduling constraints into a unified quadratic energy function solved by Adaptive Simulated Annealing and Simulated Bifurcation in parallel. Validated at 10,000-GPU scale with Google Borg, Alibaba, and Azure traces.",
      tags: ["QUBO", "Quantum-Inspired", "GPU Scheduling", "Simulated Bifurcation"]
    },
    {
      title: "Simulated Bifurcation for Dense QUBO Scheduling Problems",
      authors: "A. Rivera, M. Chen et al.",
      date: "2026",
      abstract: "We analyze Simulated Bifurcation (SB) as a QUBO solver for GPU scheduling problems characterized by dense one-hot constraint matrices. SB's Kerr parametric oscillator dynamics escape local minima that trap Simulated Annealing, improving solution quality by 8-15% on high-contention instances. We derive an adaptive coupling scale calibration that removes manual parameter tuning.",
      tags: ["Simulated Bifurcation", "Ising Model", "QUBO", "Quantum Annealing"]
    },
    {
      title: "Competitive Selection: A Guarantee for QUBO-Based Schedulers",
      authors: "J. Park, A. Rivera et al.",
      date: "2025",
      abstract: "We introduce competitive selection, a meta-algorithm that runs QUBO optimization and Best-Fit Decreasing greedy in parallel, selecting the result that places more jobs. We prove HQO placements ≥ BFD placements for all inputs, providing the first mathematical non-regression guarantee for a quantum-inspired scheduler. Decision latency: 41ms average, 200ms budget.",
      tags: ["Competitive Selection", "Optimization Guarantees", "Scheduling Theory"]
    },
    {
      title: "Scalable QUBO Decomposition for 10,000+ GPU Clusters",
      authors: "S. Kim, A. Rivera et al.",
      date: "2025",
      abstract: "We present three decomposition strategies — spatial (rack partition), temporal (arrival window), and hierarchical (resource-profile clustering) — that reduce QUBO problem size from O(n·m) to tractable sub-problems solved in parallel. At 10,000 GPU scale with 100K jobs, HQO achieves 23.8 jobs/sec scheduling throughput and 80.1% wait time reduction versus Kubernetes default BFD scheduler.",
      tags: ["Problem Decomposition", "Parallel Optimization", "Enterprise Scale"]
    }
  ]
};

export const applicationsPageData = {
  heroHeading: "Applications",
  heroDescription: "HQO transforms GPU scheduling across every workload type — from single-GPU inference to 512-GPU distributed training.",
  useCases: [
    {
      title: "AI & LLM Training",
      description: "QUBO-optimized placement for distributed pre-training runs requiring 32–512 GPUs. Gang scheduling with rack-topology awareness minimizes inter-node communication latency.",
      metric: "-90%",
      metricLabel: "wait time for 32-GPU jobs"
    },
    {
      title: "Inference Serving",
      description: "Sub-millisecond scheduling decisions for high-throughput inference workloads. HQO reduces 1-GPU job wait from 8s to 4s and eliminates starvation under peak load.",
      metric: "41ms",
      metricLabel: "average scheduling latency"
    },
    {
      title: "Multi-Tenant GPU Clouds",
      description: "Tenant quota enforcement encoded directly as QUBO penalty terms. Audit logging, shadow deployment, and A/B routing for safe rollout in shared infrastructure.",
      metric: "93.1%",
      metricLabel: "GPU utilization achieved"
    },
    {
      title: "Kubernetes & Slurm",
      description: "Drop-in deployment as a Kubernetes scheduler extender or Slurm plugin. No cluster downtime, no hardware changes. First production traffic in 4 weeks via shadow mode.",
      metric: "100%",
      metricLabel: "job completion rate"
    }
  ]
};

export const footerData = {
  globalFacilities: [
    { label: "256-GPU Benchmark", href: "/research" },
    { label: "10K-GPU Validation", href: "/research" },
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
