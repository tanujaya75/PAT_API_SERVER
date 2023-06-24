const { Console } = require('console');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
const { userInfo } = require('os');
const { query } = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');


var app = express();
app.use(bodyparser.json());



const conn = mysql.createConnection({
    host : 'localhost',
    user : 'Edward',
    password : '*****',
    database : 'PAT'
});



conn.connect(function(err){
    if (err) throw err;
    console.log("Mysql connected...........");
});



app.post('/RegisterDekstop', function(req,res){
    
    JSON.getInt
    let data = {email: req.body.Email,
        username: req.body.Username, 
        password: req.body.Password,
        role: req.body.Role};
    

    let doublecheck = "SELECT Username, Email FROM Userinfo WHERE Username = '"+data.username+"' AND Email = '"+data.email+"' AND Role = '"+data.role+"'";
    let doublechecker = conn.query(doublecheck, data,function(error,doubleresult){
        if (error) throw error;
        if(doubleresult == ""){
        let sql = "INSERT INTO Userinfo SET ?";
        
        let query = conn.query(sql, data , function(err,result){
            if (err) throw err;
            res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response" : "Berhasil Menambahkan User"
                }
            ));
            console.log('Berhasil Registrasi');
        });

        }
        else if(doubleresult != ""){
            let notif = "SELECT * FROM Userinfo WHERE Username = '"+data.username+"' OR Email = '"+data.email+"' ";
            let notifier = conn.query(notif, function(err, resnotif){
            res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response": "User Sudah Terdaftar"
                }
            ));
            console.log('Username atau Email Sudah Terdaftar!!!');
            });
        }
    });
   
 });

 app.post('/RegisterAndroid', function(req,res){
    
    JSON.getInt
    let data = {email: req.body.Email,
        username: req.body.Username, 
        password: req.body.Password,
        role: 'User'};
    

    let doublecheck = "SELECT Username, Email FROM Userinfo WHERE Username = '"+data.username+"' AND Email = '"+data.email+"' AND Role = '"+data.role+"'";
    let doublechecker = conn.query(doublecheck, data,function(error,doubleresult){
        if (error) throw error;
        if(doubleresult == ""){
        let sql = "INSERT INTO Userinfo SET ?";
        
        let query = conn.query(sql, data , function(err,result){
            if (err) throw err;
            res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response" : result,
                    "Message" : "Berhasil Registrasi"
                }
            ));
            console.log('Berhasil Registrasi');
        });

        }
        else if(doubleresult != ""){
            let notif = "SELECT * FROM Userinfo WHERE Username = '"+data.username+"' OR Email = '"+data.email+"' ";
            let notifier = conn.query(notif, function(err, resnotif){
            res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response": resnotif,
                    "Message" : "Username atau Email Sudah Terdaftar!!!"
                }
            ));
            console.log('Username atau Email Sudah Terdaftar!!!');
            });
        }
    });
   
 });


