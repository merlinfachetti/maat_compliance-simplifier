import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(201,144,60,0.15)_0%,transparent_70%)] scale-150" />
        <Image src="/maat.png" alt="Ma'at" width={80} height={80} className="relative opacity-60" />
      </div>

      <p className="section-kicker mb-4">404</p>
      <h1 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] mb-4 leading-tight">
        The scales found nothing here.
      </h1>
      <p className="text-[var(--foreground-2)] text-base leading-7 max-w-md mb-10">
        This page doesn&apos;t exist or was moved. Ma&apos;at can only weigh what is real.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="primary-button px-8 py-3">
          Return home
        </Link>
        <Link href="/analyze" className="secondary-button px-8 py-3">
          Analyze a document
        </Link>
      </div>
    </main>
  );
}
