const express=require("express");
const bodyParser=require("body-parser");
const mailchimp=require("@mailchimp/mailchimp_marketing");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
    const email=req.body.email;
    const fname=req.body.fname;
    const lname=req.body.lname;

    const data={
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
    }


    mailchimp.setConfig({
        apiKey:"5c51e5dd279b35183e9c3de401bf1c75-us21",
        server:"us21"
    });

    async function run(){
        try{
            const response=await mailchimp.lists.addListMember("993af022b9",data);

            res.sendFile(__dirname+"/success.html");
        }catch(e){
            res.sendFile(__dirname+"/fail.html");
        }
    }

    run();
})


app.post("/fail",(req,res)=>{
    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("Listening on 3000"); 
})
