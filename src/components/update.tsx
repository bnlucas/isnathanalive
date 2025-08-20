export default function LastUpdate({ lastPing }: { lastPing: string }) {
  return (
    <div className="absolute bottom-4 right-4 opacity-20">
      Last updated: {lastPing}
    </div>
  );
}