global.logstat = false;
 app.post('/Login', function(req,res){
    let data = {username: req.body.Username, 
                password: req.body.Password,
                role: req.body.Role};
    let checkrole = "SELECT Username, Password, Role FROM Userinfo WHERE Username = '"+data.username+"' AND Password = '"+data.password+"' AND Role = '"+data.role+"'";
    let rolechecker = conn.query(checkrole, data,function(err, roletype){
        if (err) throw err;
        if (roletype != "" && logstat != true){
        // let rolses = JSON.stringify(roletype.map((row) => row.Role));
        //let rolses = roletype.map((row) => row.Role);
        let rolses = toString(roletype[0].Role);
        
        
        global.username = data.username;
        global.password = data.password;
        global.role = data.role;
        let cekrl = toString(role);
        console.log(roletype);
        console.log(rolses);
        console.log(role);
        if (rolses == cekrl){
       
        logstat = true;
       
        console.log(logstat);
            //res.send('Login Berhasil');
            if(role == 'Admin'){
                global.rl = 0;
            }
            else if(role == 'Operator'){
                global.rl = 1;
            } 
            
            else if(role == 'User'){
                global.rl = 2;
            } 

            if (role == 'Admin')
            {
            res.send(JSON.stringify(
            {
                "Username": username,
                "Password": password,
                "Role": 0,
                "Message" : "Selamat Datang Admin!!!"
            }
            )); //Admin
            }
            else if(role == 'Operator')
            {
            res.send(JSON.stringify(
                {
                    "Username": username,
                    "Password": password,
                    "Role": 1,
                    "Message" : "Selamat Datang Operator!!!"
                }
            )); //Operator
            }
            else if(role == 'User'){
            res.send(JSON.stringify(
                {
                    "Username": username,
                    "Password": password,
                    "Role": 2,
                    "Message" : "Selamat Datang !!!"
                }
            )); //User
            }
        }
        else if(rolses != cekrl){
            logstat = false;
            res.send('Role Anda Salah!');
        }
        }
        else if(roletype!="" && logstat == true){
            res.send(JSON.stringify(
                {   
                    "Username": username,
                    "Password": password,
                    "Message":"Anda Sudah Login Sebagai "+role,
                    "Role": rl
                }
            ));
        }
        else{
            res.send(JSON.stringify(
                {
                    "Username": null,
                    "Password": null,
                    "Message": "Login Gagal!!",
                    "Role": null
                }
            ));
        }
  
      
    });
 });

 app.post('/AddUser', function(req,res){
    
    let data = {username: req.body.Username, 
        password: req.body.Password,
        role: req.body.Role};
    let data2 ={email2: req.body.Email2,
        username2: req.body.Username2, 
        password2: req.body.Password2,
        role2: req.body.Role2};

    if ((data.username != null || data.username !="") && (data.password != null || data.password !="") && (data.role =="Admin")){
       
    let doublecheck = "SELECT Username, Email FROM Userinfo WHERE Username = '"+data2.username2+"' AND Email = '"+data2.email2+"' AND Role = '"+data2.role2+"'";
    let doublechecker = conn.query(doublecheck, data2,function(error,doubleresult){
        if (error) throw error;
        if(doubleresult == ""){
        let sql = "INSERT INTO Userinfo(Email, Username, Password, Role) VALUES('"+data2.email2+"','"+data2.username2+"','"+data2.password2+"','"+data2.role2+"')";
        
        let query = conn.query(sql, function(err,result){
            if (err) throw err;
            res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response" : "Berhasil Registrasi!!"
                }
            ));
            console.log('Berhasil Registrasi');
        });

        }
        else if(doubleresult != ""){
            let notif = "SELECT * FROM Userinfo WHERE Username = '"+data2.username2+"' OR Email = '"+data2.email2+"' ";
            let notifier = conn.query(notif, function(err, resnotif){
            res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response": "Username atau Email Sudah Terdaftar!!!"
                }
            ));
            console.log('Username atau Email Sudah Terdaftar!!!');
            });
        }
    });
    }
    else{
        res.send('Anda Bukan Admin!!!');
    }
 });

 app.post('/ShowUser', function(req,res){
    let username = req.body.Username;
    let password = req.body.Password;
    let roles = req.body.Role;

    console.log(username);
    console.log(password);
    console.log(roles);

    if((username != null || username !="") && (password != null || password !="") && (roles =="Admin"))
    {
    let sql = "SELECT * FROM Userinfo";
    let query = conn.query(sql, function(err,result){
        if (err) throw err;
        
        console.log(logstat);
        res.send(JSON.stringify(
        {
            "status" : 200,
            "error" : null,
            "response" : result
        }
        ));
        console.log('Menampikan Data User'); 
    });
    }
    else{
        res.send(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : "Gagal Menampilkan Data User!!!"
            }))
    }
 });

 app.delete('/RemoveUser', function(req,res){
    let username = req.body.Username;
    let password = req.body.Password;
    let roles = req.body.Role;
    let uname = req.body.Username2;
    let passwd = req.body.Password2;
    let rls = req.body.Role2;
    console.log(username);
    console.log(password);
    console.log(roles);
    console.log(uname);
    console.log(passwd);
    console.log(rls);

    if ((username != null || username !="") && (password != null || password !="") && (roles =="Admin"))
    {
   
    let sql = "DELETE FROM Userinfo WHERE Username ='"+uname+"' AND Password ='"+passwd+"' AND Role ='"+rls+"'";
    let query = conn.query(sql, function(err,result){
        if (err) throw err;
        res.send(JSON.stringify(
                {
                    "status" : 200,
                    "error" : null,
                    "response" : "Akun Berhasil di Hapus!!!"
                }
        ))
        console.log('Akun Berhasil di Hapus');
    });
   }
    else{
        res.send(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : "Gagal Menghapus Akun!!!"
            }
        )) 
        console.log('Gagal Menghapus Akun!!!');
    }

 });

