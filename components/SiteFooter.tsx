'use client';

import { FormEvent, useState } from 'react';

export function SiteFooter() {
  const [submitted, setSubmitted] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-slate-200/90 bg-slate-100 text-[#1e293b]">
      <div className="mx-auto w-full max-w-[1600px] px-8 py-14 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-10">
          {/* Contact & address */}
          <div className="max-w-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-800">
              Nyumbani
            </h2>
            <address className="not-italic">
              <p className="mt-5 text-sm font-normal leading-relaxed text-slate-600">
                7th floor, Highway Heights
                <br />
                Marcus Garvey road
                <br />
                Kilimani, Nairobi, Kenya
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-slate-800">
                <a
                  href="mailto:client@nyumbani-africa.com"
                  className="transition hover:text-[#1f2d3d]"
                >
                  client@nyumbani-africa.com
                </a>
                <a href="tel:+243833843380" className="transition hover:text-[#1f2d3d]">
                  +243 833 843 380
                </a>
                <a href="tel:+254791564429" className="transition hover:text-[#1f2d3d]">
                  +254 791 564 429
                </a>
              </div>
            </address>
          </div>

          {/* Subscribe & social */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-800">Subscribe</h2>
            <form className="mt-5" onSubmit={onSubscribe} noValidate>
              <div className="flex max-w-sm flex-col gap-0 sm:flex-row sm:items-stretch">
                <label htmlFor="footer-email" className="sr-only">
                  Email
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email here*"
                  className="min-w-0 flex-1 border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <button
                  type="submit"
                  className="mt-2 shrink-0 bg-[#1f2d3d] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#2c3d52] sm:mt-0"
                >
                  Submit
                </button>
              </div>
              {submitted ? (
                <p className="mt-2 text-xs text-slate-600" role="status">
                  Thank you. We have received your email.
                </p>
              ) : null}
            </form>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.12em] text-slate-800">Social</h2>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-600">
              <a href="#" className="transition hover:text-[#1f2d3d]">
                LinkedIn
              </a>
              <a href="#" className="transition hover:text-[#1f2d3d]">
                Facebook
              </a>
              <a href="#" className="transition hover:text-[#1f2d3d]">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
