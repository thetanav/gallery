export default function Footer() {
  return (
    <footer className="mt-36 flex h-24 flex-col items-center justify-center border-t">
      <div className="flex w-full max-w-5xl items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">FYNC</h2>
        </div>
      </div>
      <p className="mt-2 text-center text-sm">
        © {new Date().getFullYear()} FYNC. All rights reserved.
      </p>
    </footer>
  );
}
