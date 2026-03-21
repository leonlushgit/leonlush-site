const stats = [
  { value: "2M+", label: "Subscribers" },
  { value: "500M+", label: "Total Views" },
  { value: "1,000+", label: "Videos" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-[#131313]/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 py-10 flex justify-center gap-20">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-white tracking-tight">
              {stat.value}
            </p>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
