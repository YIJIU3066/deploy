import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import bodyParser from 'body-parser';
import { ConnectionStates } from "mongoose";

const router = Router();

router.use(bodyParser.json());
router.post("/api/cards", async(req,res) => {
    console.log('post!')
    try{
        const {name, subject, score} = req.body
        const exist = await ScoreCard.findOne({name,subject})
        console.log(exist)        
        if(exist){
            await ScoreCard.updateMany({name, subject}, {score})

            res.json({
                message: `Update (${name}, ${subject}, ${score})`,
                card: {name, subject, score}
            });
        }else{
            const newScoreCard = new ScoreCard({ name, subject, score})
            console.log(`newcard: ${newScoreCard}`)

            newScoreCard.save()

            res.json({
                message: `Adding (${name}, ${subject}, ${score})`,
                card: {name, subject, score}
            })

        } 
        }catch(e){
            res.json({message: "wrong!"})
    } 
});

router.delete("/api/cards", async(_,res) => {
    try{
        await ScoreCard.deleteMany({});
        res.json({message: "Database cleared"})
        console.log("delete card");
    }catch(e){
        throw new Error("Database clear failed");}

});

router.get("/api/cards", async(req,res) =>{
    console.log('get')
    console.log(req.query)   //{ type: 'name', queryString: 'AMY' }
    const { type, queryString } = req.query

    const query = {}
    query[type] = queryString 
    console.log(query) //{ name: 'AMY' }

    const queryCard = await ScoreCard.find(query)
    // console.log(queryCard)

    if(queryCard.length === 0){
        res.json({message : `${type} ${queryString} not found!`})
    }else{
        res.json({
            messages: queryCard.map(
                (card) => `Found card with ${type}: (${card.name}, ${card.subject}, ${card.score})`
            )

        })

    }


});
export default router;