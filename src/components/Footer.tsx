import Link from 'next/link';
function Footer() {
  return (
    <footer className="shadow mt-4 bg-black text-white h-56  flex  justify-center items-center ">
        <div>
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between gap-3 gap-x-10">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 grow flex justify-center "  >   <span>© 2023</span>  <Link href="https://flowbite.com/"><p className="hover:underline ms-3 text-sky-400">Abdul Malik™</p></Link> <span>. All Rights Reserved.</span> 
    </span>
    </div>
    </div>
</footer>
  )
}

export default Footer
