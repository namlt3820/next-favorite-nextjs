export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mt-12 md:mt-0">{children}</div>
}
