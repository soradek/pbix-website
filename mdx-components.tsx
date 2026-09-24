import type { MDXComponents } from 'mdx/types';
import type { ReactNode, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 500, color: 'var(--text)', letterSpacing: 'var(--ls-h3)', margin: '48px 0 16px', lineHeight: 1.2 }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 style={{ fontSize: 'var(--fs-lead)', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.3px', margin: '32px 0 12px', lineHeight: 1.3 }}>
        {children}
      </h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 18px' }}>
        {children}
      </p>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 18px', paddingLeft: '24px' }}>
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 18px', paddingLeft: '24px' }}>
        {children}
      </ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li style={{ marginBottom: '8px' }}>{children}</li>
    ),
    a: ({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const url = href ?? '#';
      const isExternal = /^https?:\/\//.test(url);
      const style = { color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' };
      if (isExternal) {
        return <a href={url} target="_blank" rel="noopener noreferrer" style={style}>{children}</a>;
      }
      return <Link href={url} style={style}>{children}</Link>;
    },
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote style={{ padding: '4px 22px', margin: '28px 0', color: 'var(--text)', fontSize: 'var(--fs-lead)', lineHeight: 1.65, background: 'var(--paper)', borderRadius: '14px' }}>
        {children}
      </blockquote>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.9em', background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
        {children}
      </code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre style={{ background: 'var(--text)', color: 'var(--paper)', padding: '20px', borderRadius: '12px', overflow: 'auto', fontSize: 'var(--fs-small)', lineHeight: 1.6, margin: '24px 0' }}>
        {children}
      </pre>
    ),
    strong: ({ children }: { children?: ReactNode }) => (
      <strong style={{ fontWeight: 700, color: 'var(--text)' }}>{children}</strong>
    ),
    hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '40px 0' }} />,
    ...components,
  };
}
