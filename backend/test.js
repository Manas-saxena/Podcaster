const accountSid = 'AC36ad987336fb5e9e941cde50eb509574';
const authToken = '933dc9c1807bab57671bd61316bb8d41';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        from: '+15085145219',
        to: '+917906307915'
    })
    .then(message => console.log(message.sid))
    .catch(err =>{
        console.log(err)
    });