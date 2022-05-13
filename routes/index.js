var express = require("express");
var router = express.Router();
var dbcon = require("./connection_config");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Home

router.get("/home", (req, res, next) => {
  console.log("nect");

  dbcon.query("select * from cnpm.contact", function (err, result, filesd) {
    if (err) throw console.log(err);
    console.log(result);
    res.json(result);
  });
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
//       res.json(result);
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
  let query =
    "select * from cnpm.HOME,(select roomtype.ID_home , Max(price.PRICE) as oldprice,min(price.PRICE) as finalprice from cnpm.PRICE,cnpm.ROOMTYPE where  price.ID_ROOMTYPE=roomtype.ID_ROOMTYPE group by ROOMTYPE.ID_home) price,(select HOME.ID_HOME,LINK_HINH.LINK from cnpm.HOME,cnpm.link_hinh where home.ID_HOME=link_hinh.ID_HOME) linkhinh ,(select HOME.id_home,sum(so_phong_trong) as sophong,sum(so_nguoi) as songuoi from cnpm.home, cnpm.roomtype where home.id_home=roomtype.id_home  group by home.id_home) soluong where soluong.id_home=home.id_home and price.id_home=home.id_home and linkhinh.id_home=home.id_home and ID_DIA_DIEM='" +
    req.headers.id +
    "' and soluong.songuoi*soluong.sophong>" +
    req.headers.songuoi +
    " and sophong>" +
    req.headers.sophong;
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
    "select * from cnpm.roomtype,cnpm.home where home.id_home=roomtype.id_home and home.ID_HOME='" +
    req.headers.id +
    "'";
  dbcon.query(queey, function (err, result, filesd) {
    if (err) throw console.log(err);
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
