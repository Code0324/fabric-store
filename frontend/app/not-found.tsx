import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal py-12">
      <div className="container text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold gradient-gold mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream mb-4">Page Not Found</h2>
        <p className="text-xl text-muted mb-8 max-w-md mx-auto">
          Oops! The page you're looking for has disappeared like a lost thread.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary px-8 py-3 text-lg">
            Go Home
          </Link>
          <Link href="/products" className="btn btn-outline px-8 py-3 text-lg">
            Shop Fabrics
          </Link>
        </div>
      </div>
    </div>
  );
}
