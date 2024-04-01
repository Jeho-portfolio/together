const passport = require('passport');

exports.Auth_sejong = (req,res) => {

    const requestData = JSON.stringify({
        id: req.body.id,
        pw: req.body.pw,
    });

    console.log(requestData);



    axios.post('https://auth.imsejong.com/auth?method=DosejongSession', {
      "id": requestData.id,
      "pw": requestData.pw,
    })
    .then(response => {
        console.log('로그인 성공:', response.data);
        res.status(200).json(response.data);
      })
      .catch(error => {
        console.error('로그인 실패:', error);
      });

    



};

exports.Auth_sejong_callback = (req,res) => {
    
}