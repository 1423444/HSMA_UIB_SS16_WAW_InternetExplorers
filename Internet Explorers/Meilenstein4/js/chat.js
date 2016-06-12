/*
 * chat.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 07. June 2016
 */

const socket = io();

do {
	var name = prompt('Willkommen, bitte gebe deinen Usernamen ein: ', '');
} while (name == '' || name == null);

alert('Willkommen ' + name);

$('form').submit(() => {
	socket.emit('chat message', name + ': ' + $('#inputMessage').val());
    $('#inputMessage').val('');
    return false;
});

socket.on('chat message', (msg) => {
	$('#messages').append($('<li>').text(msg));
});