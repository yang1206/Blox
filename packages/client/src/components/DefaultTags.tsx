const APP_NAME = 'Yang1206'
const APP_DESCRIPTION = 'Yang1206的博客'
export default function DefaultTags() {
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={APP_DESCRIPTION} />
      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="description" content={APP_DESCRIPTION} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={'https://nextjs.org/static/favicon/apple-touch-icon.png'}
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="https://nextjs.org/static/favicon/favicon.ico" />
      <link rel="icon" href="https://nextjs.org/static/favicon/favicon-16x16.png" />
    </>
  )
}
