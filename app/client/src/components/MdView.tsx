'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

// import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface tProps {
  textContent: string
}
function MarkdownView(props: tProps) {
  const { textContent } = props
  const { resolvedTheme } = useTheme()
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || '')
          return (
            <SyntaxHighlighter
              showLineNumbers={true}
              style={resolvedTheme === 'light' ? oneLight : oneDark}
              language={match ? match[1] : ''}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        },
        // a({ href, children }) {
        //   return <a href={href} className='text-sky'>{children}</a>
        // },
        h1({ children }) {
          return (
            <h1 id={children as string} className="group cursor-pointer">
              {children}
              <a href={`#${children}`} className="header-anchor no-underline"> # </a>
            </h1>
          )
        },
        h2({ children }) {
          return <h2 id={children as string} className="group cursor-pointer">
            {children}
            <a href={`#${children}`} className="header-anchor no-underline"> # </a>
          </h2>
        },
        h3({ children }) {
          return <h3 id={children as string} className="group cursor-pointer">
            {children}
            <a href={`#${children}`} className="header-anchor no-underline"> # </a>
          </h3>
        },
        h4({ children }) {
          return <h4 id={children as string} className="group cursor-pointer">
            {children}
            <a href={`#${children}`} className="header-anchor no-underline"> # </a>
          </h4>
        },
        // h5({ children }) {
        //   return <h5 id={children as string}>
        //     <a href={`#${children}`}>{children}</a>
        //   </h5>
        // },
        // h6({ children }) {
        //   return <h6 id={children as string}>
        //     <a href={`#${children}`}>{children}</a>
        //   </h6>
        // },
      }}
      className="prose font-mono ma"
    >
      {textContent}
    </ReactMarkdown>
  )
}

export default MarkdownView
