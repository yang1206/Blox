import RootLayout from '@/app/layout'

export default function NotFound() {
  return (
    <RootLayout>
      <div className="prose ma">
        <h2>Ooops!</h2>
        <p>Could not find requested resource</p>
      </div>
    </RootLayout>
  )
}
