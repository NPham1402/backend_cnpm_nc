var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe")(
  "sk_test_51KysBGC4c4me30BTVBplfmcTH4bvtHZQiMh1cbwZZ5cgpYIyRhj1QESuxAu6VVD0kIk2Y7CxBVP6tfoUHkc4odBe008u6aKt4e"
);
var Request = require("tedious").Request;
const axios = require("axios");
var dbcon = require("./connection_config");
/* GET home page. */
// var connection = require("./config_sqlserver");

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: "0938224718nguyen@gmail.com",
    pass: "mxgkjfzvjapptqgp",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
router.get("/getcustomerinfor", (req, res, next) => {
  console.log(req);
});

router.get("/home", (req, res, next) => {
  console.log(req.headers.id);

  dbcon.query(
    "select * from cnpm.HOME where HOME.PARTNER_ID='" + req.headers.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      console.log(result);
      res.json(result);
    }
  );
});
router.get("/history", (req, res, next) => {
  console.log(req.headers.id);

  dbcon.query(
    "select ID_ROOMTYPE as id,SO_LUONG_PHONG,PAY_TIME,NGAY_NHAN_PHONG,NGAY_TRA_PHONG,FINAL_PRICE from cnpm.HOA_DON where ID_ROOMTYPE='" +
      req.headers.id +
      "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      console.log(result);
      res.json(result);
    }
  );
});
router.get("/thongke2", (req, res, next) => {
  console.log(req.headers.id);

  dbcon.query(
    "select concat(month(PAY_TIME),'/',year(PAY_TIME))  as name,sum(FINAL_PRICE) as total from cnpm.HOA_DON where ID_ROOMTYPE='" +
      req.headers.id +
      "'group by year(PAY_TIME),month(PAY_TIME) order by year(PAY_TIME),month(PAY_TIME);",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      console.log(result);
      res.json(result);
    }
  );
});
router.get("/car", (req, res, next) => {
  console.log("nect");

  dbcon.query("select * from cnpm.contact", function (err, result, filesd) {
    if (err) throw console.log(err);
    console.log(result);
    res.json(result);
  });
});
router.get("/home/:id", (req, res) => {
  console.log("select * from cnpm.home where id_home='" + req.params.id + "'");
  dbcon.query(
    "select * from cnpm.home where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.post("/home-add", (req, res) => {
  dbcon.query(
    "INSERT INTO cnpm.home(ID_HOME, TEN, DIA_CHI, DIEN_TICH, SO_TANG)  VALUES ('home09', '" +
      req.body.name +
      "', '" +
      req.body.adress +
      "'," +
      req.body.dientich +
      "," +
      req.body.sotang +
      " );",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.post("/home-add ", (req, res) => {
  dbcon.query(
    "INSERT INTO cnpm.home(ID_HOME, TEN, DIA_CHI, DIEN_TICH, SO_TANG)  VALUES ('home09', '" +
      req.body.name +
      "', '" +
      req.body.adress +
      "'," +
      req.body.dientich +
      "," +
      req.body.sotang +
      " );",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.post("hoadonp/:id", (req, res) => {
  dbcon.query(
    "select  * from cnpm.HOME,cnpm.ROOMTYPE,cnpm.HOA_DON where HOME.ID_HOME=ROOMTYPE.ID_HOME and ROOMTYPE.ID_ROOMTYPE=HOA_DON.ID_ROOMTYPE and PARTNER_ID='" +
      req.params.id +
      "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.post("/home-update/:id", (req, res) => {
  dbcon.query(
    "update cnpm.home set ten='" +
      req.body.name +
      "',dia_chi='" +
      req.body.adress +
      "',dien_tich='" +
      req.body.dientich +
      "',so_tang='" +
      req.body.sotang +
      "' where id_home='" +
      req.params.id +
      "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.get("/thongke", (req, res) => {
  let result;
  const a =
    "select * from (select count(*) AS soluonghoadon from cnpm.HOA_DON where MA_DAT_CHO='" +
    req.headers.id +
    "' ) sohoadon,(select count(*) soluonguser from (select count(*) as luonguser from cnpm.HOA_DON  where MA_DAT_CHO='" +
    req.headers.id +
    "' group by ID_USER) temp) soluonguser,(select sum(TOTAL_PRICE) as doanhthu from cnpm.HOA_DON where MA_DAT_CHO='" +
    req.headers.id +
    "') doanh";
  console.log(a);
  dbcon.query(a, function (err, result, filesd) {
    if (err) throw console.log(err);
    res.json(result);
  });
});
router.delete("/home/:id", (req, res) => {
  console.log("update cnpm.home where id_home='" + req.params.id + "'");
  dbcon.query(
    "update cnpm.home set status=false where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});

//sophong

router.get("/sophong/:id", (req, res) => {
  console.log("connected");
  dbcon.query(
    "SELECT * FROM cnpm.so_phong where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.get("/hoadon", (req, res) => {
  console.log(req.headers.id);
  dbcon.query(
    "SELECT * FROM cnpm.HOA_DON where ID_USER='" +
      req.headers.id +
      "' And HD_STATUS=1 ",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/sophong-add", (req, res) => {
  dbcon.query(
    "INSERT INTO SO_PHONG(ID_HOME, TEN_PHONG, LOAI_PHONG, LOAI_GIUONG, SO_NGUOI,AN_SANG , SO_PHONG )  VALUES ('" +
      req.body.idphong +
      "', '" +
      req.body.name +
      "', '" +
      req.body.loaiphong +
      "','" +
      req.body.phong +
      "'," +
      req.body.songuoi +
      ", " +
      req.body.ansang +
      "," +
      req.body.sophong +
      ");",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.get("/id_ramdom", (req, res) => {
  res.json({ ID: uuidv4() });
});

router.get("/refund", async (req, res) => {
  let status, error;
  status = "success";
  console.log(req.headers.id);
  try {
    await Stripe.refunds
      .create({
        charge: req.headers.id,
      })
      .then((data) => {
        dbcon.query(
          "update cnpm.HOA_DON set HD_STATUS=0 where ID_HOA_DON='" +
            req.headers.id +
            "'",
          function (err, result, filesd) {
            if (err) throw console.log(err);
            var mailOptions = {
              from: "0938224718nguyen@gmail.com",
              to: "01675359367nguyen@gmail.com",
              subject:
                "Thông Báo Hoàn Tiền Hóa Đơn Điện Tử có ID:" + req.headers.id,
              text:
                "Hôm nay bạn đã hủy hoa đơn có ID đặt phòng là: " +
                req.headers.id +
                " Vui lòng kiểm tra lại tài khoản. Nêú có bất cứ thắc mắc vui lòng liên hệ số điện thoại hotline:1900566799. Xin chân thành cám ơn.",
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        );
        console.log(req.headers.id);
        dbcon.query(
          "update cnpm.ROOMTYPE set SO_PHONG_TRONG=SO_PHONG_TRONG-1 where ID_ROOMTYPE='" +
            req.headers.id_home +
            "'",
          function (err, result, filesd) {
            if (err) throw console.log(err);
            status = "success";
          }
        );
      });
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});
// router.post("/paymentweb", async (req, res) => {
//   let status, error;
//   // console.log("run");
//   const { stripeToken, stripeEmail, datetime, totalprice } = req.body;
//   console.log(stripeToken);

//   // console.log(datetime);
//   await Stripe.charges
//     .create({
//       source: stripeToken,
//       amount: 10000,
//       currency: "usd",
//     })
//     .then((charge) => {
//       connection.on("connect", function (err) {
//         // If no error, then good to proceed.
//         console.log("Connected");
//         var req = Request(
//           "update USER_SECURITY set Status_Delete=1 where EMAIL='" +
//             stripeEmail +
//             "'",
//           function (err, rowCount) {
//             if (err) {
//               console.log(err);
//             }
//           }
//         );
//         connection.execSql(req);
//       });
//       var mailOptions = {
//         from: "0938224718nguyen@gmail.com",
//         to: "01675359367nguyen@gmail.com",
//         subject: "Hóa Đơn Điện Tử",
//         text: "Thank For Your Pays and now you can download and watch video no ads",
//         html: "",
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });
//     });

//   res.json({ error, status });
// });
router.post("/payment", async (req, res) => {
  let status, error;

  console.log("run");
  const {
    token,
    token_cus,
    amount,
    roomid,
    datetime,
    ngaynhan,
    iduser,
    ngaytra,
    idpar,
    totalprice,
    lastprice,
    idvoucher,
    idgiff,
  } = req.body;
  console.log("IUD" + idpar);
  console.log(datetime);
  const headers = {
    user_id: iduser,
    partner_id: "580CAE3E-D445-4DC2-B197-50479B2CCA17",
    app_id: "vy04",
    "Access-Control-Allow-Origin": "*",
  };
  console.log(idgiff);
  if (idvoucher != "") {
    await axios({
      url: "https://api.votuan.xyz/api/v1/user/voucher/pre-order",
      method: "post",
      data: {
        code: idvoucher,
        typeVoucher: "APART",
        transactionId: uuidv4(),
        amount: lastprice,
      },
      headers,
    }).then((e) => {
      console.log(e.data.data.orderId);
      axios({
        url: "https://api.votuan.xyz/api/v1/user/voucher/state",
        method: "put",
        data: {
          typeVoucher: "APART",
          orderId: e.data.data.orderId,
        },
        headers,
      });
    });
  }
  if (idgiff != "") {
    await axios({
      url: "https://api.votuan.xyz/api/v1/user/gift-card/pre-order",
      method: "post",
      data: {
        code: idgiff,
        typeVoucher: "APART",
        transactionId: uuidv4(),
        amount: lastprice,
      },
      headers,
    }).then((e) => {
      console.log(e.data.data.orderId);
      axios({
        url: "https://api.votuan.xyz/api/v1/user/gift-card/state",
        method: "put",
        data: {
          typeVoucher: "APART",
          orderId: e.data.data.orderId,
        },
        headers,
      });
    });
  }

  try {
    await Stripe.charges
      .create({
        source: token.id,
        amount,
        currency: "usd",
      })
      .then((charge) => {
        dbcon.query(
          "INSERT INTO cnpm.HOA_DON (ID_HOA_DON,ID_USER,MA_DAT_CHO,ID_ROOMTYPE, PAY_TIME, SO_LUONG_PHONG, NGAY_NHAN_PHONG,NGAY_TRA_PHONG ,BOOK_TYPE,  TOTAL_PRICE , FINAL_PRICE,HD_STATUS )VALUES ('" +
            charge.id +
            "','" +
            iduser +
            "','" +
            idpar +
            "','" +
            roomid +
            "', '" +
            datetime +
            "',1, '" +
            ngaynhan +
            "','" +
            ngaytra +
            "' ,0," +
            totalprice +
            "," +
            lastprice +
            ",1);",
          function (err, result, filesd) {
            if (err) throw console.log(err);
            // axios({
            //   url: "https://gxyvy04g01backend-production.up.railway.app/Customer/insertTransicationAndPP",
            //   method: "post",
            //   data: {
            //     TOKEN: token_cus,
            //     END_DATE: ngaynhan,
            //     TRANSACTION_VALUE: lastprice,
            //     DATE_TRANSACTION: datetime,
            //     APP_ID: "APART",
            //     PARTNER_ID: "PAR1",
            //     INFO_TRANSACTION: "dm hoang",
            //   },
            // });

            var mailOptions = {
              from: "0938224718nguyen@gmail.com",
              to: "01675359367nguyen@gmail.com",
              subject: "Hóa Đơn Điện Tử",
              text:
                "Ngày nhận phòng:+" +
                ngaynhan +
                " Ngày trả phòng:" +
                ngaytra +
                " Số tiền thanh toán:" +
                lastprice,
              html: "",
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        );
        dbcon.query(
          "update cnpm.ROOMTYPE set SO_PHONG_TRONG=SO_PHONG_TRONG+1 where ID_ROOMTYPE='" +
            roomid +
            "'",
          function (err, result, filesd) {
            if (err) throw console.log(err);
            status = "success";
          }
        );
      });
  } catch (error) {
    console.log(error);
    status = "Failure";
  }

  res.json({ error, status });
});
router.get("/cardholder", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  console.log(amount);
  try {
    await Stripe.issuing.cardholders.create({
      name: "dophamnguyen",
      email: "01675359367nguyen@gmail.com",
      phone_number: "+18008675309",
      status: "active",
      type: "individual",
      billing: {
        address: {
          line1: "123 Main Street",
          city: "San Francisco",
          state: "CA",
          postal_code: "94111",
          country: "US",
        },
      },
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});
router.post("/sophong-update/:id", (req, res) => {
  dbcon.query(
    "update cnpm.sophong set id_home='" +
      req.body.id_sophong +
      "',ten_phong='" +
      req.body.name +
      "'loai_phong='" +
      req.body.loaiphong +
      "'loai_giuong='" +
      req.body.loaigiuong +
      "',so_nguoi='" +
      req.body.songuoi +
      "',an_sang='" +
      req.body.ansang +
      "',so_phong='" +
      req.body.sophong +
      "' where id_home='" +
      req.params.id +
      "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
// router.delete("/sophong/:id", (req, res) => {
//   console.log("update cnpm.home where id_home='" + req.params.id + "'");
//   dbcon.query(
//     "update cnpm.home set status=false where id_home='" + req.params.id + "'",
//     function (err, result, filesd) {
//       if (err) throw console.log(err);
//       res.json(result);\roomtypes
//     }
//   );
// });

//contact

router.get("/contact/:id", (req, res) => {
  console.log("select * from cnpm.home where id_home='" + req.params.id + "'");
  dbcon.query(
    "select * from cnpm.contact where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});

router.post("/contact-add", (req, res) => {
  dbcon.query(
    "INSERT INTO cnpm.CONTACT(ID_HOME, FULL_NAME, EMAIL, MOLIBE_PHONE, ONLINE_24H)  VALUES ('" +
      req.body.idhome +
      "', '" +
      req.body.name +
      "', '" +
      req.body.email +
      "'," +
      req.body.phonenumber +
      "," +
      req.body.staus24h +
      " );",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});

//rule

router.get("/rules/:id", (req, res) => {
  dbcon.query(
    "select * from cnpm.quy_dinh_home where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.post("/rules-add", (req, res) => {
  dbcon.query(
    "INSERT INTO cnpm.quy_dinh_home(ID_HOME, quy_dinh)  VALUES ('" +
      req.body.idhome +
      "', '" +
      req.body.quydinh +
      "' );",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.delete("/rules/:id", (req, res) => {
  console.log(
    "update cnpm.quy_dinh_home where id_home='" + req.params.id + "'"
  );
  dbcon.query(
    "update cnpm.home set status=false where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});

//serch
router.get("/home_create", (req, res) => {
  const id = uuidv4().substring(0, 10);
  dbcon.query(
    "INSERT INTO cnpm.HOME  VALUES ('" +
      id +
      "','DD21','" +
      req.headers.id +
      "', '" +
      req.headers.name +
      "', " +
      req.headers.area +
      "," +
      req.headers.floor +
      ",'" +
      req.headers.description +
      "', ' req.headers.policy','" +
      req.headers.adress +
      "');",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      dbcon.query(
        "INSERT INTO cnpm.LINK_HINH(ID_HOME  , LINK  ) VALUES ('" +
          id +
          "', '" +
          req.headers.link +
          "')",
        function (err, result, filesd) {
          if (err) throw console.log(err);
          res.json({ id: id });
        }
      );
    }
  );
});
router.get("/room_create", (req, res) => {
  console.log(uuidv4().substring(0, 10));
  console.log(req.headers);
  const id = uuidv4().substring(0, 10);
  dbcon.query(
    "insert into cnpm.ROOMTYPE value ('" +
      id +
      "','" +
      req.headers.id_home +
      "'," +
      req.headers.so_phong_trong +
      ",'" +
      req.headers.ten_phong +
      "','giuong doi'," +
      req.headers.so_nguoi +
      "," +
      req.headers.maximum_extra_beds +
      "," +
      req.headers.price_of_extra_bed +
      ",4545,454544,0,'" +
      req.headers.tien_nghi +
      "'," +
      req.headers.price_phong +
      ")",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      dbcon.query(
        "INSERT INTO cnpm.LINK_HINH(ID_ROOMTYPE  , LINK  ) VALUES ('" +
          id +
          "', '" +
          req.headers.link +
          "')",
        function (err, result, filesd) {
          if (err) throw console.log(err);
          res.json({ id: id });
        }
      );
    }
  );
});
router.get("/search", (req, res) => {
  dbcon.query(
    "select * from cnpm.DIA_DIEM_SEARCH",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.get("/search_home", (req, res) => {
  console.log(req.headers.id);
  const query =
    "select * from cnpm.HOME,(select ROOMTYPE.ID_HOME , ROOMTYPE.PRICE_PHONG from cnpm.ROOMTYPE group by ROOMTYPE.ID_HOME) price,(select HOME.ID_HOME,LINK_HINH.LINK from cnpm.HOME,cnpm.LINK_HINH where HOME.ID_HOME=LINK_HINH.ID_HOME) linkhinh ,(select HOME.ID_HOME,sum(SO_PHONG_TRONG) as sophong,sum(SO_NGUOI) as songuoi from cnpm.HOME, cnpm.ROOMTYPE where HOME.ID_HOME=ROOMTYPE.ID_HOME  group by HOME.ID_HOME) soluong where soluong.ID_HOME=HOME.ID_HOME and price.ID_HOME=HOME.ID_HOME and linkhinh.ID_HOME=HOME.ID_HOME and ID_DIA_DIEM='" +
    req.headers.id +
    "' and soluong.songuoi*soluong.sophong>" +
    req.headers.songuoi +
    " and sophong>" +
    req.headers.sophong;
  console.log(query);
  dbcon.query(query, function (err, result, filesd) {
    if (err) throw console.log(err);
    console.log(query);
    res.json(result);
  });
});
router.get("/detailhome", (req, res) => {
  console.log(req.headers.id);

  dbcon.query(
    " select HOME.ID_HOME,HOME.TEN,HOME.DIA_CHI,Max(price.PRICE) as oldprice,min(price.PRICE) as finalprice from cnpm.home,cnpm.price,cnpm.roomtype,cnpm.dia_diem_search where dia_diem_search.ID_DIA_DIEM=home.ID_DIA_DIEM and home.ID_HOME=roomtype.ID_HOME and price.ID_ROOMTYPE=roomtype.ID_ROOMTYPE and home.ID_HOME='" +
      req.headers.id +
      "'  group by HOME.TEN",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      console.log(result);
      res.json(result);
    }
  );
});
router.get("/roomtypes", (req, res) => {
  console.log(req.headers.id);
  var queey =
    "select * from cnpm.ROOMTYPE,cnpm.HOME,cnpm.LINK_HINH where LINK_HINH.ID_ROOMTYPE=ROOMTYPE.ID_ROOMTYPE and HOME.ID_HOME=ROOMTYPE.ID_HOME and HOME.ID_HOME='" +
    req.headers.id +
    "'";
  dbcon.query(queey, function (err, result, filesd) {
    if (err) throw console.log(err);
    console.log(result);
    res.json(result);
  });
});
router.get("/Facilityhome", (req, res) => {
  console.log(req.headers.id);

  dbcon.query(
    "select * from cnpm.tien_nghi,cnpm.loai_tien_nghi,cnpm.de_xuat_tien_nghi where tien_nghi.id_loai_tien_nghi=loai_tien_nghi.id_loai_tien_nghi and de_xuat_tien_nghi.id_tien_nghi=tien_nghi.id_tien_nghi and de_xuat_tien_nghi.id_home='" +
      req.headers.id +
      "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      const element = [];

      for (let index = 0; index < result.length; index++) {
        console.log(result[index]);
      }
      res.json(result);
    }
  );
});
//xem danh gia

router.get("/evaluate/:id", (req, res) => {
  dbcon.query(
    "select * from cnpm.danh_gia where id_home='" + req.params.id + "'",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});

router.post("/evaluate/:id", (req, res) => {
  dbcon.query(
    "INSERT INTO DANH_GIA VALUES ('" +
      req.body.id_khachhang +
      "'," +
      req.body.diem +
      ", '" +
      req.body.binhluan +
      "','dg06','" +
      req.body.id_home +
      "');",
    function (err, result, filesd) {
      if (err) throw console.log(err);
      res.json(result);
    }
  );
});
router.get("/student", (req, res) => {
  dbcon.query("select * from cnpm.student", function (err, result, filesd) {
    if (err) throw console.log(err);
    res.json(result);
  });
});

//Lich su dat
module.exports = router;
