'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber === 0) {
      return `${pathName}`
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`
  }

  return (
    <div className='flex text-center justify-center mt-10 mb-32'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li>
            <Link
              className={clsx(
                'text-gray-800 hover:text-gray-800 hover:bg-gray-200 relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded   focus:shadow-none',
                { '!text-gray-500 pointer-events-none': currentPage === 1 }
              )}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {generatedPagination(currentPage, totalPages).map((_element, index) => (
            <li key={index} className='page-item active'>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded  hover:text-white hover:bg-purple-700  focus:shadow-md',
                  { 'bg-purple-700 shadow-md text-white': currentPage === index + 1 }
                )}
                href={createPageUrl(index + 1)}
              >
                {index + 1} <span className='visually-hidden'></span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              className={clsx(
                'text-gray-800 hover:text-gray-800 hover:bg-gray-200 relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded   focus:shadow-none',
                { '!text-gray-500 pointer-events-none': currentPage === totalPages }
              )}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

const generatedPagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }).map((_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', currentPage - 2, currentPage - 1, currentPage]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}
