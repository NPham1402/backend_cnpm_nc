var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe")(
  "sk_test_51KysBGC4c4me30BTVBplfmcTH4bvtHZQiMh1cbwZZ5cgpYIyRhj1QESuxAu6VVD0kIk2Y7CxBVP6tfoUHkc4odBe008u6aKt4e"
);
var dbcon = require("./connection_config");
/* GET home page. */

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: "0938224718nguyen@gmail.com",
    pass: "0938224718",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Home

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
  dbcon.query(
    "SELECT * FROM cnpm.HOA_DON where ID_USER='CUS1' And HD_STATUS=1 ",
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
router.get("/refund", async (req, res) => {
  let status, error;
  try {
    await Stripe.refunds.create({
      charge: req.headers.id,
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});
router.post("/payment", async (req, res) => {
  let status, error;
  console.log("run");
  const {
    token,
    amount,
    roomid,
    datetime,
    ngaynhan,
    ngaytra,
    totalprice,
    lastprice,
  } = req.body;
  console.log(datetime);
  try {
    await Stripe.charges
      .create({
        source: token.id,
        amount,
        currency: "usd",
      })
      .then((charge) => {
        dbcon.query(
          "INSERT INTO cnpm.HOA_DON (ID_HOA_DON,ID_USER ,ID_ROOMTYPE, PAY_TIME, SO_LUONG_PHONG, NGAY_NHAN_PHONG,NGAY_TRA_PHONG ,BOOK_TYPE,  TOTAL_PRICE , FINAL_PRICE,HD_STATUS )VALUES ('" +
            token.id +
            "','CUS1','" +
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
        status = "success";
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
  console.log(uuidv4().substring(0, 10));
  res.json({ id: uuidv4().substring(0, 10) });
  // dbcon.query(
  //   "INSERT INTO cnpm.HOME  VALUES ('" +
  //     uuidv4().substring(0, 10) +
  //     "','DD22','PN2', '" +
  //     req.headers.name +
  //     "', " +
  //     req.headers.area +
  //     "," +
  //     req.headers.floor +
  //     ",'" +
  //     req.headers.description +
  //     "', ' req.headers.policy','" +
  //     req.headers.adress +
  //     "');",
  //   function (err, result, filesd) {
  //     if (err) throw console.log(err);
  //     res.json({ id: uuidv4().substring(0, 10) });
  //   }
  // );
});
router.get("/room_create", (req, res) => {
  console.log(uuidv4().substring(0, 10));
  console.log(req.headers.id_home);
  dbcon.query(
    "insert into cnpm.ROOMTYPE value ('" +
      uuidv4().substring(0, 10) +
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
      res.json({ id: uuidv4().substring(0, 10) });
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
    "select * from cnpm.HOME,(select ROOMTYPE.ID_HOME , Max(PRICE.PRICE) as oldprice,min(PRICE.PRICE) as finalprice from cnpm.PRICE,cnpm.ROOMTYPE where  PRICE.ID_ROOMTYPE=ROOMTYPE.ID_ROOMTYPE group by ROOMTYPE.ID_HOME) price,(select HOME.ID_HOME,LINK_HINH.LINK from cnpm.HOME,cnpm.LINK_HINH where HOME.ID_HOME=LINK_HINH.ID_HOME) linkhinh ,(select HOME.ID_HOME,sum(SO_PHONG_TRONG) as sophong,sum(SO_NGUOI) as songuoi from cnpm.HOME, cnpm.ROOMTYPE where HOME.ID_HOME=ROOMTYPE.ID_HOME  group by HOME.ID_HOME) soluong where soluong.ID_HOME=HOME.ID_HOME and price.ID_HOME=HOME.ID_HOME and linkhinh.ID_HOME=HOME.ID_HOME and ID_DIA_DIEM='" +
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
    "select * from cnpm.ROOMTYPE,cnpm.HOME where HOME.ID_HOME=ROOMTYPE.ID_HOME and HOME.ID_HOME='" +
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
