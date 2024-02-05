import express,{Request,Response} from 'express';



//Import Required Data
import quiz_json from './quiz.json'
import data from './response.json'
import format_json from './format.json'
import section_json from './section.json'


// import {objectOfRsponse} from './interfaces/response'

let response_json = data;


const app = express();
app.use(express.json());

const port:number = 3000;

app.post('/', solution);

let userSelectedTopicId:number[] = []
let userSelectedFormatId:number[] = []
let  userSelectedSourceIds:number[] = []


function solution(req:Request, res:Response) {
    // console.log("hii");
    
    // console.log(req.body);
    

    userSelectedTopicId = req.body.topicId
    // console.log(userSelectedTopicId);
    userSelectedFormatId = req.body.formatId
    // console.log(userSelectedFormatId);
    userSelectedSourceIds = req.body.sourceId
    // console.log(userSelectedSourceIds);

    const response = quizePoint();
    
    const newsPoint = newsPrice(response);
    // console.log(response);
    const gamesPoint = gamesPrice(newsPoint);
    let customPoint = customSection(gamesPoint)
    // console.log(gamesPoint);


    
    customPoint = customPoint.sort((a:any, b:any) => b.points - a.points);


    res.json(customPoint)





}




//code For Quiz point count


function quizePoint() {

    let sectionId :number
    let quizPoint :number= 0
    let flag:boolean = false
    let formatFlag :boolean= false
    for (let section of response_json) {

        if (section.section_type === "Quiz") {

            sectionId = section.section_id

            // console.log(section);

            for (let contentItem of section.content) {

                ////////////// Points for Topic ///////////////

                // @ts-ignore
                let temp = quiz_json.find((item) => { return item.id === contentItem.id })

                // console.log(temp);

                if (temp != undefined) {
                    // console.log(temp);

                    flag = userSelectedTopicId.includes(temp.topic_id)
                    // console.log(flag);
                }

                /////////// Points for Formats ////////////////

                //@ts-ignore
                let tempItem = format_json.find((item) => { return item.id === contentItem.id })

                if (tempItem != undefined) {

                    if (["Self-practicing", "Playing"].includes(tempItem.title)) {

                        formatFlag = userSelectedFormatId.includes(tempItem.id)
                        // console.log(formatFlag);
                    }
                }
            }

            //if any content match which user select then add points for topic , formats respectively 
            if (flag) {
                quizPoint = 100 + quizPoint
                // console.log(quizPoint);
            }
            flag = false;

            if (formatFlag) {
                quizPoint = 10 + quizPoint
            }
            formatFlag = false


            if (section.section_id === sectionId) {
                // console.log(quizPoint);
                section.points = quizPoint;
                quizPoint = 0

            }
            // console.log(section.points);


        }
    }

    return response_json

}


////code for news point /////


function newsPrice(array:any) {

    response_json = array

    let news_price:number = 0
    let sectionId :number
    let newsFlag :boolean= false;


    for (let section of response_json) {
        if (section.section_type === "news") {
            sectionId = section.section_id

            // console.log(section);

            for (let j of section.content) {
                // console.log();

                //@ts-ignore
                let temp = userSelectedTopicId.includes(j.topic_id)
                // console.log(temp);
                if (temp) {
                    news_price = news_price + 100
                }
                // if(j.centent.topic_id )
            }
        }
    }



    for (let section of response_json) {
        if (section.section_type === "news") {
            // console.log(section);

            for (let j of section.content) {

                //@ts-ignore
                let temp = quiz_json.find((item) => { return j.topic_id === item.topic_id })
                //    console.log(temp);

                if (temp != undefined) {
                    //     console.log(temp);

                    //@ts-ignore
                    let findItem = format_json.find((ele) => { return ele.id === temp.id })
                    // console.log(findItem);


                    //@ts-ignore
                    if (findItem.title === "Reading") {
                        // console.log(findItem);
                        newsFlag = true;
                    }
                }

            }
            if (newsFlag) {
                news_price = 10 + news_price;
            }
            newsFlag = false

            //@ts-ignore
            if (section.section_id === sectionId) {

                // console.log("hii");
                section.points = news_price;
                // console.log(section);
            }



        }
    }
    // console.log(news_price);
    return response_json
}



function gamesPrice(array:any) {
    let sectionId :number = 0

    response_json = array
    let games_price:number = 0
    let gameFormatFlag:boolean = false


    for (let section of response_json) {

        if (section.section_type === "games") {
            sectionId = section.section_id
            for (let contentItem of section.content) {
                // console.log(contentItem);

                //@ts-ignore
                let findItem = format_json.find((ele) => { return contentItem.id === ele.id })

                if (findItem != undefined) {
                    // console.log(findItem);

                    if (findItem.title === "Playing") {
                        // console.log(findItem);

                        gameFormatFlag = userSelectedFormatId.includes(findItem.id)
                        // console.log(elemet);


                    }
                }

            }
        }

        if (gameFormatFlag) {
            games_price = 10 + games_price

        }
        gameFormatFlag = false

        
        if (section.section_id === sectionId) {

            // console.log("hii");
            section.points = games_price;
            // console.log(section);
        }




    }
    // console.log(sectionId);
    return response_json;

}



////code for custom price /////

function customSection(array:any) {
    response_json = array
    // console.log("hii");
    let section_id :number
    let sectionPoints:number = 0
    let formatFlag = false
    let sourceFlag = false
    let topicFlag = false
    for (let section of response_json) {
        if (section.section_type === "Flight") {

           
            section_id = section.section_id
            for (let contentItem of section.content as any) {
                

                

                let formatFlag1 = userSelectedFormatId.includes(contentItem.format_id)
                if (formatFlag1) {
                    sectionPoints = sectionPoints + 10;
                }

                
                let sourceFlag1 = userSelectedSourceIds.includes(contentItem.source_id)
                if (sourceFlag1) {
                    sectionPoints = sectionPoints + 10;

                }

                // console.log(contentItem);


                let findItem = section_json.find((item) => { return contentItem.section_id === item.id })
                // console.log(findItem);

                if (findItem != undefined) {
                    // console.log(contentItem);
                    let topicFlag1 = userSelectedTopicId.includes(findItem.topic_id)
                    if (topicFlag1) {
                        sectionPoints = sectionPoints + 100

                    }
                }

            }
            // if (formatFlag) {
           

            if (section.section_id === section_id) {
                section.points = sectionPoints
            }

            formatFlag = false
            sourceFlag = false
            topicFlag = false
            sectionPoints = 0
        }
    }
    return response_json

}





app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});