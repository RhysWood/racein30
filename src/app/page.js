import ErrorBoundary from './components/ErrorBoundary';
import TheRace from './components/voting/TheRace';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-10 items-center sm:items-start row-start-2">
        <ErrorBoundary>
          <TheRace />
        </ErrorBoundary>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-500 text-sm mt-10">
        racein30™
      </footer>
    </div>
  );
}
