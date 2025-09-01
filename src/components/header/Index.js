import './header.css'

const Header = () => {
  return (
    <div className='absolute header_main top-0 left-0 w-full z-30'>
        <div className='container mx-auto py-6'>
          <div className="row flex justify-between items-center">
            <figure className='logo'>
              <img src="./assets/img/logo.svg" alt="bg" className='w-[120px] h-full object-cover'/>
            </figure>

            <div className="hamburger">
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </div>

          
        </div>
      </div>
  )
}

export default Header