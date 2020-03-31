var path = require("path");
const fs = require("fs")
let newVendorReceived = require('./newuser.json');

module.exports = function (app) {
    app.post("/api/newuser", function (req, res) {
        console.log("yes can post") //didn't log
        newVendorReceived = JSON.stringify(req.body.newVendor); //get new note into newNoteReceived
        console.log("req.body is :" + JSON.stringify(req.body)); //logs!
        // res.send("received, thanks")
        // notedatabase.push(req.body);
        // console.log(notedatabase)
        res.json(true)
        // notedatabaseString = JSON.stringify(notedatabase)
        var filename = req.body.newVendor + ".js"; //name of file based on newVendor name.
        fs.writeFile(filename, `
        
        // App.js

import React, { useState, useEffect } from 'react';
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import Navy from './components/Navy'
import Vendorsdb from './Vendorsdb.json'

import './index.css';

const Messages = props => props.data.map(m => m[0] !== '' ? (<li><strong>{m[0]}</strong> : <div className="innermsg">{m[1]}</div></li>) : (<li className="update">{m[1]}</li>));

const Online = props => props.data.map(m => <li id={m[0]}>{m[1]}</li>)

export default () => {
  const [id, setId] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [room, setRoom] = useState('');
  const [input, setInput] = useState('');

  const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');
  socket.connect();

  const [messages, setMessages] = useImmer([]);

  const [online, setOnline] = useImmer([]);

  useEffect(() => {
    socket.on('message que', (nick, message) => {
      setMessages(draft => {
        draft.push([nick, message])
      })
    });

    socket.on('update', message => setMessages(draft => {
      draft.push(['', message]);
    }))

    socket.on('people-list', people => {
      let newState = [];
      for (let person in people) {
        newState.push([people[person].id, people[person].nick]);
      }
      setOnline(draft => { draft.push(...newState) });
      console.log(online)
    });

    socket.on('add-person', (nick, id) => {
      setOnline(draft => {
        draft.push([id, nick])
      })
    })

    socket.on('remove-person', id => {
      setOnline(draft => draft.filter(m => m[0] !== id))
    })

    socket.on('chat message', (nick, message) => {
      setMessages(draft => { draft.push([nick, message]) })
    })
  }, 0);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("Name can't be empty");
    }
    setId(nameInput);
    socket.emit("join", nameInput, room);
  };

  const handleSend = e => {
    e.preventDefault();
    if (input !== '') {
      socket.emit('chat message', input, room);
      setInput('');
    }

  }

  return id ? (
    <section style={{ display: 'flex', flexDirection: 'row' }} >


      <ul id="messages"><Messages data={messages} /></ul>
      <ul id="online"> 🌐 : <Online data={online} /> </ul>
      <div id="sendform">
        <form onSubmit={e => handleSend(e)} style={{ display: 'flex' }}>
          <input id="m" onChange={e => setInput(e.target.value.trim())} /><button style={{ width: '75px' }} type="submit">Send</button>
        </form>
      </div>
    </section>
  ) : (
      <div>
        <Navy vendorsdb={Vendorsdb} />
        <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>


          <h1>${newVendorReceived}'s</h1>
          <h2> yellowchat room</h2>
          <form onSubmit={event => handleSubmit(event)}>

            <input id="name" onChange={e => setNameInput(e.target.value.trim())} required placeholder="What is your name .." /><br />
            <input id="room" onChange={e => setRoom(e.target.value.trim())} placeholder="What is your room .." /><br />
            <button type="submit">Submit</button>
          </form>
          <br></br>
          <center><div>${newVendorReceived} Blog</div></center>
        </div>

      </div>
    );
};        
        `
            , function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success!");

            });



    });

    app.get("/api/newuser", function (req, res) {
        // var parsedData = Object.create(null)


        // res.json(JSON.parse(data))
        console.log("yep can get");
        res.json(true)
    });

}