app.post('/EditUser', function(req,res){
    let data = {id: req.body.ID,
        email: req.body.Email,
        username: req.body.Username,
        password: req.body.Password,
        role: req.body.Role};
    let data2 = {username2: req.body.Username2,
                password2: req.body.Password2,
                roles: req.body.Role2};
    if ((data2.username2 != null || data2.username2 !="") && (data2.password2 != null || data2.password2 !="") && (data2.roles =="Admin")){
     
        let Edit = {};
        let sql = "SELECT * FROM Userinfo WHERE ID='"+data.id+"'";
        let query = conn.query(sql, data, function(err,result){
            if (err) throw err;
            Edit.Email = data.email;
            Edit.Username = data.username;
            Edit.Password = data.password;
            Edit.Role = data.role;
            if(result !=""){
                let sql = "UPDATE Userinfo SET? WHERE ID='"+data.id+"'";
                let query = conn.query(sql, Edit, function(err,result){
                    if (err) throw err;
                    res.send('Akun Berhasil di Edit!!!');
                    console.log('User Berhasil di Edit');
                })
            }
            else{
                    res.send('User Gagal diEdit!!!')
                    console.log('User Gagal diEdit!!!');
            }
        });
    }
    else{
        res.send(JSON.stringify(
        {
            "status" : 200,
            "error" : null,
            "response" : "User Gagal diEdit!!!"
        }
        )) 
        console.log('User Gagal diEdit!!!');
    }

});

app.post('/Listparkiran',function(req,res){
    let usname = req.body.Username;
    let roles = req.body.Role;
    console.log(usname);
    console.log(roles);
    
    if((usname != null || usname != "") && (roles == 'Admin' || roles == 'Operator' || roles == 'User')){
        let data = {};
        data.Username = usname;
        let sql = "SELECT ID FROM Userinfo WHERE Username='"+data.Username+"'";
        let query = conn.query(sql, data, function(err,result){
            if(err) throw err;
            if (result != ""){
            let sql = "SELECT * FROM Listparkiran1";
            let query = conn.query(sql, data, function(err,result){
                res.send(result);
            })
            }
        });
    }
    else{
        res.send('Anda Belum Login!!!');
    }
});

app.post('/Listparkiran2',function(req,res){
    let usname = req.body.Username;
    let roles = req.body.Role;
    console.log(usname);
    console.log(roles);
    
    if((usname != null || usname != "") && (roles == 'Admin' || roles == 'Operator' || roles == 'User')){
        let data = {};
        data.Username = usname;
        let sql = "SELECT ID FROM Userinfo WHERE Username='"+data.Username+"'";
        let query = conn.query(sql, data, function(err,result){
            if(err) throw err;
            if (result != ""){
            let sql = "SELECT LahanParkir FROM Listparkiran1 WHERE Status = 0";
            let query = conn.query(sql, data, function(err,result){
                res.send(result);
            })
            }
        });
    }
    else{
        res.send('Anda Belum Login!!!');
    }
});

app.post('/DaftarKendaraan', function(req,res){
        let kendaraan = {};
        kendaraan.Jenis = req.body.Jenis;
        kendaraan.PlatNomor = req.body.PlatNomor;
        let data = {};
        data.username = req.body.Username;
        data.password = req.body.Password;
        data.roles = req.body.Role;

    if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && data.roles == 'User'){  
        let sql = "SELECT ID FROM Userinfo WHERE Username= '"+data.username+"' AND Password= '"+data.password+"'";
        let query = conn.query(sql, data, function(err,result){
            if (err) throw err;
            const id_user = parseInt(result.map((row) => row.ID));
            kendaraan.ID_User = id_user;
            console.log(id_user);
            if (result != ""){
            let sql = "INSERT INTO Kendaraan SET?";
            let query = conn.query(sql, kendaraan, function(err,result){
                res.send('Kendaraan Berhasil diTambahkan');
            });
            }
        });
        
    }
    else{
        res.send('Anda Bukan User');
    }
});

