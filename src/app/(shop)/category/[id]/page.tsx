import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params

  if (id === 'kids') {
    notFound()
  }

  return (
    <div>
      <h1>Category page {id}</h1>
    </div>
  )
}
