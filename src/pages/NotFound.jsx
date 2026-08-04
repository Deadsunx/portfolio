import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../icons.jsx'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not found — Oumar Tirera'
  }, [])

  return (
    <section className="flex min-h-[80svh] items-center px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-[1180px]">
        <span className="label text-ochre">404</span>
        <h1 className="display t-section mt-5 max-w-[16ch]">
          There&apos;s nothing at this address.
        </h1>
        <div className="woven mt-7 w-40" aria-hidden="true" />
        <p className="mt-8 max-w-[46ch] text-[16px] leading-relaxed text-paper/60">
          The page you were looking for either moved or never existed.
        </p>
        <Link
          to="/"
          className="glass glass-hover mt-9 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-mono text-[14px]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to the start
        </Link>
      </div>
    </section>
  )
}