app.post('/Kendaraan', function(req,res){
   
    let data = {};
    data.username = req.body.Username;
    data.password = req.body.Password;
    data.roles = req.body.Role;

if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && data.roles == 'User'){  
    let sql = "SELECT ID FROM Userinfo WHERE Username= '"+data.username+"' AND Password= '"+data.password+"'";
    let query = conn.query(sql, data, function(err,result){
        if (err) throw err;
        const id_user = parseInt(result.map((row) => row.ID));
        let kendaraan = {};
        kendaraan.ID_User = id_user;
        console.log(id_user);
        if (result != ""){
        let sql = "SELECT Jenis, PlatNomor FROM Kendaraan WHERE ID_User='"+kendaraan.ID_User+"'";
        let query = conn.query(sql, kendaraan, function(err,result){
            res.send(JSON.stringify(
                {
                "Respon": result,
                "Message": "Menampilkan Data Kendaraan!!!"
                }
            ));
        });
        }
    });
    
}
else{
    res.send('Anda Bukan User');
}
});



app.post('/Booking',function(req,res){
    let data = {};
        data.username = req.body.Username;
        data.password = req.body.Password;
        data.roles = req.body.Role;
        data.parkiran = req.body.Parkiran;
        data.kendaraan = req.body.Jenis;
        data.plat = req.body.PlatNomor;
    if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && data.roles == 'User'){
        
        data.status = 1;
        let sql = "SELECT * From Userinfo WHERE Username='"+data.username+"' AND Password='"+data.password+"'";
        let query = conn.query(sql, data, function(err,result){
            const iduser = parseInt(result.map((row) => row.ID));

            let sql = "SELECT * FROM Listparkiran1 WHERE LahanParkir ='"+data.parkiran+"'";
            let query = conn.query(sql, function(err,result){

                const idpark = parseInt(result.map((row) => row.ID_Parkiran));
                const statuspark = parseInt(result.map((row) => row.Status));

                let sql = "SELECT * FROM Kendaraan WHERE Jenis='"+data.kendaraan+"' AND PlatNomor='"+data.plat+"'";
                let query = conn.query(sql, data, function(err,result){

                    const idkend = parseInt(result.map((row) => row.ID_Kendaraan));

                    let sql = "SELECT * FROM Booking WHERE ID_User = '"+iduser+"' ORDER BY ID_Booking DESC LIMIT 1";
                    let query = conn.query(sql, function(err,result){
                    const bookiduser = parseInt(result.map((row) => row.ID_User));
                    const bookstat = parseInt(result.map((row) => row.Status));
                    console.log(bookstat);
                    if ((statuspark==0 && bookstat!=1 && bookstat!=2 && bookiduser==null && bookstat == "") || (statuspark==0 && bookstat!=1 && bookstat!=2 && bookiduser!=null && bookstat !="")){
                        let sql = "INSERT INTO Booking(Parkiran, Kendaraan, ID_User, Status) VALUES ('"+idpark+"', '"+idkend+"', '"+iduser+"', '"+data.status+"')";
                        let query = conn.query(sql,function(err,result){
                            let sql = "UPDATE Listparkiran1 SET Status=1 WHERE ID_Parkiran='"+idpark+"'";
                            let query = conn.query(sql, function(err,result){
                                res.send(JSON.stringify({
                                    "Status": "Berhasil Booking !!!"
                                }));
                            });
                        });
                    }
                    else if(statuspark == 1 && bookstat == 1){
                        res.send(JSON.stringify({
                            "Status": "Sudah Terbooking !!!"
                        }));
                    }
                    });
                });
            });
        });
    }
    else{
        res.send('Anda Bukan User'); 
    }
});

app.post('/ShowBookingId', function(req,res){
   
    let data = {};
    data.username = req.body.Username;
    data.password = req.body.Password;
    data.roles = req.body.Role;

if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && data.roles == 'User'){  
    let sql = "SELECT ID FROM Userinfo WHERE Username= '"+data.username+"' AND Password= '"+data.password+"'";
    let query = conn.query(sql, data, function(err,result){
        if (err) throw err;
        const id_user = parseInt(result.map((row) => row.ID));
        var User_ID = parseInt(id_user)
        console.log(User_ID);
        if (result != ""){
        let sql = "SELECT ID_Booking FROM Booking WHERE ID_User='"+User_ID+"' AND Status = 1 ";
        let query = conn.query(sql, function(err,result){
            console.log(result);
            res.send(JSON.stringify(
                {
                "Respon": result,
                "Message": "Menampilkan Data Kendaraan!!!"
                }
            ));
        });
        }
    });
    
}
else{
    res.send('Anda Bukan User');
}
});

