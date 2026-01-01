export const timeFormat = (time: string | Date): string => {
  const now = Date.now();
  const sent = new Date(time).getTime();

  const seconds = Math.floor((now - sent) / 1000);

  if (seconds < 5) return "just now";

  const units: { limit: number; unit: string }[] = [
    { limit: 60, unit: "second" },
    { limit: 3600, unit: "minute" },
    { limit: 86400, unit: "hour" },
    { limit: Infinity, unit: "day" },
  ];

  for (let i = 0; i < units.length; i++) {
    if (seconds < units[i].limit) {
      const value =
        i === 0
          ? seconds
          : Math.floor(seconds / units[i - 1].limit);

      const label = value === 1 ? units[i].unit : `${units[i].unit}s`;
      return `${value} ${label} ago`;
    }
  }

  return "just now";
};
