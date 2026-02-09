const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="h-8 bg-card-bg rounded-full w-full" />
      <div className="flex justify-center gap-4">
        <div className="h-14 w-32 bg-card-bg rounded-2xl" />
        <div className="h-14 w-32 bg-card-bg rounded-2xl" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
