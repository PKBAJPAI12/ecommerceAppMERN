const nodeMailer=require("nodemailer");
const sendEmail=async(options)=>{
const transporter=nodeMailer.createTransport({
    service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
    user: 'prateek.gov.jobs@gmail.com',
    pass: 'aeye fgop hagz wrke',
   },
})
console.log(transporter);
const mailOptions={
    from:"prateek.gov.jobs@gmail.com",
    to:options.email,
    subject:options.subject,
    text:options.message
}
await transporter.sendMail(mailOptions);
};
module.exports=sendEmail;