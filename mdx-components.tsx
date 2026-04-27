import type { MDXComponents } from 'mdx/types';
import type { ReactNode, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 style={{ fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.6px', margin: '48px 0 16px', lineHeight: 1.2 }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', margin: '32px 0 12px', lineHeight: 1.3 }}>
        {children}
      </h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p style={{ fontSize: '17px', lineHeight: 1.75, color: '#1d1d1f', margin: '0 0 18px' }}>
        {children}
      </p>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul style={{ fontSize: '17px', lineHeight: 1.75, color: '#1d1d1f', margin: '0 0 18px', paddingLeft: '24px' }}>
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol style={{ fontSize: '17px', lineHeight: 1.75, color: '#1d1d1f', margin: '0 0 18px', paddingLeft: '24px' }}>
        {children}
      </ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li style={{ marginBottom: '8px' }}>{children}</li>
    ),
    a: ({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const url = href ?? '#';
      const isExternal = /^https?:\/\//.test(url);
      const style = { color: '#1e9953', textDecoration: 'underline', textUnderlineOffset: '3px' };
      if (isExternal) {
        return <a href={url} target="_blank" rel="noopener noreferrer" style={style}>{children}</a>;
      }
      return <Link href={url} style={style}>{children}</Link>;
    },
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote style={{ borderLeft: '4px solid #1e9953', padding: '8px 20px', margin: '24px 0', color: '#3a3a3c', fontSize: '17px', lineHeight: 1.7, background: 'rgba(30,153,83,0.05)', borderRadius: '0 8px 8px 0' }}>
        {children}
      </blockquote>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.9em', background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
        {children}
      </code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre style={{ background: '#1d1d1f', color: '#f5f5f7', padding: '20px', borderRadius: '12px', overflow: 'auto', fontSize: '14px', lineHeight: 1.6, margin: '24px 0' }}>
        {children}
      </pre>
    ),
    strong: ({ children }: { children?: ReactNode }) => (
      <strong style={{ fontWeight: 700, color: '#1d1d1f' }}>{children}</strong>
    ),
    hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '40px 0' }} />,
    ...components,
  };
}
