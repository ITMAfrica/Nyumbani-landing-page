'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CompanyLink = {
  label: string;
  href: string;
  className?: string;
  isEnquire?: boolean;
};

const companyLinks: CompanyLink[] = [
  { label: 'Services', href: '/#how-we-work' },
  { label: 'Careers', href: '#' },
  { label: 'Insights', href: '#', className: 'underline' },
  { label: 'Get in touch', href: '/?enquire=1', isEnquire: true },
  { label: 'Privacy policy', href: '#' },
];

const exploreLinks = [
  { label: 'Hass home', href: '/' },
  { label: 'Property for sale', href: '#' },
  { label: 'Property to let', href: '#' },
  { label: 'Developments', href: '/#how-we-work' },
  { label: 'Hass index', href: '#' },
] as const;

function openEnquireFromFooter(pathname: string) {
  if (pathname === '/') {
    window.dispatchEvent(new CustomEvent('nyumbani:open-enquire'));
  } else {
    window.location.assign('/?enquire=1');
  }
}

export function SiteFooter() {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-slate-200/90 bg-slate-100 text-[#1e293b]">
      <div className="mx-auto w-full max-w-[1600px] px-8 py-14 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Contact & address */}
          <div className="max-w-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-800">
              Hassconsult real estate
            </h2>
            <address className="not-italic">
              <p className="mt-5 text-sm font-normal leading-relaxed text-slate-600">
                ABC Place Waiyaki Way
                <br />
                P.O Box 14090 - 00800
                <br />
                Nairobi, Kenya
              </p>
              <a
                href="tel:+254709479000"
                className="mt-4 inline-block text-sm font-medium text-slate-800 transition hover:text-[#1f2d3d]"
              >
                +254 709 479 000
              </a>
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

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-800">Company</h2>
            <ul className="mt-5 space-y-2.5 text-sm uppercase tracking-wider text-slate-600">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  {item.isEnquire ? (
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        openEnquireFromFooter(pathname);
                      }}
                      className="transition hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className={`transition hover:text-slate-900 ${item.className ?? ''}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-800">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm uppercase tracking-wider text-slate-600">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-slate-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
