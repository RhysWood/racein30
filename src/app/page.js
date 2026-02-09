import ErrorBoundary from './components/ErrorBoundary';
import TheRace from './components/voting/TheRace';
import PreviousRaces from './components/history/PreviousRaces';
import SeasonProgress from './components/SeasonProgress';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-8 pb-20 gap-12 sm:pt-12">
      <main className="flex flex-col gap-10 items-center w-full max-w-2xl">
        <ErrorBoundary>
          <TheRace />
        </ErrorBoundary>
        <SeasonProgress />
        <PreviousRaces />
      </main>
    </div>
  );
}