app.post('/Cancel', function(req,res){
    let data ={};
        data.username = req.body.Username;
        data.password = req.body.Password;
        data.roles = req.body.Role;
        data.bookingid = req.body.ID_Booking;
        data.kendaraan = req.body.Jenis;
        data.platnomor = req.body.PlatNomor;
    if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && data.roles == 'User'){
        

        let sql = "SELECT * FROM Booking WHERE ID_Booking='"+data.bookingid+"'";
        let query = conn.query(sql, data, function(err,result){
            const parkiran = parseInt(result.map((row) => row.Parkiran));
            const kend = parseInt(result.map((row) => row.Kendaraan));
            const useridbook = parseInt(result.map((row) => row.ID_User));
            const stat = parseInt(result.map((row) => row.Status));
            let sql = "SELECT ID_Kendaraan FROM Kendaraan WHERE Jenis='"+data.kendaraan+"' AND PlatNomor='"+data.platnomor+"'";
            let query = conn.query(sql, data, function(err,result){
                const idkendaraan = parseInt(result.map((row) => row.ID_Kendaraan));
                let sql = "SELECT ID FROM Userinfo WHERE Username='"+data.username+"' AND Password='"+data.password+"'";
                let query = conn.query(sql, data, function(err,result){
                    const iduseres = parseInt(result.map((row) => row.ID));
                    if (kend == idkendaraan && useridbook == iduseres && stat == 1){
                        let sql = "UPDATE Booking SET Status=3 WHERE ID_Booking='"+data.bookingid+"'";
                        let query = conn.query(sql, function(err,result){
                            let sql = "UPDATE Listparkiran1 SET Status=0 WHERE ID_Parkiran='"+parkiran+"'";
                            let query = conn.query(sql, function(err,result){
                                res.send('Berhasil Membatalkan Booking Anda!!!');
                                console.log(JSON.stringify({
                                    "Parkiran_ID": parkiran,
                                    "Kendaraan_ID": kend,
                                    "User_ID_IN_Book": useridbook,
                                    "Booking Status": stat,
                                    "Kendaraan_ID_IN_Kendaraan": idkendaraan,
                                    "ID_User_IN_Userinfo": iduseres
                                }));
                            });
                        });
                    }
                    else if(kend == idkendaraan && useridbook == iduseres && stat == 2){
                        res.send('Booking Anda Valid Sehingga Tidak Bisa diCancel!!!');
                    }
                    else{
                        res.send('Anda Belum Booking Sehingga Tidak Bisa diCancel!!!');
                    }

                });
            });
        });
    }
    else{
        res.send('Anda Bukan User !!!!');
    }
});
 
app.post('/Validation', function(req,res){
    let data = {};
        data.username = req.body.Username;
        data.password = req.body.Password;
        data.roles = req.body.Role;
        data.username2 = req.body.Username2;
        data.bookingid = req.body.ID_Booking;
        data.kendaraan = req.body.Jenis;
        data.platnomor = req.body.PlatNomor;

        if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && (data.roles == 'Admin' || data.roles == 'Operator')){

            let sql = "SELECT * FROM Booking WHERE ID_Booking='"+data.bookingid+"'";
            let query = conn.query(sql, data, function(err,result){

                const parkiran = parseInt(result.map((row) => row.Parkiran));
                const kend = parseInt(result.map((row) => row.Kendaraan));
                const useridbook = parseInt(result.map((row) => row.ID_User));
                const stat = parseInt(result.map((row) => row.Status));

                let sql = "SELECT ID_Kendaraan FROM Kendaraan WHERE Jenis='"+data.kendaraan+"' AND PlatNomor='"+data.platnomor+"'";
                let query = conn.query(sql, data, function(err,result){
                    const idkendaraan = parseInt(result.map((row) => row.ID_Kendaraan));
                    let sql = "SELECT ID FROM Userinfo WHERE Username='"+data.username2+"'";
                    let query = conn.query(sql, data, function(err,result){
                        const iduseres = parseInt(result.map((row) => row.ID));
                        if (kend == idkendaraan && useridbook == iduseres && stat == 1){
                            let sql = "UPDATE Booking SET Status=2 WHERE ID_Booking='"+data.bookingid+"'";
                            let query = conn.query(sql, function(err,result){
                                let sql = "UPDATE Listparkiran1 SET Status=2 WHERE ID_Parkiran='"+parkiran+"'";
                                let query = conn.query(sql, function(err,result){
                                    res.send('Booking Valid!!');
                                    console.log(JSON.stringify({
                                        "Parkiran_ID": parkiran,
                                        "Kendaraan_ID": kend,
                                        "User_ID_IN_Book": useridbook,
                                        "Booking Status": stat,
                                        "Kendaraan_ID_IN_Kendaraan": idkendaraan,
                                        "ID_User_IN_Userinfo": iduseres
                                    }));
                                });
                            });
                        }
                        else if(kend == idkendaraan && useridbook == iduseres && stat == 2){
                            res.send('Booking Sudah diValidasi!!');
                        }
                        else{
                            res.send('Belum Ada Booking Yang Bisa diValidasi!!!');
                        }
    
                    });
                });
            });
        }

});

