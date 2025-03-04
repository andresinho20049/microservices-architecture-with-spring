import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link className='mt-10' href="/">Return Home</Link>
    </div>
  )
}