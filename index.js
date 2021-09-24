const Discord = new require('discord.js');
const { Client, Util, MessageAttachment } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const client = new Discord.Client();
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const fs = require('fs');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();
myEmitter.setMaxListeners(20);

client.on('ready', () =>
{
    client.user.setActivity("// ?com | Servers: "+`${client.guilds.cache.size}` , {type: "PLAYING"})
    
    console.log(`El bot esta listo como: ${client.user.tag}`);
});

client.login(TOKEN);

client.on('warn', console.warn);

client.on('error', console.error);

client.on('shardDisconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('shardReconnecting', () => console.log('I am reconnecting'));

client.on('message', async message => 
{
	if (message.author.bot) return undefined;
    //if (!message.content.startsWith(PREFIX)) return undefined;
    
    if (message.author.bot) return;
    
    //recibiendo el mensaje
    //console.log(message.content);

    var parts = message.content.split(" "); 
 
    if (parts[0] === "?image") 
    {
        image(message, parts); 
    }

    if(message.content==='aea')
    {
        message.reply('calla mongol');
    }

    if(message.content==='AEA')
    {
        message.reply('calla mongol');
    }

    if(message.content==='?test')
    {
        message.channel.send('a bueno me das dos de asada');
    }

    if(message.content==='?com')
    {
        const com = new Discord.MessageEmbed()
        .setTitle("List of commands")
        .addField('**?com** ', 'Displays a list of commands')
        .addField('**?music**', 'Show the commands fot music')
        .addField('**hehe**', '( ͡° ͜ʖ ͡°)')
        .addField('**!padoru**', 'padoru')
        .addField('**!ciber**', 'ya vete del ciber')
        .addField('**yamete**', '( ͡° ͜ʖ ͡°)')
        .addField('**!simp @nombre**', 'etiqueta al simp simp')
        .addField('**?image <search>**', 'Search an image')
        .addField('**?test**', 'Just a random test')
        .addField('**?sInfo**', 'Displays the server info')
        .addField('**?uInfo **', 'Displays the user info')
        .addField('**?botInfo **', 'Displays my creator info')
        .setColor('#000000')
        message.channel.send(com);
    }

    if(message.content==='?music')
    {
        const music = new Discord.MessageEmbed()
        .setTitle('List of commands for music')
        .addField('**?play** link or song', 'Play music, you gotta put the link or the name of the song after the command')
        .addField('**?skip**', 'Skips the song playing')
        .addField('**?stop**', 'Stops the bot making him to leave and end the queue')
        .addField('**?volume**', 'Display the current volume and change it from 1-∞')
        .addField('**?np**', 'Shows the current song')
        .addField('**?queue**', 'Shows the queue of songs')
        .addField('**?pause**', 'Pause the current song')
        .addField('**?resume**', 'Resume the paused song')
        .setColor('#000000')
        message.channel.send(music);
    }

    if(message.content === '?botInfo')
    {
        const botInfo = new Discord.MessageEmbed()
        .setTitle("My creator's info")
        .addField('**Discord:**', `<@208399600082485259>`, true)
        .addField('**Youtube Channel:**', 'https://www.youtube.com/channel/UCxcf6ab8YfIgqi3qGc6jRaw', true)
        .addField('**My Steam:**', 'https://steamcommunity.com/id/Rogue22/')
        .addField('**My Twitch:**', 'https://www.twitch.tv/roguepow/')
        .addField('**Servers im in:**', `${client.guilds.cache.size}`)
        .setColor('#000000')
        message.channel.send(botInfo);
    }

    if(message.content==='?sInfo')
    {
        const Sinfo = new Discord.MessageEmbed()
        .setTitle('Server info')
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
        .addField('**Server Name:** ', `${message.guild.name}`, true)
        .addField('**Server Owner:** ', `${message.guild.owner}`, true)
        .addField('**Member Count: **', `${message.guild.memberCount}`, true)
        .addField('**Role Count: **', `${message.guild.roles.cache.size}`, true)
        .setFooter('-AngryDoge', client.user.displayAvatarURL())
        .setColor('#000000')
        message.channel.send(Sinfo);
    }

    if(message.content==='?uInfo')
    {
        const Uinfo = new Discord.MessageEmbed()
        .setTitle('User info')
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL())
        .addField('**Username:** ', `${message.author.username}`, true)
        .addField('**Discriminator:** ', `${message.author.discriminator}`, true)
        .addField('**ID: **', `${message.author.id}`, true)
        .addField('**Status: **', `${message.author.presence.status}`, true)
        .addField('**Account created at: **', `${message.author.createdAt}`, true)
        .setFooter('-AngryDoge', client.user.displayAvatarURL())
        .setColor('#14c90a')
        message.channel.send(Uinfo);
    }

    if(message.content==='?sociedad')
    {
        const sociedad = new Discord.MessageEmbed()
        .setTitle("Comandos de la sociedad")
        .addField('**?caldoso**', 'Comando')
        .addField('**?caldoso2**', 'Comando')
        .addField('**caldoso3**', 'Comando')
        .addField('**?d2caldoso** ', 'Comando')
        .addField('**?d2ivan** ', 'Comando')
        .addField('**?d2cris** ', 'Comando')
	    .addField('**?d2meco** ', 'Comando')
	    .addField('**?d2bonilla** ', 'Comando')
        .setColor('#000000')
        .setImage('https://cdn.discordapp.com/attachments/189246627029057536/664742021440864266/71585209_2500920553461747_2008545961395093504_n.png')
        message.channel.send(sociedad);
    }

    if(message.content==='?caldoso')
    {
        const caldoso = new Discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/189246627029057536/647626719305531403/8715a24fd920db19eef3d3ef34ebcbb4.png')
        message.channel.send(caldoso);
    }

    if(message.content==='?caldoso2')
    {
        const caldoso2 = new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/189246627029057536/740123912616017991/edf298094e391910f42f87817ce0e42c.png')
        message.channel.send(caldoso2);
    }

    if(message.content==='?caldoso3')
    {
        const caldoso3 = new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/189246627029057536/749052153363955773/c8e69ed8504a157dead22b46bfc3a9c8.png')
        message.channel.send(caldoso3);
    }

    if(message.content==='?d2caldoso')
    {
        const d2caldoso = new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/189246627029057536/664738627875766283/Los_dedos_culeros_del_caldoso.jpg')
        message.channel.send(d2caldoso);
    }
    
    if(message.content==='?d2ivan')
    {
        const d2ivan = new Discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/189246627029057536/664738694107758602/Los_dedos_de_vieja_del_ivan.png')
        message.channel.send(d2ivan);
    }

    if(message.content==='?d2cris')
    {
        const d2cris = new Discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/189246627029057536/663977450753228821/image0.jpg')
        message.channel.send(d2cris);
    }
    
    if(message.content==='?d2meco')
    {
        const d2meco = new Discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/189246627029057536/674191107353083915/DSC_0928.JPG')
        message.channel.send(d2meco);
    }

    if(message.content==='?d2bonilla')
    {
	const d2bonilla = new Discord.MessageEmbed()
	.setImage('https://media.discordapp.net/attachments/189246627029057536/737941175352164372/image0.jpg?width=508&height=677')
	message.channel.send(d2bonilla);
    }

    if(message.content.startsWith('!simp'))
    {
        const user = message.mentions.users.first();

        if(user)
        {
            const member = message.guild.member(user)

            if(member)
            {
                const attachment = new Discord.MessageAttachment('https://media.discordapp.net/attachments/692907922933547019/716545269990424586/IMG-20200530-WA0003.jpg');
                message.channel.send(`${user} pinche simp`, attachment);
                console.log('simp desde: ', `${message.guild}`);
            }
            else
            {
                message.channel.send("Ese wey no existe");
            }
            
        }
        else
        {
            message.reply("Tienes que mencionar a alguien");
        }
    }

    if(message.content==='!gf')
    {
        const gf=new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/401070235852996622/750163256974376960/6a1e88e4-9c2c-46e1-ac16-d8cc1277d158.png')
        message.channel.send(gf);
        console.log('gf desde: ', `${message.guild}`);
    }

    if(message.content==='!cochinos')
    {
        const cochinos=new Discord.MessageEmbed()
        .setTitle('Chingo a su madre')
        .setURL('https://twitter.com/smurrlewd/status/1357779557059821570?s=21&fbclid=IwAR2_wBEUoUr20EvG9Ynz_-B-bZOdlyE6INlD7wxEVQCtX0jqVYvIh50dxM8')
        .setImage('https://media.discordapp.net/attachments/771593325341835274/809613849111298088/Cochinear.jpg')
        message.channel.send(cochinos);
        console.log('cochinos desde: ', `${message.guild}`);
        //message.channel.send('https://cdn.discordapp.com/attachments/400914294100852757/877654336547749949/chingo_a_su_madre.mp4');
    }

    if(message.content === 'bblocura')
    {
        if(message.member.voice.channel)
        {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('https://www.youtube.com/watch?v=dzlPoKWT2n4', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('bblocura desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectate al canal qlo');
        }
    }
    
    if(message.content === 'bbcuri')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=PsUT6c6uGpE', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('bbcuri desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }
    
    if(message.content === '!ciber')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://youtu.be/VLzPI8Ea8Xg?t=10', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('ciber desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content === 'hehe')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=7NCO5wMelmg', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('hehe desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content === '!padoru')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=dQ_d_VKrFgM', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('padoru desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content === 'yamete')
    {
       if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=50bnHZLMqTI', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('yamete desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content.startsWith('te quiero'))
    {
       message.reply(`yo tambien`);
       console.log('te quiero desde: ', `${message.guild}`);
    }

    if(message.content === '!moyi')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=L8czknugFuA&feature=youtu.be', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('moyi desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if (message.content.startsWith('jarvis kickea a')) 
    {
        const user = message.mentions.users.first();
        if (user) 
        {
          const member = message.guild.members.resolve(user);
          if (member) 
          {
            member.send("https://discord.gg/a62TVUA");
            member
              .kick('por marico')
              .then(() => {
                message.channel.send(`Ahi nos vemos puerca ${user.tag}`);
                console.log('kick desde: ', `${message.guild}`)
              })
              .catch(err => {
                message.channel.send('No lo pude sacar :(');
                console.error(err);
              });
          } else {
            message.channel.send("El wey no esta en el server");
          }
        } else {
          message.channel.send("Menciona a alguien wey");
        }
    }
    
    if (message.content.startsWith('jarvis saca a')) 
    {
        const user = message.mentions.users.first();
        if (user) 
        {
          const member = message.guild.members.resolve(user);
          if (member) 
          {
            member.voice.kick();
            console.log('channel kick desde: ', `${message.guild}`)
          } else {
            message.channel.send("El wey no esta en el server");
          }
        } else {
          message.channel.send("Menciona a alguien wey");
        }
    }

    if(message.content === 'bbrata')
    {
        const bbrata=new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/401070235852996622/771606993618206720/106242474_1186193438407268_1130941896508546335_n.png')
        //message.channel.send(gf);
        message.channel.send(bbrata);
    }

    if(message.content ==='test')
    {
        client.channels.cache.get('401070235852996622').send('`al chile mejor no, me caga ayana pero da buenos mames, mejor usenme a mi`');
    }

    if(message.content === '!tecnoVaquero')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=6n3pFFPSlW4', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('gnomed desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content === '!tecno')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=8HfqxsKUnuU', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('tecno desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content === '!moyi2')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=Y_Xm72p6ruY&feature=youtu.be', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('4kMoyi desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if (message.content.startsWith('jarvis tuercele el webo a')) 
    {
        const user = message.mentions.users.first();
        if (user) 
        {
          const member = message.guild.members.resolve(user);
          if (member) 
          {
            if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=6yisws5rKoo', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => connection.disconnect());
        }

        const webo=new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/400914294100852757/809903762352767007/25e98a0c-7eaf-491d-9db4-496a2158682b.png')
        message.channel.send(webo);

        member.voice.kick();
            console.log('webo torcido desde: ', `${message.guild}`)
          } else {
            message.channel.send("El wey no esta en el server");
          }
        } else {
          message.channel.send("Menciona a alguien wey");
        }
    }

    if (message.content.startsWith('jarvis metele la varita en la concha a')) 
    {
        const user = message.mentions.users.first();
        if (user) 
        {
          const member = message.guild.members.resolve(user);
          if (member) 
          {
            if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			/*const stream = ytdl('https://www.youtube.com/watch?v=6yisws5rKoo', { filter: 'audioonly' });*/
            const dispatcher = connection.play('./AAAAAAA.mp4');

			dispatcher.on('finish', () => connection.disconnect());
        }

        const varita=new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/401070235852996622/832436147862503494/unknown.png')
        message.channel.send(varita);

        member.voice.setChannel('409954023815249920');
            console.log('varita desde: ', `${message.guild}`)
          } else {
            message.channel.send("El wey no esta en el server");
          }
        } else {
          message.channel.send("Menciona a alguien wey");
        }
    }

    if(message.content === '!halo')
    {
        const halo=new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/641881550773813249/811054475074338866/395ff897-23cc-4121-9287-a0ad2d39a9c5.png?width=312&height=676')
        .setTitle('ඞ')
        message.channel.send(halo);
    }

    if(message.content === 'dame xum')
    {
        const xum=new Discord.MessageEmbed()
        .setTitle('Toma uno')
        .setImage('https://i2.wp.com/eduncovered.com/wp-content/uploads/2013/12/cum-bottle-guy-2012.jpg?ssl=1')
        message.channel.send(xum);
    }

    if(message.content === '!murillo')
    {
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
			const stream = ytdl('https://www.youtube.com/watch?v=75VLOCLs4Ok', { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log('murillo desde: ', `${message.guild}`);

			dispatcher.on('finish', () => connection.disconnect());
        }
        else
        {
            return message.reply('conectese al canal qlo');
        }
    }

    if(message.content === '!kock') {
        if(message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('https://www.youtube.com/watch?v=RqtjOuOouJk', { filter : 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log("kock desde: ", `${message.guild}`);

            dispatcher.on('finish', () => connection.disconnect());
        }
        else {
            return message.replay('conectese al canal qlo');
        }
    }

    if(message.content.startsWith('c mamoe'))
    {
        const user = message.mentions.users.first();
        if(user)
        {
            const member = message.guild.members.resolve(user);
            if(member)
            {
                const Canvas = require('canvas');
                const canvas = Canvas.createCanvas(750, 750);
                const context = canvas.getContext('2d');

                const img = await Canvas.loadImage(user.displayAvatarURL ({ format: 'jpg' }));
                
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                context.font = '60px sans-serif';
                context.fillStyle = '#ffffff';
                context.strokeStyle = '#000000';
                context.fillText('c whuando eres papu :vvv', canvas.width / 30, canvas.height / 1.1);
                context.strokeText('c whuando eres papu :vvv', canvas.width / 30, canvas.height / 1.1)
                
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile-image.png');
                message.channel.send(attachment);
                console.log('c mamoe desde: ', `${message.guild}`);
            }
        }
    }

    if(message.content === 'vamos') {
        if(message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('https://www.youtube.com/watch?v=Y1tJNlArGF4', { filter : 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log("vamos carajo desde: ", `${message.guild}`);

            dispatcher.on('finish', () => connection.disconnect());
        }
        else {
            return message.replay('conectese al canal qlo');
        }
    }

    if(message.content === 'ta bien') {
        if(message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('https://www.youtube.com/watch?v=ffHN6_8HDuI', { filter : 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log("ta bien desde: ", `${message.guild}`);

            dispatcher.on('finish', () => connection.disconnect());
        }
        else {
            return message.replay('conectese al canal qlo');
        }
    }

    if(message.content === 'te oi puta') {
        if(message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('https://www.youtube.com/watch?v=9rY9M_0xRrs', { filter : 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log("te oi puta desde: ", `${message.guild}`);

            dispatcher.on('finish', () => connection.disconnect());
        }
        else {
            return message.replay('conectese al canal qlo');
        }
    }

    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

    if (command === 'play') 
    {
        const voiceChannel = message.member.voice.channel;
        
		if (!voiceChannel) return message.channel.send('I\'m Metete al canal primero');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        
        if (!permissions.has('CONNECT')) 
        {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        
        if (!permissions.has('SPEAK')) 
        {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) 
        {
			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            
            for (const video of Object.values(videos)) 
            {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } 

        else 
        {
            try 
            {
				var video = await youtube.getVideo(url);
            } 
            catch (error) 
            {
                try 
                {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
                    message.channel.send(`__**Song selection:**__\n${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
                    \nPlease provide a value to select one of the search results ranging from 1-10. \nYou have 15 sec to choose`);
					// eslint-disable-next-line max-depth
                    try 
                    {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 15, 
                            {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                    } 
                    catch (err) 
                    {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
                    }
                    
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } 
                catch (err) 
                {
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
    } 
    else if (command === 'skip') 
    {
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
        return undefined;
    } 

    else if (command === 'stop') 
    {
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used');
        return undefined;
    } 

    else if (command === 'volume') 
    {
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return message.channel.send(`I set the volume to: **${args[1]}**`);
    } 
    
    else if (command == 'np') 
    {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    } 
    
    else if (command === 'queue') 
    {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`__**Song queue:**__${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}**Now playing:** ${serverQueue.songs[0].title}`);
    } 
    
    else if (command === 'pause') 
    {
        if (serverQueue && serverQueue.playing) 
        {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		return message.channel.send('There is nothing playing.');
    } 
    
    else if (command === 'resume') 
    {
        if (serverQueue && !serverQueue.playing) 
        {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}

    return undefined;
});


async function handleVideo(video, message, voiceChannel, playlist = false) 
{
	const serverQueue = queue.get(message.guild.id);
	//console.log(video);
    const song = 
    {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: `http://img.youtube.com/vi/${video.id}/sddefault.jpg`
    };
    
    if (!serverQueue) 
    {
        const queueConstruct = 
        {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
        };
        
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

        try 
        {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
        } 
        catch (error) 
        {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
    }
    
    else 
    {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) 
{
	const serverQueue = queue.get(guild.id);

    if (!song) 
    {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('finish', reason => 
        {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
        .on('error', error => console.error(error));
        
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    
    const pla = new Discord.MessageEmbed()
    .setAuthor("Now Playing:")
    .setTitle(`${song.title}`)
    .setURL(`${song.url}`)
    .setImage(`${song.thumbnail}`)
    .setColor('#2159b5')

    serverQueue.textChannel.send(pla);
	//serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

function image(message, parts) 
{
 
    var search = parts.slice(1).join(" ");
 
    var options = 
    {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: 
        {
            "Accept": "text/html",
            "User-Agent": "Chrome",
	        "Cookie": "ws_prefs=vr=1&af=None"
        },
        
    };
    //options.Cookie = "ws_prefs=vr=1&af=None"

    /*if (message.channel.nsfw)
    {
        options.Cookie = "ws_prefs=vr=1&af=None";
    }*/
    
    request(options, function(error, response, responseBody) 
    {
        if (error) 
        {
            return;
        }
       

        $ = cheerio.load(responseBody); 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        //console.log(urls);
        if (!urls.length) {
            // Handle no results
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)] );
    });
 
}