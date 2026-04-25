import { GerUserOrders } from '@/CallingAPIs/AllProdects'
import Allcat from '../_components/Allcat'
import UserOrders from '../_components/UserOrders'


export default async function page() {


  const usrProdects = await GerUserOrders()




  return (
    <>
      <div>


        <div>

          <Allcat />
        </div>
        <div>



          {usrProdects?.map((item) => <UserOrders key={item._id} item={item} />)}




        </div>


      </div>



    </>
  )
}