app.post('/CheckOut', function(req,res){
    let data = {};
        data.username = req.body.Username;
        data.password = req.body.Password;
        data.roles = req.body.Role;
        data.username2 = req.body.Username2;
        data.bookingid = req.body.ID_Booking;
        data.kendaraan = req.body.Jenis;
        data.platnomor = req.body.PlatNomor;

        if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && (data.roles == 'Admin' || data.roles == 'Operator')){

            let sql = "SELECT * FROM Booking WHERE ID_Booking='"+data.bookingid+"'";
            let query = conn.query(sql, data, function(err,result){

                const parkiran = parseInt(result.map((row) => row.Parkiran));
                const kend = parseInt(result.map((row) => row.Kendaraan));
                const useridbook = parseInt(result.map((row) => row.ID_User));
                const stat = parseInt(result.map((row) => row.Status));

                let sql = "SELECT ID_Kendaraan FROM Kendaraan WHERE Jenis='"+data.kendaraan+"' AND PlatNomor='"+data.platnomor+"'";
                let query = conn.query(sql, data, function(err,result){
                    const idkendaraan = parseInt(result.map((row) => row.ID_Kendaraan));
                    let sql = "SELECT ID FROM Userinfo WHERE Username='"+data.username2+"'";
                    let query = conn.query(sql, data, function(err,result){
                        const iduseres = parseInt(result.map((row) => row.ID));
                        if (kend == idkendaraan && useridbook == iduseres && stat == 2){
                            let sql = "UPDATE Booking SET Status=4 WHERE ID_Booking='"+data.bookingid+"'";
                            let query = conn.query(sql, function(err,result){
                                let sql = "UPDATE Listparkiran1 SET Status=0 WHERE ID_Parkiran='"+parkiran+"'";
                                let query = conn.query(sql, function(err,result){
                                    res.send('Check Out Berhasil');
                                    console.log(JSON.stringify({
                                        "Parkiran_ID": parkiran,
                                        "Kendaraan_ID": kend,
                                        "User_ID_IN_Book": useridbook,
                                        "Booking Status": stat,
                                        "Kendaraan_ID_IN_Kendaraan": idkendaraan,
                                        "ID_User_IN_Userinfo": iduseres
                                    }));
                                });
                            });
                        }
                        else if(kend == idkendaraan && useridbook == iduseres && stat == 4){
                            res.send('Booking Sudah diCheckOut!!');
                        }
                        else{
                            res.send('Belum Ada Booking Yang Bisa diCheckOut!!!');
                        }
    
                    });
                });
            });
        }

});



app.post('/BookingHistory', function(req,res){
    let data = {};
        data.username = req.body.Username;
        data.password = req.body.Password;
        data.roles = req.body.Role;

        if ((data.username!=null || data.username!= "") && (data.password!=null || data.password!= "")  && (data.roles == 'Admin' || data.roles == 'Operator')){
            
            let sql = "SELECT ID_Booking, LahanParkir, Jenis, PlatNomor, Username, Booking.Status FROM Booking JOIN Userinfo ON Booking.ID_User = Userinfo.ID JOIN Listparkiran1 ON Booking.Parkiran = Listparkiran1.ID_Parkiran JOIN Kendaraan ON Booking.Kendaraan = Kendaraan.ID_Kendaraan WHERE Booking.Status IN (1, 2);";
            let query = conn.query(sql, function(err,result){
                if (err) throw err;
                res.send(result);
           
        });
    }
        
});

 app.get('/Logout', function(req,res){
    logstat = false;
    role = "";
    res.send('Berhasil Log Out');
 });

 
var server = app.listen(7000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host)
    console.log("Express app listening at http://%s:%s", host,port)

});
