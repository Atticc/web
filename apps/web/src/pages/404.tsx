import type { NextPage } from 'next'
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold pb-20">404 - Page Not Found</h1>
        <h1 className="text-6xl font-bold">
          Back to{' '}
          <Link href="/" passHref>
            <a className="text-blue-600" >
              Crypto Corner!
            </a>
          </Link>
        </h1>
      </main>
    </div>
  )
}

export default Custom404