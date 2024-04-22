import NavBar from '../componants/navbar';
import Banner from '../componants/home';
import Why from '../componants/why';
import Reviews from '../componants/reviews';
import About from '../componants/about';


export default function Landingpage () {
    return (
        <div>
      <NavBar/>
      <Banner/>
      <Why/>
      <About/>
      <Reviews/>

        </div>
    )
}