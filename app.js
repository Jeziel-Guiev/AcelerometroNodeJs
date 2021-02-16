'use strict'

const express=require('express');
const mqtt=require('mqtt');
const app=express();
const server=require('http').Server(app);
const io=require('socket.io')(server);

var modelAcel=require('./models/acelerometro');

const optionsub={
    retain:true,
    qos:2

};

const client=mqtt.connect('mqtt://128.199.13.12');//,{username:'josue', password:'password1234'});
const clientX=mqtt.connect('mqtt://128.199.13.12');
const clientY=mqtt.connect('mqtt://128.199.13.12');
const clientZ=mqtt.connect('mqtt://128.199.13.12');

var axisX=0;
var axisY=0;
var axisZ=0;


client.on('connect', function () {
    clientX.subscribe('/ejeX', function (err) {
      if (!err) {
        clientX.on('message', async function (topic, message1) {
               var con=message1.toString().split("");
               var sli=con.splice(5);
               axisX=parseInt(sli.join(""));
            console.log(axisX)

    
          })

      } 
    })
    clientY.subscribe('/ejeY', function (err) {
      if (!err) {
        clientY.on('message', async function (topic, message1) {
               var con=message1.toString().split("");
               var sli=con.splice(5);
               axisY=parseInt(sli.join(""));
               console.log(axisY)
            
          })
      } 
    })
    clientZ.subscribe('/ejeZ', function (err) {
      if (!err) {
        clientZ.on('message', async function (topic, message1) {
               var con=message1.toString().split("");
               var sli=con.splice(5);
               axisZ=parseInt(sli.join(""));
               console.log(axisZ)
               console.log(axisX+" "+axisY+" "+axisZ);
               const acelerometro= new modelAcel({
                axyz:[axisX,axisY,axisZ]
              })
               await acelerometro.save();
            
          })
      } 
    })


  })





module.exports=app;