import { mongooseConnect } from "@/lib/mongoose";
 import { Stock } from "@/models/Stock"; 

// api for fetchin data
export default async function handle(req , res) {
    

  // if authenticated , connected to database
  await mongooseConnect()
  
  const { method } = req;
  if (method === 'POST'){
    const {stockname , ticker ,  quantity ,   buyprice} = req.body;

    const stockData = await Stock.create({
        stockname , ticker ,  quantity ,   buyprice
    })

    res.json(stockData)

  }

  if (method ===  'GET'){
    if (req.query?.id){
        res.json(await Stock.findById(req.query.id))
    } else {
        res.json((await Stock.find()).reverse())
    }
  }
  // update req
  if (method === 'PUT'){
    //update id
    const { _id ,  stockname , ticker ,  quantity ,   buyprice} = req.body;

    await Stock.updateOne({_id} , {
         stockname , ticker ,  quantity ,   buyprice

    });

    res.json(true);

  }

  // delete req
if (method === 'DELETE'){
    if (req.query?.id){
        await Stock.deleteOne({_id: req.query?.id});
        res.json(true);
    }
}
}