export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex justify-center'>
      <div className='w-11/12 md:w-1/4 xl:w-[20%]'>{children}</div>
    </div>
  )
}
